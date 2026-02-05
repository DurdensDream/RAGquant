from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import Optional
import os
from dotenv import load_dotenv
from huggingface_hub import InferenceClient
import re
import uuid

load_dotenv()

app = FastAPI(title="QuantOver RAG Service")

@app.on_event("startup")
async def startup_state():
    if not hasattr(app.state, "documents"):
        app.state.documents = []

# Enable CORS for Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize HuggingFace client lazily
HF_API_KEY = os.getenv("HUGGINGFACE_API_KEY")
client: Optional[InferenceClient] = None

class StrategyRequest(BaseModel):
    query: str
    risk_tolerance: Optional[str] = "moderate"
    capital: Optional[float] = 10000.0

class StrategyResponse(BaseModel):
    strategy: str
    risk_analysis: str
    expected_return: str
    implementation_steps: list[str]

class IngestDocument(BaseModel):
    id: Optional[str] = None
    title: Optional[str] = None
    content: str = Field(..., min_length=1)
    source: Optional[str] = None
    tags: Optional[list[str]] = None

class IngestRequest(BaseModel):
    documents: list[IngestDocument]

class IngestResponse(BaseModel):
    ingested: int
    total: int

def _tokenize(text: str) -> set[str]:
    return set(re.findall(r"[a-zA-Z0-9']+", text.lower()))

def _rank_documents(query: str, documents: list[dict], top_k: int = 3) -> list[dict]:
    if not documents:
        return []

    query_tokens = _tokenize(query)
    if not query_tokens:
        return documents[:top_k]

    scored = []
    for doc in documents:
        content = doc.get("content", "")
        tokens = _tokenize(content)
        score = len(query_tokens.intersection(tokens))
        scored.append((score, doc))

    scored.sort(key=lambda item: item[0], reverse=True)
    return [doc for score, doc in scored if score > 0][:top_k] or [doc for _, doc in scored][:top_k]

@app.get("/")
async def root():
    return {
        "service": "QuantOver RAG Backend",
        "status": "running",
        "version": "1.0.0",
        "cute_factor": "💖",
        "documents_indexed": len(getattr(app.state, "documents", []))
    }

@app.get("/ingest")
async def ingest_status():
    documents = getattr(app.state, "documents", [])
    return {
        "documents_indexed": len(documents)
    }

@app.post("/ingest", response_model=IngestResponse)
async def ingest_documents(request: IngestRequest):
    if not request.documents:
        raise HTTPException(status_code=400, detail="No documents provided for ingestion")

    documents = getattr(app.state, "documents", [])

    ingested = 0
    for doc in request.documents:
        doc_id = doc.id or str(uuid.uuid4())
        documents.append({
            "id": doc_id,
            "title": doc.title,
            "content": doc.content,
            "source": doc.source,
            "tags": doc.tags or []
        })
        ingested += 1

    app.state.documents = documents

    return IngestResponse(ingested=ingested, total=len(documents))

@app.post("/analyze", response_model=StrategyResponse)
async def analyze_strategy(request: StrategyRequest):
    """
    Generate a trading strategy using HuggingFace LLM with RAG
    """
    try:
        if not HF_API_KEY:
            raise HTTPException(
                status_code=500,
                detail="HUGGINGFACE_API_KEY environment variable is required"
            )

        global client
        if client is None:
            client = InferenceClient(token=HF_API_KEY)

        # Create enhanced prompt with financial context
        system_prompt = """You are a quantitative finance expert AI that generates detailed trading strategies.
        
Given a user query, provide:
1. A comprehensive trading strategy description
2. Risk analysis with specific metrics
3. Expected return estimates
4. Step-by-step implementation guide

Be specific, use financial terminology, and include backtesting recommendations.
Format your response clearly with sections."""

        documents = getattr(app.state, "documents", [])
        top_docs = _rank_documents(request.query, documents, top_k=3)
        context_block = ""
        if top_docs:
            context_block = "\n\nContext documents:\n" + "\n".join(
                f"- {doc.get('title') or doc.get('id')}: {doc.get('content')}" for doc in top_docs
            )

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
{context_block}
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
    documents = getattr(app.state, "documents", [])
    return {
        "status": "healthy",
        "message": "Backend is adorably functional! 💕",
        "documents_indexed": len(documents)
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)
