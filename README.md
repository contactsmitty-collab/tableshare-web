# TableShare Marketing Site

Main marketing/landing page for tableshare.ai. Built with Vite + React + TypeScript.

## Setup

```bash
cd web-marketing
npm install
```

## Development

```bash
npm run dev
```

Opens at http://localhost:5173

## Build

```bash
npm run build
```

Output goes to `dist/`.

## Deploy to Vercel

### Option 1: Vercel CLI

```bash
npm i -g vercel
vercel
```

Follow prompts. When asked for root directory, use `.` (current folder).

### Option 2: Vercel Dashboard

1. Push this repo (or `web-marketing` folder) to GitHub.
2. Go to [vercel.com](https://vercel.com) → Add New Project.
3. Import the repo.
4. Set **Root Directory** to `web-marketing` (if deploying from monorepo).
5. Vercel auto-detects Vite. Click Deploy.

### Option 3: Deploy from local

```bash
cd web-marketing
npx vercel
```

### Custom domain (tableshare.ai)

1. In Vercel project → Settings → Domains.
2. Add `tableshare.ai` and `www.tableshare.ai`.
3. Add the CNAME/A records Vercel shows to your DNS.

## Configuration

- **TestFlight link**: Edit `APP_DOWNLOAD_URL` in `src/TableShareWebsite.tsx` (line ~27).
