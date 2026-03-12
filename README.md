
```markdown
# MenaFina Project — Multi-Repo Structure
**Smart AI-driven financial education platform** including:  
✔ Financial ChatBot  
✔ Investment Simulator (ML)  
✔ Portfolio Optimizer (HRP + RL)  
✔ Web Interface (Next.js)  
**Goal:** Make investing accessible through personalized, interactive, and educational guidance.

---

## Repository Structure

| Repository | Description | Stack | Main Contents |
|------------|-------------|-------|---------------|
| **MenaFina-Bot** | AI Backend + Chatbot + Optimizer | Python | `chat_botFINA.py`, HRP, RL, Profiling, Optimizer |
| **MenaFina-Web** | User Interface | TypeScript / React / Tailwind CSS | `src/`, `public/`, `auth/`, `pages/` (UI components) |
| **MenaFina-Investment-Model** | ML Models & Investment Simulator | Python + scikit-learn | `predict.py`, `model.ipynb`, `data/` |
| **MenaFina-Main** | Main repo: Next.js frontend, integrating backend later with FastAPI, NestJS, and Supabase | TypeScript / React / Tailwind + Python | for now: readme file and technical report |

> The final application will integrate these 3 blocks via **FastAPI + NestJS APIs**.

---

## Folder Overview

### 1) `main` Branch
- Currently contains: README & technical report  
- Purpose: Later used to integrate ML and RL models with the frontend (AI Chatbot & Simulator), add backend, and finalize the project.

### 2) `Service Bot` Branch
```
Optimizer/           # HRP Portfolio Optimizer
Optimizer_RL/        # Reinforcement Learning version (Stable-baselines3)
Profiling/           # Investor profile classification
data/                # Historical datasets
models/              # ML models
chat_botFINA.py      # Main Chatbot script
```

### 3) `Frontend` Branch
```
src/                 # React/Next.js pages & components
public/              # Static assets
package.json         # Project dependencies
```

### 4) `Simulator` Branch
```
data/                # Raw financial datasets
predict.py           # Investment simulation ("Invest / No Invest")
model.ipynb          # RandomForest training notebook used by predict.py
```

---

## Features
- Investor profiling via questionnaire  
- Portfolio recommendation using HRP on 52 tickers  
- Dynamic optimization with Reinforcement Learning  
- Financial simulator powered by RandomForest  
- Educational web interface (Courses, Webinars, Teacher Dashboard)

---

## Installation

**Backend (Chatbot + Portfolio Optimizer)**
```bash
git clone <repo-backend-url>
cd MenaFina-Bot
pip install -r requirements.txt
python chat_botFINA.py
```

**Web Interface**
```bash
git clone <repo-frontend-url>
cd MenaFina-Web
npm install
npm run dev
```

**Investment Model / Simulator**
```bash
git clone <repo-mlmodel-url>
cd MenaFina-Investment-Model
pip install -r requirements.txt
python predict.py
```

---

## Roadmap
* Connect Chatbot ↔ Frontend via FastAPI
* Migrate `users.json` → NestJS / Supabase (PL/SQL)
* RL Optimization + Backtesting
* Payment integration (PayPal / TM)
* Add Tunisian market support (Dinar conversion in the future)
```

