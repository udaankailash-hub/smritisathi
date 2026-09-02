# MementoCare AI — Deployment & Operations Guide

## 1. Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher
- **PostgreSQL / Supabase Account** (Optional for cloud sync; resilient in-memory & local fallback included)
- **Google Gemini API Key** (Optional for live LLM recommendations; deterministic rule engine fallback included)

---

## 2. Environment Configuration
Create a `.env` file in the project root:

```bash
PORT=3000
NODE_ENV=production
GEMINI_API_KEY=your_gemini_api_key_here
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

---

## 3. Local Development

```bash
# 1. Install dependencies
npm install

# 2. Start full-stack development server
npm run dev

# 3. Access application in browser
open http://localhost:3000
```

---

## 4. Production Build & Deployment

```bash
# 1. Run type checks & linter
npm run lint

# 2. Build production assets & server bundle
npm run build

# 3. Start production server
npm run start
```

---

## 5. Container & Cloud Deployment

### Docker Configuration Example
```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY --from=builder /app/dist ./dist
EXPOSE 3000
CMD ["npm", "run", "start"]
```

---

## 6. Health Checks & Monitoring
- **Health Endpoint:** `GET /api/health`
- **Uptime Monitoring:** Configured for automated Ping checks every 60 seconds.
- **Log Aggregation:** Standard JSON logs formatted to stdout/stderr.
