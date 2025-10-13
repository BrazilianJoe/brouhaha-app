# Brouhaha Media Platform

Cross-platform media consumption platform supporting webtoons, books, and videos.

## Architecture

- **Frontend**: Expo React Native (Web/iOS/Android)
- **Authentication**: Clerk
- **Backend**: Vercel Serverless Functions
- **Database**: Vercel Postgres
- **Payments**: Stripe
- **Video**: Bunny.net

## Quick Start

1. Install dependencies:
   ```bash
   npm install
   cd app && npm install
   ```

2. Set up environment variables:
   ```bash
   # Copy .env.example to .env and fill in values
   cp .env.example .env
   ```

3. Start development:
   ```bash
   npm run dev
   ```

4. Deploy to Vercel:
   ```bash
   vercel --prod
   ```

## Features

- Cross-platform (Web, iOS, Android)
- User authentication with Clerk
- Content management
- Subscription payments with Stripe
- Video streaming with Bunny.net

## Documentation

- [Architecture Review](ARCHITECTURE_REVIEW.md)
- [Simplified Setup](SIMPLIFIED_SETUP.md)
- [Project Guidelines](AGENTS.md)