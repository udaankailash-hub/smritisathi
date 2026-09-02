# MementoCare AI — Production Deployment Guide

## Tagline
**"AI that remembers the person, not just the score."**

---

## 1. Environment Configuration

Create a `.env` file based on `.env.example`:

```bash
# Web Application Port
PORT=3000

# Google Gemini API Key for bounded activity draft generation
GEMINI_API_KEY=your_gemini_api_key_here

# Supabase Database & Auth Configuration (Optional for cloud sync)
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Node Environment
NODE_ENV=production
```

---

## 2. Building & Running for Production

```bash
# Install dependencies
npm install

# Run TypeScript lint check
npm run lint

# Build Vite frontend bundle and Node server
npm run build

# Start production server
npm run start
```

---

## 3. PWA & Service Worker Configuration

The production build automatically bundles the PWA service worker (`public/sw.js`) and web app manifest (`public/manifest.json`), enabling offline caching of all static assets, game templates, audio soundscapes, and language dictionaries.
