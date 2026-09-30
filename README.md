# SupportFlow AI

A production-oriented customer support operations platform built with React, TypeScript, Node.js, Express, PostgreSQL and Prisma.

## Functional areas

- JWT authentication and role-based access control
- Ticket creation, filtering, status updates, assignment and replies
- Customer CRUD and ticket history
- Knowledge Base CRUD
- Live dashboard and analytics from PostgreSQL
- AI ticket analysis through the backend, with optional OpenAI Responses API integration
- Persistent user profile, workspace, notification and AI preferences

## Local setup

1. Start PostgreSQL and create `supportflow_ai`.
2. Copy `backend/.env.example` to `backend/.env` and set `DATABASE_URL` and `JWT_SECRET`.
3. Optionally set `OPENAI_API_KEY` to enable hosted AI analysis. The backend has a deterministic fallback classifier when no key is configured.
4. From `backend`: `npm install`, `npx prisma migrate dev`, `npx prisma generate`, `npm run dev`.
5. From `frontend`: `npm install`, `npm run dev`.
6. Sign in with the local development admin account configured in your database.

## Architecture

Frontend requests go through `frontend/src/services/api-client.ts` to the Express API. The backend validates input with Zod, executes business logic through services/repositories, and persists data with Prisma/PostgreSQL. Secrets stay on the backend.
