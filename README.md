# RAGquant

> **RAG-powered quantitative finance platform for trading strategy optimization**

A production-ready trading strategy optimizer combining Retrieval-Augmented Generation (RAG), machine learning models, and portfolio optimization techniques.

---

## Features

### Core Capabilities
- **RAG System**: Hybrid retrieval with Pinecone vector database + Neo4j graph database
- **Portfolio Optimization**: Markowitz mean-variance optimization with Ledoit-Wolf shrinkage
- **ML Predictions**: LSTM neural networks for price forecasting
- **Risk Metrics**: Value-at-Risk (VaR) and Conditional VaR via Monte Carlo simulation
- **Real-Time Streaming**: Apache Kafka + WebSocket for live market data
- **Backtesting Engine**: Performance analysis with Sharpe, Sortino, and Calmar ratios

---

## Quick Start

### Prerequisites
- Node.js 18+
- Python 3.10+
- Docker & Kubernetes (for deployment)

### Installation

```bash
# Clone the repository
git clone https://github.com/DurdensDream/RAGquant.git
cd RAGquant

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your API keys

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to access the application.

---

## Mobile App (SFW Pinkpilled UI)

The `/mobile` directory contains a standalone Expo React Native frontend with a playful, SFW pink aesthetic and sticker placeholders.

```bash
cd mobile
npm install
npm run start
# or launch a specific target:
npm run web
npm run android
npm run ios
```

> Sticker placeholders use generated SVG data URIs. Swap them with royalty-free SFW anime sticker assets or generate your own with prompts like:
> “curvy anime girl in friendly pose, entirely SFW and cute, with exaggerated hourglass figure, big eyes, and modest clothing.”

---

## Project Structure

```
RAGquant/
├── app/
│   ├── page.tsx              # Landing page
│   ├── layout.tsx            # Root layout
│   ├── globals.css           # Global styles
│   ├── /optimize             # Strategy optimizer
│   ├── /dashboard            # Analytics dashboard
│   └── /upload               # Document ingestion
├── components/
│   ├── /ui/                  # Reusable UI components
│   └── ChartComponent.tsx    # Financial charts
├── lib/
│   ├── ragPipeline.ts        # RAG orchestration
│   ├── backtest.ts           # Quantitative analysis
│   └── portfolioOptimizer.ts # Optimization algorithms
├── backend/
│   └── main.py               # FastAPI backend service
├── microservices/
│   ├── /rag-service          # Data ingestion + retrieval
│   ├── /ml-service           # LSTM predictions
│   └── /streaming-service    # Kafka producer
└── .env.local                # Environment configuration
```

---

## Environment Variables

Create a `.env.local` file with the following:

```bash
# Core API Keys
HUGGINGFACE_API_KEY=<your-huggingface-api-key>

# Databases
MONGODB_URI=<your-mongodb-uri>
NEO4J_URI=bolt://localhost:7687
NEO4J_PASSWORD=<password>
PINECONE_API_KEY=<your-key>

# Market Data
ALPHA_VANTAGE_API_KEY=<your-key>

# Authentication
JWT_SECRET=<random-secret>
NEXTAUTH_SECRET=<random-secret>
```

---

## Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Framework | Next.js 14 (App Router) | Server-side rendering, API routes |
| Styling | Tailwind CSS | Utility-first styling |
| Backend | Python FastAPI | Microservices for RAG/ML |
| RAG | LangChain + Pinecone + Neo4j | Hybrid retrieval system |
| ML | TensorFlow, scikit-learn | LSTM predictions, optimization |
| Streaming | Apache Kafka + Socket.io | Real-time market data |
| Database | MongoDB, Neo4j, Redis | Polyglot persistence |
| Deploy | Docker + Kubernetes | Containerized microservices |

---

## Development Roadmap

### Phase 1-2: Foundation (Complete)
- [x] Next.js 14 + TypeScript setup
- [x] UI component library
- [x] API route structure

### Phase 3: Backend Infrastructure (In Progress)
- [ ] MongoDB Atlas integration
- [ ] Pinecone vector database setup
- [ ] Neo4j graph database configuration
- [ ] API Gateway with JWT authentication

### Phase 4-6: RAG & ML Pipeline
- [ ] PDF/CSV document ingestion
- [ ] FinBERT embeddings
- [ ] LangChain orchestration
- [ ] LSTM price prediction models
- [ ] Portfolio optimization (Ledoit-Wolf)

### Phase 7-10: Frontend Features
- [ ] Strategy optimizer interface
- [ ] Real-time analytics dashboard
- [ ] Document upload interface
- [ ] User authentication flow

### Phase 11-12: Security & Testing
- [ ] JWT authentication
- [ ] Input validation (Zod)
- [ ] Unit tests (Jest, 80%+ coverage)
- [ ] E2E tests (Cypress)

### Phase 13-14: Deployment
- [ ] Docker containerization
- [ ] Kubernetes manifests
- [ ] CI/CD pipeline (GitHub Actions)

---

## Testing

```bash
# Unit tests
npm test

# E2E tests
npx cypress run

# Backend tests
cd backend
pytest tests/
```

---

## Disclaimer

> **For simulation and educational purposes only.**
> This tool does not constitute financial advice. Consult a certified financial advisor before making trading decisions.

---

## License

MIT License

---

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit changes (`git commit -m "Add your feature"`)
4. Push to branch (`git push origin feature/your-feature`)
5. Open a Pull Request
