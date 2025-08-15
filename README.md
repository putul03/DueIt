# DueIt

A mobile-first task management app with AI-powered task breakdown. We don't do hard deadlines here - let's cut down on anxiety and work for a healthier mind too.

## Live Demo

[Live App](https://nb.mehul.pro) | [Backend Documentation](https://your-backend-docs-url.com)

## The DueIt Factor
DueIt solves the problem of overwhelming tasks by breaking them down intelligently. Add your desired goal and select from three breakdown levels:

- Alpha: 2-3 subtasks (light breakdown)
- Beta: 4-6 subtasks (medium breakdown)
- Sigma: Up to 10 subtasks (maximum breakdown)

Our philosophy: Don't edit tasks - do them! Or delete and start fresh. No more procrastination through endless modifications.

## Tech Stack

**Frontend**
- NextJS (TypeScript)
- Tailwind CSS
- ShadCN UI
- PWA

**Backend**
- FastAPI
- PostgreSQL
- Docker
- SQLAlchemy & Alembic
- Pydantic
- GroqAI

## Setup

### Frontend
```bash
cd frontend
npm install --legacy-peer-deps
npm run dev
```

### Backend
```bash
cd backend
cp .env.example .env
# Edit .env with your database credentials and API keys
# Update docker-compose.yml and alembic/env.py with database settings
docker compose up --build -d
```

Frontend runs on `http://localhost:3000`, backend on `http://localhost:8000`

## Project Structure

```
dueit/
├── frontend/          # NextJS app
├── backend/           # FastAPI backend
│   ├── alembic/      # Database migrations
│   ├── app/
│   │   ├── api/      # API routes and LLM integration
│   │   ├── models/   # Database models
│   │   ├── schemas/  # Pydantic schemas
│   │   ├── services/ # Business logic
│   │   └── sse/      # Server-sent events
│   ├── docker-compose.yml
│   └── Dockerfile
└── README.md
```

## How It Works

Add a goal, select a breakdown level, and GroqAI generates structured subtasks. The app follows a mobile-first design and can be installed as a PWA.

## Known Issues

- May need `--legacy-peer-deps` flag for npm install
- SSE achievements feature is incomplete

## Deployment

- Frontend: Google Cloud E2 instance with nginx reverse proxy
- Backend: Docker containers with PostgreSQL
