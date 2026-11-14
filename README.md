# Quantara

Quantara is a stock tracking app with live market data, charts, personal watchlists, and AI-written stock insights.

**Live demo** https://quantara-alpha-eight.vercel.app/

![Quantara dashboard with AI market pulse, market overview, and stock heatmap](public/readme/Quantara%20Demo%20Dashboard.png)

![Next.js](https://img.shields.io/badge/-Next.js-black?style=for-the-badge&logoColor=white&logo=next.js&color=black)
![TypeScript](https://img.shields.io/badge/-TypeScript-black?style=for-the-badge&logoColor=white&logo=typescript&color=3178C6)
![Tailwind CSS](https://img.shields.io/badge/-TailwindCSS-black?style=for-the-badge&logoColor=white&logo=tailwindcss&color=38B2AC)
![MongoDB](https://img.shields.io/badge/-MongoDB-black?style=for-the-badge&logoColor=white&logo=mongodb&color=00A35C)
![Inngest](https://img.shields.io/badge/-Inngest-black?style=for-the-badge&logoColor=white&logo=inngest&color=black)

## About

I built Quantara to practise full-stack TypeScript and to work with real financial data. You can search for a stock, see its charts and company details, add it to a watchlist, and read an AI summary of the case for and against it.

The project started from the JavaScript Mastery Signalist stock tracker tutorial. I extended it with the AI insights panel, the market pulse banner, fallback data for when an API is unavailable, and a demo mode so the app still runs without every API key.

## Features

- **Dashboard** with a market overview, a stock heatmap, and a news timeline.
- **Stock pages** with a symbol summary, interactive charts, technical analysis, company profile, and financials.
- **Search** for any stock, with a Cmd or Ctrl + K shortcut.
- **Watchlist** so you can save the stocks you follow.
- **AI insights** from the Gemini API. Each stock gets a rating, a confidence score, a sentiment score, bull and bear cases, and key catalysts. You can also ask follow-up questions about a stock.
- **Daily news digest** and a welcome email, sent through Inngest and Nodemailer.
- **Accounts** with email and password sign-in using Better Auth.

## Tech stack

| Area | Tools |
| --- | --- |
| Framework | Next.js 15, React 19, TypeScript |
| Styling | Tailwind CSS, shadcn/ui |
| Market data | Finnhub API, TradingView widgets |
| AI | Google Gemini API |
| Background jobs | Inngest |
| Email | Nodemailer with Gmail |
| Auth | Better Auth |
| Database | MongoDB with Mongoose |
| Hosting | Vercel |

## Fallbacks

The app is built to keep working when something is missing.

- Without a Finnhub key, or when the API rate limit is reached, it shows built-in sample data.
- Without a Gemini key, it shows preset insights for NVDA, AAPL, TSLA, MSFT, and PLTR.
- Without a MongoDB connection, it keeps accounts in memory. They reset when the server restarts.

## Run it locally

You need Git, Node.js, and npm.

```bash
git clone https://github.com/bribo-s/Quantara.git
cd Quantara
npm install
```

Create a `.env` file in the project root.

```env
NODE_ENV=development
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# Finnhub (finnhub.io)
FINNHUB_API_KEY=
NEXT_PUBLIC_FINNHUB_API_KEY=

# Google Gemini (aistudio.google.com)
GEMINI_API_KEY=

# MongoDB (optional)
MONGODB_URI=

# Better Auth
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=http://localhost:3000

# Gmail app password, used for emails
NODEMAILER_EMAIL=
NODEMAILER_PASSWORD=
```

Start the app.

```bash
npm run dev
```

Then open http://localhost:3000. To test the background jobs, run the Inngest dev server in a second terminal.

```bash
npx inngest-cli@latest dev
```

## Deployment

Quantara is deployed on Vercel. To deploy your own copy, import the repository into Vercel, add the same environment variables, and set `BETTER_AUTH_URL` and `NEXT_PUBLIC_BASE_URL` to your own Vercel address. Install the Inngest integration from the Vercel Marketplace if you want the emails and daily digest to run.

## Credits

Based on the Signalist tutorial by [JavaScript Mastery](https://youtu.be/gu4pafNCXng). Market data comes from [Finnhub](https://finnhub.io/) and charts come from [TradingView](https://www.tradingview.com/).
