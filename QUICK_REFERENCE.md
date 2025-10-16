# 🚀 Brouhaha - Quick Reference Card

## At a Glance
- **Status**: MVP Foundation (25% production-ready)
- **Tech**: Expo + React Native + Clerk + Vercel + Prisma
- **LOC**: 2,663 (1,014 frontend, 904 API, 145 schema)
- **Timeline**: 6-10 weeks to launch
- **Risk**: 🔴 CRITICAL - Hardcoded keys, no real backend

---

## 📋 Critical Issues (Fix This Week)

| Issue | File | Line(s) | Fix |
|-------|------|---------|-----|
| Hardcoded Clerk key | app.json | 27 | Move to .env |
| Hardcoded Clerk key | App.tsx | 710-714 | Remove fallback |
| Duplicate directories | app/, apps/mobile/ | - | Delete both |
| Monolithic component | App.tsx | 1-1015 | Split into 5+ files |
| Mock auth only | api/auth.js | 14-70 | Implement real Clerk verification |
| No database connection | api/*.js | All | Add Prisma client |
| No input validation | api/*.js | All | Add validation |
| CORS too open | api/*.js | Line 4 | Restrict to domain |

---

## 🏗️ Project Structure

```
brouhaha-app/
├── App.tsx (1,014 LOC)          🔴 REFACTOR: Break into components
├── api/                         🟠 TODO: Implement real endpoints
├── prisma/schema.prisma         ✅ GOOD: Use for APIs
├── components/                  ⚠️  MINIMAL: Only legal pages
├── lib/prisma.ts               ⚠️  UNUSED: Import in API
└── Documentation               ✅ GOOD: Keep updated
```

---

## 🔄 Component Breakdown Plan

**Current**: Everything in App.tsx (1,014 lines)

**Target Structure**:
```
components/
├── Header.tsx           (100 LOC)
├── HomePage.tsx         (200 LOC)
├── AdminDashboard.tsx   (150 LOC)
├── CreatorDashboard.tsx (150 LOC)
├── LegalPages.tsx       (50 LOC)
├── Auth/                (Clerk components)
└── Common/              (Reusable UI)
```

---

## 📝 API Endpoints Status

| Endpoint | File | Status | Next Step |
|----------|------|--------|-----------|
| /api/auth | auth.js | 🟠 Mock | Add Clerk verification |
| /api/content | content.js | ❌ Stub | Implement CRUD |
| /api/payments | payments.js | ❌ Stub | Add Stripe SDK |
| /api/users | users.js | ❌ Stub | Implement with Prisma |
| /api/roles | roles.js | ❌ Stub | Add role management |
| /api/videos | videos.js | ❌ Stub | Add Bunny.net SDK |

**Implementation Pattern** (api/content.ts):
```typescript
import { PrismaClient } from '@prisma/client';
import { verifyClerkToken } from '../lib/clerk';

const prisma = new PrismaClient();

export default async (req, res) => {
  // 1. Verify token
  const user = await verifyClerkToken(req);
  if (!user) return res.status(401).json({ error: 'Unauthorized' });

  // 2. Validate input
  if (req.method === 'POST') {
    if (!req.body.title) {
      return res.status(400).json({ error: 'Title required' });
    }
  }

  // 3. Use Prisma
  const content = await prisma.content.findMany();
  res.status(200).json({ content });
};
```

---

## 🛡️ Security Checklist

- [ ] Move all API keys to .env
- [ ] Add Clerk token verification to all API routes
- [ ] Restrict CORS to frontend domain only
- [ ] Add input validation to all endpoints
- [ ] Remove hardcoded test data
- [ ] Add rate limiting (middleware)
- [ ] Set HTTPS headers
- [ ] Enable database encryption
- [ ] Add request logging
- [ ] Set up error monitoring (Sentry)

---

## 🗄️ Database Setup

1. Create Vercel Postgres instance
2. Get DATABASE_URL and DIRECT_URL
3. Create .env file:
   ```
   DATABASE_URL=postgresql://...
   DIRECT_URL=postgresql://...
   ```
4. Run migrations:
   ```bash
   npx prisma migrate dev --name init
   ```
5. Create seed data:
   ```bash
   npx prisma db seed
   ```

---

## 🧪 Testing Priority

1. **Unit Tests** (Jest)
   - Utility functions
   - Component rendering
   - API logic

2. **Integration Tests**
   - API endpoints with database
   - Authentication flows
   - Content CRUD

3. **E2E Tests** (Detox/Cypress)
   - User registration → login → content view
   - Creator upload flow
   - Payment flow

---

## 📦 Dependencies to Add

```bash
# Backend - TypeScript
npm install typescript @types/node @types/express

# Validation
npm install zod

# State Management
npm install zustand

# Testing
npm install --save-dev jest @testing-library/react vitest

# Error Tracking
npm install @sentry/react

# Dev Tools
npm install --save-dev eslint prettier
```

---

## 🚀 Deployment Checklist

**Before Launch**:
- [ ] Remove all hardcoded secrets
- [ ] Set up environment variables on Vercel
- [ ] Run full test suite
- [ ] Performance audit (Lighthouse)
- [ ] Security audit (`npm audit`)
- [ ] Set up error monitoring
- [ ] Configure backups
- [ ] Create deployment runbook
- [ ] Test on all platforms (Web/iOS/Android)
- [ ] Set up CI/CD pipeline

---

## 🔗 Important Files Reference

| File | Purpose | Needed? |
|------|---------|---------|
| App.tsx | Main app | ✅ Keep (refactor) |
| api/auth.js | Authentication | ✅ Keep (rewrite) |
| prisma/schema.prisma | Database | ✅ Keep (use it!) |
| app.json | Expo config | ✅ Keep (fix keys) |
| lib/prisma.ts | ORM client | ✅ Keep (import!) |
| app/ directory | Duplicate | ❌ Delete |
| apps/mobile/api/ | Duplicate | ❌ Delete |

---

## 📊 Metrics to Track

```
Deployment Readiness:
├─ Frontend:        70% → 90%
├─ Backend:         10% → 80%
├─ Database:         0% → 90%
├─ Tests:            0% → 70%
├─ Security:         20% → 95%
├─ Documentation:    80% → 90%
└─ Overall:         25% → 80%
```

---

## 💻 Common Commands

```bash
# Development
npm run web                    # Start web dev server
npm run android              # Start Android emulator
npm run ios                  # Start iOS simulator

# Database
npx prisma studio           # Open DB UI
npx prisma migrate dev      # Create migration
npx prisma db seed          # Seed data

# Testing
npm test                     # Run tests
npm run test:e2e            # Run E2E tests

# Deployment
npm run build               # Build for production
vercel deploy               # Deploy to Vercel
npm run vercel-build        # Vercel build command

# Code Quality
npm run lint                # Run ESLint
npm run format              # Run Prettier
npm audit                   # Check vulnerabilities
```

---

## 🎯 Weekly Milestones

**Week 1**:
- [ ] Security audit complete
- [ ] Duplicate code deleted
- [ ] Keys moved to .env

**Week 2**:
- [ ] App.tsx split into components
- [ ] API endpoints structured
- [ ] Database connected

**Week 3-4**:
- [ ] Real API implementations
- [ ] User management working
- [ ] Tests started

**Week 5-6**:
- [ ] Core features implemented
- [ ] Payment integration
- [ ] Video streaming ready

**Week 7-8**:
- [ ] Full test coverage
- [ ] Performance optimized
- [ ] Production deployment

---

## ❓ Debugging Tips

```javascript
// Check current user
console.log(user);  // From useUser()

// Test API endpoint
curl http://localhost:3000/api/content

// Check database
npx prisma studio

// View Clerk logs
// Go to Clerk dashboard → Logs tab

// Monitor Vercel functions
// Go to Vercel dashboard → Functions tab
```

---

## 📞 Key Contacts / Resources

- **Clerk Docs**: https://clerk.com/docs
- **Expo Docs**: https://docs.expo.dev
- **Prisma Docs**: https://www.prisma.io/docs
- **Vercel Docs**: https://vercel.com/docs
- **React Native**: https://reactnative.dev

---

**Last Updated**: October 16, 2025  
**Next Review**: After Phase 1 completion  
**Status**: 🟠 Ready for Implementation
