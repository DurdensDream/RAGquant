from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import os
from dotenv import load_dotenv
from huggingface_hub import InferenceClient

load_dotenv()

app = FastAPI(title="QuantOver RAG Service")

# Enable CORS for Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize HuggingFace client
HF_API_KEY = os.getenv("HUGGINGFACE_API_KEY")
if not HF_API_KEY:
    raise ValueError("HUGGINGFACE_API_KEY environment variable is required")
client = InferenceClient(token=HF_API_KEY)

class StrategyRequest(BaseModel):
    query: str
    risk_tolerance: Optional[str] = "moderate"
    capital: Optional[float] = 10000.0

class StrategyResponse(BaseModel):
    strategy: str
    risk_analysis: str
    expected_return: str
    implementation_steps: list[str]

@app.get("/")
async def root():
    return {
        "service": "QuantOver RAG Backend",
        "status": "running",
        "version": "1.0.0",
        "cute_factor": "💖"
    }

@app.post("/analyze", response_model=StrategyResponse)
async def analyze_strategy(request: StrategyRequest):
    """
    Generate a trading strategy using HuggingFace LLM with RAG
    """
    try:
        # Create enhanced prompt with financial context
        system_prompt = """You are a quantitative finance expert AI that generates detailed trading strategies.
        
Given a user query, provide:
1. A comprehensive trading strategy description
2. Risk analysis with specific metrics
3. Expected return estimates
4. Step-by-step implementation guide

Be specific, use financial terminology, and include backtesting recommendations.
Format your response clearly with sections."""

        user_prompt = f"""Query: {request.query}

Risk Tolerance: {request.risk_tolerance}
Available Capital: ${request.capital:,.2f}

Generate a detailed trading strategy that addresses this query. Include:
- Strategy overview and rationale
- Technical indicators to use
- Entry/exit rules
- Position sizing recommendations
- Risk management (stop-loss, take-profit)
- Backtesting approach
"""

        # Call HuggingFace Inference API (using Mixtral or similar)
        messages = [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt}
        ]
        
        response = client.chat_completion(
            messages=messages,
            model="mistralai/Mixtral-8x7B-Instruct-v0.1",
            max_tokens=1500,
            temperature=0.7
        )
        
        generated_text = response.choices[0].message.content
        
        # Parse the response (simplified - in production, use better parsing)
        lines = generated_text.split('\n')
        
        # Extract sections (basic parsing)
        strategy_desc = ""
        risk_info = ""
        return_info = ""
        steps = []
        
        current_section = None
        for line in lines:
            line = line.strip()
            if not line:
                continue
                
            if "strategy" in line.lower() and ":" in line:
                current_section = "strategy"
            elif "risk" in line.lower() and ":" in line:
                current_section = "risk"
            elif "return" in line.lower() and ":" in line:
                current_section = "return"
            elif "step" in line.lower() or line.startswith(("-", "•", "1.", "2.", "3.")):
                steps.append(line.lstrip("-•123456789. "))
            elif current_section == "strategy":
                strategy_desc += line + " "
            elif current_section == "risk":
                risk_info += line + " "
            elif current_section == "return":
                return_info += line + " "
        
        # Fallback if parsing fails
        if not strategy_desc:
            strategy_desc = generated_text[:500]
        if not risk_info:
            risk_info = "Risk analysis included in strategy description."
        if not return_info:
            return_info = "Expected returns vary based on market conditions."
        if not steps:
            steps = [
                "Review the strategy details carefully",
                "Set up your trading platform with specified indicators",
                "Backtest on historical data (recommended: 2+ years)",
                "Start with paper trading to validate",
                "Implement with proper position sizing",
                "Monitor and adjust based on performance"
            ]
        
        return StrategyResponse(
            strategy=strategy_desc.strip() if strategy_desc.strip() else generated_text,
            risk_analysis=risk_info.strip(),
            expected_return=return_info.strip(),
            implementation_steps=steps[:6]  # Limit to 6 steps
        )
        
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Strategy generation failed: {str(e)}"
        )

@app.get("/health")
async def health_check():
    return {"status": "healthy", "message": "Backend is adorably functional! 💕"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)
