# ✨ QuantOver: Your Adorable AI Trading Bestie 💖

> **RAG-powered quantitative finance platform with the cutest pink bimbo theme!**

A production-ready, enterprise-grade trading strategy optimizer that combines serious AI (RAG, ML models, portfolio optimization) with an ultra-feminine, playful pink aesthetic featuring anime-style mascots and sparkle effects.

---

## 🎀 Features

### Ultra-Feminine UI
- 💕 **Pink Gradient Theme**: Hot pink (#FF69B4) + baby pink (#FFC0CB) color palette
- ✨ **Floating Hearts Animation**: Canvas-based particle system
- 🎪 **Bounce Physics**: Jiggle effects on all interactive elements
- 🌸 **Pacifico Fonts**: Bubbly, cursive headings
- 💖 **Anime Mascots**: Cute character stickers throughout (to be generated)

### Enterprise Finance Backend
- 🤖 **RAG System**: Retrieval-Augmented Generation with Pinecone + Neo4j
- 📊 **Portfolio Optimization**: Markowitz with Ledoit-Wolf shrinkage
- 📈 **ML Predictions**: TensorFlow LSTM for price forecasting
- ⚠️ **Risk Metrics**: VaR/CVaR calculation via Monte Carlo
- 🔄 **Real-Time Streaming**: Apache Kafka + WebSocket market data
- 🧪 **Backtesting**: Sharpe, Sortino, Calmar ratio analysis

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Python 3.10+ (for microservices)
- Docker & Kubernetes (for deployment)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/quantover.git
cd RAGquant

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your API keys

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the pink magic! ✨

---

## 📁 Project Structure

```
RAGquant/
├── app/
│   ├── page.tsx              # Pink hero landing page
│   ├── layout.tsx            # Root layout with metadata
│   ├── globals.css           # Pink theme styles
│   ├── /optimize            # Strategy optimizer page (TODO)
│   ├── /dashboard           # Charts & metrics (TODO)
│   └── /upload              # Document ingestion (TODO)
├── components/
│   ├── /ui/
│   │   ├── BounceButton.tsx  # Jiggle-animated buttons
│   │   └── HeartParticles.tsx # Floating hearts canvas
│   ├── PinkHero.tsx          # Hero section with animations
│   └── ChartWithMascot.tsx   # Financial charts (TODO)
├── lib/                      # Business logic (TODO)
│   ├── ragPipeline.ts        # Hybrid RAG orchestration
│   ├── backtest.ts           # Quant analysis
│   └── portfolioOptimizer.ts # Markowitz optimization
├── microservices/            # Python backend (TODO)
│   ├── /rag-service          # Data ingestion + retrieval
│   ├── /ml-service           # LSTM predictions
│   └── /streaming-service    # Kafka producer
├── public/
│   ├── /anime-stickers/      # Character assets (TODO)
│   └── /patterns/            # Lace SVG patterns
├── tailwind.config.ts        # Custom pink palette
└── .env.local                # API keys (HuggingFace configured)
```

---

## 🎨 Theme Customization

### Color Palette
```css
--hot-pink: #FF69B4;       /* Primary buttons, headings */
--baby-pink: #FFC0CB;      /* Backgrounds, soft accents */
--soft-pink: #FFB6C1;      /* Secondary elements */
--pastel-pink: #FFE4E1;    /* Subtle backgrounds */
--gold-glitter: #FFD700;   /* Sparkle effects */
--profit-green: #98FB98;   /* Gains (pastel green) */
--loss-red: #FFB6D9;       /* Losses (pink-tinted red) */
```

### Fonts
- **Headings**: Pacifico (bubbly cursive)
- **Body**: Inter (clean sans-serif)
- **Financial Data**: Poppins (modern)

---

## 🛠️ Development Roadmap

### ✅ Phase 1-2: Foundation & Pink Theme (COMPLETE)
- [x] Next.js 14 + TypeScript setup
- [x] Pink color palette & fonts
- [x] BounceButton + HeartParticles components
- [x] Pink gradient hero page

### 🔨 Phase 3: Backend Infrastructure (IN PROGRESS)
- [ ] MongoDB Atlas connection
- [ ] Pinecone vector database
- [ ] Neo4j graph database
- [ ] API Gateway with JWT auth

### 📝 Phase 4-6: RAG & ML
- [ ] PDF/CSV ingestion pipeline
- [ ] FinBERT embeddings
- [ ] LangChain orchestration
- [ ] LSTM price prediction
- [ ] Portfolio optimization (Ledoit-Wolf)

### 🎭 Phase 7: Anime Assets
- [ ] Generate 10-15 character stickers (Stable Diffusion)
  - Winking girl, blowing kiss, hands on hips, celebrating, etc.
- [ ] Integrate mascots into buttons, charts, modals

### 📊 Phase 8-10: UI Pages
- [ ] Strategy optimizer page (`/optimize`)
- [ ] Dashboard with real-time charts
- [ ] Upload page with drag-drop
- [ ] Auth pages (login/signup with mascots)

### 🔐 Phase 11-12: Security & Testing
- [ ] JWT authentication
- [ ] Input sanitization (Zod)
- [ ] Jest unit tests (80%+ coverage)
- [ ] Cypress E2E tests

### 🚢 Phase 13-14: Deployment
- [ ] Docker containerization
- [ ] Kubernetes manifests
- [ ] CI/CD pipeline (GitHub Actions)

---

## 🎯 Environment Variables

Required in `.env.local`:

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

## 📚 Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Framework | Next.js 14 (App Router) | Server-side rendering, API routes |
| Styling | Tailwind CSS | Utility-first pink theme |
| Animation | Framer Motion | Bounce effects, smooth transitions |
| Charts | Chart.js + react-chartjs-2 | Financial visualizations |
| Fonts | Google Fonts (Pacifico, Inter, Poppins) | Typography |
| Backend | Python FastAPI | Microservices for RAG/ML |
| RAG | LangChain + Pinecone + Neo4j | Hybrid retrieval |
| ML | TensorFlow, scikit-learn | LSTM predictions, optimization |
| Streaming | Apache Kafka + Socket.io | Real-time market data |
| Database | MongoDB, Neo4j, Redis | Polyglot persistence |
| Deploy | Docker + Kubernetes | Containerized microservices |

---

## 🎀 Asset Generation Guide

### Anime Character Stickers

Use **Stable Diffusion** or **Midjourney** with these prompts:

1. **Winking Girl**: "cute anime girl with curves, winking, pink crop top, mini skirt, white background, kawaii style, SFW"
2. **Blowing Kiss**: "anime girl blowing kiss, pouty lips, pink outfit, hearts around, pastel colors, cute pose, SFW"
3. **Hands on Hips**: "curvy anime girl hands on hips, confident pose, hot pink dress, thigh-high socks, flirty smile"
4. **Celebrating**: "anime girl jumping with joy, sparkles, pink outfit, happy expression, kawaii"
5. **Pouting**: "sad anime girl pouting, puppy eyes, pink tears, adorable expression"
6. **Thinking**: "anime girl finger on chin, thinking pose, question marks, pink outfit"
7. **Dancing**: "anime girl dancing, twirling, pink dress flowing, happy smile, hearts"
8-15. *(More poses in implementation_plan.md)*

**Post-process**:
- Remove background (remove.bg)
- Resize to 512x512px
- Save as PNG in `/public/anime-stickers/`

---

## 🧪 Testing

```bash
# Unit tests
npm test

# E2E tests
npx cypress run

# Backend tests (Python)
cd microservices/rag-service
pytest tests/
```

---

## ⚠️ Disclaimer

> 💕 **For simulation & education only!** 💕  
> This tool is **NOT** financial advice. Always consult a certified financial advisor before making real trading decisions. The pink theme is empowering and playful, not professional investment guidance!

---

## 📄 License

MIT License - feel free to fork and make it even cuter! ✨

---

## 🤝 Contributing

Contributions welcome! Please:
1. Fork the repo
2. Create a feature branch (`git checkout -b feature/more-sparkles`)
3. Commit changes (`git commit -m "Add more pink gradients"`)
4. Push to branch (`git push origin feature/more-sparkles`)
5. Open a Pull Request

---

## 💖 Credits

Created with love by [@yourusername](https://github.com/yourusername)

Special thanks to:
- The anime community for inspiration 💕
- Quantitative finance for the backend rigor 📈
- Everyone who believes finance can be fun AND cute! ✨

---

**Made with 💖 and lots of pink pixels!**
