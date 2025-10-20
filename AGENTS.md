# AGENTS.md - Brouhaha Media Platform Development Guide

## Project Overview

Brouhaha is a cross-platform media consumption platform supporting webtoons, books, and videos. The platform monetizes through advertisements with Stripe-powered subscriptions to remove ads and support donations. All users must create free accounts to access content, and any registered user can become a content creator.

### Core Features
- **Content Types**: Webtoons, books, videos
- **Monetization**: Ads + Stripe subscriptions + donations
- **User System**: Free account required for all content access
- **Creator Tools**: Available to all registered users
- **Platforms**: Web, iOS, Android (single codebase)

## Development Principles

### DRY (Don't Repeat Yourself)
- Single codebase for web, iOS, and Android
- Shared business logic across platforms
- Reusable components and utilities
- Centralized API layer

### KISS (Keep It Simple, Stupid)
- Simple, intuitive user interfaces
- Clear navigation and content discovery
- Minimal configuration for creators
- Straightforward subscription flow

### Test-Driven Development (TDD)
- Write tests before implementing features
- Maintain high test coverage
- Test critical user flows (auth, payments, content consumption)
- Automated testing pipeline

## Technology Stack

### Frontend Framework: Expo + React Native
**Rationale**: 
- Single codebase for web, iOS, and Android
- Excellent developer experience with Expo tooling
- Strong ecosystem for media consumption apps
- Built-in support for web deployment
- Hot reloading and over-the-air updates

**Key Libraries**:
- `@expo/vector-icons` for icons
- `react-navigation` for navigation
- `expo-av` for video playback
- `expo-image-picker` for content uploads
- `react-native-reanimated` for smooth animations

### Backend: Node.js + Express + TypeScript
**Rationale**:
- Type safety with TypeScript
- Large ecosystem for media handling
- Easy integration with Stripe and Bunny.net
- Scalable architecture

**Key Libraries**:
- `express` for API framework
- `prisma` for database ORM
- `multer` for file uploads
- `stripe` for payment processing
- `jsonwebtoken` for authentication
- `helmet` for security

### Database: PostgreSQL + Prisma
**Rationale**:
- Robust relational database for complex queries
- Excellent TypeScript integration with Prisma
- Strong support for media metadata
- ACID compliance for payment data

### Authentication: Supabase Auth
**Rationale**:
- Built-in user management
- Social login support
- Row Level Security (RLS)
- Real-time subscriptions
- TypeScript SDK

### Video Hosting: Bunny.net
**Rationale**:
- Cost-effective video CDN
- Global edge locations
- Adaptive bitrate streaming
- Analytics and monitoring
- Easy API integration

### Payment Processing: Stripe
**Rationale**:
- Comprehensive subscription management
- Donation support
- Webhook handling
- PCI compliance
- Excellent documentation

### File Storage: Supabase Storage
**Rationale**:
- Integrated with Supabase Auth
- CDN delivery
- Image optimization
- Cost-effective for webtoons/book 

### Deployment & Hosting
- **Web**: Vercel (frontend) + Railway/Render (backend)
- **Mobile**: Expo Application Services (EAS)
- **Database**: Supabase (managed PostgreSQL)
- **CDN**: Bunny.net (videos) + Supabase CDN (images)

## Project Structure

```
brouhaha-app/
├── apps/
│   ├── web/                 # Expo web app
│   ├── mobile/              # Expo mobile app
│   └── admin/               # Admin dashboard (optional)
├── packages/
│   ├── shared/              # Shared utilities and types
│   ├── ui/                  # Reusable UI components
│   └── api/                 # API client and types
├── services/
│   ├── backend/             # Node.js backend
│   └── worker/              # Background jobs
├── docs/                    # Documentation
└── tools/                   # Development tools
```

## Development Workflow

### 1. Project Initialization
- [ ] Set up monorepo with Expo + Node.js
- [ ] Configure TypeScript across all packages
- [ ] Set up Supabase project
- [ ] Configure Stripe account
- [ ] Set up Bunny.net account

### 2. Core Infrastructure
- [ ] Database schema design (users, content, subscriptions)
- [ ] Authentication system with Supabase
- [ ] File upload system for content creators
- [ ] Basic API endpoints

### 3. Content Management
- [ ] Webtoon viewer with pagination
- [ ] Book reader with chapters
- [ ] Video player with Bunny.net integration
- [ ] Content upload interface for creators

### 4. Monetization
- [ ] Ad integration system
- [ ] Stripe subscription flow
- [ ] Donation system
- [ ] Ad-free experience for subscribers

### 5. User Experience
- [ ] Content discovery and search
- [ ] User profiles and preferences
- [ ] Reading/viewing history
- [ ] Bookmarking and favorites

## Testing Strategy

### Unit Tests
- Business logic functions
- API endpoints
- Utility functions
- Component rendering

### Integration Tests
- Authentication flows
- Payment processing
- File upload/download
- Content consumption

### End-to-End Tests
- User registration and login
- Content upload by creators
- Subscription purchase
- Content consumption flow

## Security Considerations

- HTTPS everywhere
- Input validation and sanitization
- Rate limiting on API endpoints
- Secure file upload validation
- Content moderation system
- GDPR compliance for EU users

## Performance Optimization

- Image optimization for webtoons
- Video streaming optimization
- Caching strategies
- Lazy loading for content
- Offline reading capabilities

## Content Moderation

- Automated content scanning
- User reporting system
- Admin moderation tools
- Content guidelines enforcement
- Appeal process for creators

## Digital Rights Management (DRM)

**Anti-Piracy Protection**:
- **Video DRM**: Implement Widevine (Android/Web) and FairPlay (iOS) for video content
- **Webtoon Protection**: Watermarking, encrypted image delivery, screen recording detection
- **Book Protection**: Encrypted PDF/epub with time-limited access tokens
- **Streaming Security**: Token-based authentication for all media streams
- **Offline Protection**: Limited offline downloads with expiration timestamps

**Implementation Strategy**:
- Integrate with Bunny.net DRM services for video content
- Custom watermarking system for webtoons and images
- JWT-based access tokens with short expiration times
- Device fingerprinting to prevent account sharing
- Content encryption at rest and in transit
- Anti-debugging and anti-tampering measures

**Technical Requirements**:
- All media must be served through authenticated endpoints
- Content URLs must include time-limited access tokens
- Implement certificate pinning for mobile apps
- Use encrypted storage for cached content
- Regular token refresh mechanism
- Audit logging for all content access attempts

## Analytics & Monitoring

- User engagement metrics
- Content performance analytics
- Revenue tracking
- Error monitoring
- Performance monitoring

## Deployment Strategy

### Development
- Local development with hot reloading
- Staging environment for testing
- Feature branch deployments

### Production
- Automated CI/CD pipeline
- Blue-green deployments
- Database migrations
- Rollback procedures

## Future Considerations

- **Additional Content Types**: Podcasts, live streaming
- **Social Features**: Comments, reviews, creator following
- **Advanced Monetization**: Creator revenue sharing, premium content
- **Internationalization**: Multi-language support
- **Accessibility**: Screen reader support, keyboard navigation

## Getting Started

1. Review and approve this AGENTS.md
2. Set up development environment
3. Initialize project structure
4. Begin with authentication system
5. Implement core content consumption features
6. Add monetization layer
7. Deploy and iterate

---

## 🔒 CRITICAL: Security Guidelines for AI Agents

**ALL development must follow these security principles. Non-compliance will cause production failures.**

### Security First Principle
1. **NEVER** commit secrets to version control
2. **ALWAYS** validate and sanitize user input
3. **ALWAYS** verify authentication before processing
4. **ALWAYS** use environment variables for sensitive data
5. **ALWAYS** add security headers to API responses

### Environment Variables (CRITICAL)
- **NEVER hardcode API keys, tokens, or passwords in source code**
- **All secrets MUST be in `.env` file (which is `.gitignore`'d)**
- Use `.env.example` as template for developers
- File locations:
  - `EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY` - Clerk auth (public, but still in .env)
  - `CLERK_SECRET_KEY` - Clerk auth (secret, never in code)
  - `DATABASE_URL` - Database connection (secret)
  - `STRIPE_SECRET_KEY` - Payment processing (secret)
  - All others in `.env.example`

**❌ WRONG:**
```typescript
const clerkKey = 'pk_test_abc123...'; // NEVER hardcode!
```

**✅ CORRECT:**
```typescript
const clerkKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;
if (!clerkKey) {
  throw new Error('EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY not configured');
}
```

### Expo Platform Security (Web, iOS, Android)

- **Platform-appropriate auth libraries**:
  - **Web**: use `@clerk/clerk-react` with secure, httpOnly cookies.
  - **iOS/Android**: use `@clerk/clerk-expo` with a `SecureStore` token cache.
- **Never expose secrets in the bundle**:
  - Only use `EXPO_PUBLIC_*` for values safe to ship to clients.
  - Do not put secrets in `app.json` `extra`; prefer environment variables injected at build/runtime.
- **Token storage rules**:
  - Web: cookies with `httpOnly`, `Secure`, `SameSite=strict`.
  - Native: `expo-secure-store` (not `AsyncStorage`).
- **DOM APIs in shared code**:
  - Avoid importing `react-dom` or using `window/document` in shared modules.
  - If needed, guard with `Platform.OS === 'web'` and `typeof window !== 'undefined'`.
- **CSP/CORS for web**:
  - Enforce a strict Content Security Policy and restrict `connect-src` to known domains.
  - Restrict CORS to trusted origins via `CORS_ORIGIN` (no `*` in production).
- **Network hardening on mobile**:
  - Enforce HTTPS everywhere; implement certificate pinning in EAS builds.
  - Validate TLS and fail closed on validation errors.

```typescript
// Example: Clerk Expo with SecureStore token cache (native)
import * as SecureStore from 'expo-secure-store';

const tokenCache = {
  async getToken(key: string) {
    return SecureStore.getItemAsync(key);
  },
  async saveToken(key: string, value: string) {
    await SecureStore.setItemAsync(key, value);
  },
};

// <ClerkProvider publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY} tokenCache={tokenCache}>
```

### API Security

#### 1. **Authentication** (REQUIRED on all endpoints except `/api/auth`)
```typescript
// ✅ Always verify tokens
try {
  const user = await verifyClerkToken(req);
  if (!user) return createErrorResponse(res, 401, 'Unauthorized');
} catch (error) {
  return createErrorResponse(res, 401, 'Authentication failed');
}
```

#### 2. **Input Validation** (REQUIRED for all user input)
```typescript
// ✅ Validate all required fields
const error = validateRequired(req.body, ['email', 'password']);
if (error) return createErrorResponse(res, 400, error);

// ✅ Validate email format
if (!isValidEmail(req.body.email)) {
  return createErrorResponse(res, 400, 'Invalid email format');
}

// ✅ Sanitize strings
const username = sanitizeString(req.body.username);
```

#### 3. **Security Headers** (REQUIRED on all responses)
```typescript
// ✅ Add security headers to every response
setSecurityHeaders(res);
setCORSHeaders(res, req.headers.origin);

// Headers include:
// - X-Content-Type-Options: nosniff
// - X-Frame-Options: DENY
// - X-XSS-Protection: 1; mode=block
// - Strict-Transport-Security
// - Content-Security-Policy
```

#### 4. **CORS Protection** (REQUIRED)
- ❌ NEVER set CORS to `'*'` in production
- ✅ ALWAYS restrict to specific domains
- Configure via `CORS_ORIGIN` environment variable
```typescript
// ✅ Allowed origins from environment
const allowedOrigins = process.env.CORS_ORIGIN?.split(',') || ['http://localhost:3000'];
```

#### 5. **Rate Limiting** (REQUIRED)
```typescript
// ✅ Check rate limits per IP
if (!checkRateLimit(clientIp, 60, 60 * 1000)) {
  return createErrorResponse(res, 429, 'Too many requests');
}
```

#### 6. **Payload Size Limiting** (REQUIRED)
```typescript
// ✅ Prevent DOS with large payloads
if (body.length > 1e6) { // 1MB limit
  createErrorResponse(res, 413, 'Payload too large');
  req.connection.destroy();
}
```

### Data Protection

#### 1. **Never Log Sensitive Data**
```typescript
// ❌ WRONG - exposes secrets
console.log('User token:', token);

// ✅ CORRECT - safe logging
console.log('User authenticated:', user.id);
```

#### 2. **Use Prisma for Database Queries** (prevents SQL injection)
```typescript
// ❌ WRONG - SQL injection vulnerability
const user = await db.query(`SELECT * FROM users WHERE email='${email}'`);

// ✅ CORRECT - Prisma parameterization
const user = await prisma.user.findUnique({
  where: { email }
});
```

#### 3. **Encrypt Sensitive Fields**
- Passwords: Hash with bcrypt (use Prisma middleware)
- API keys: Encrypt in database
- Personal data: Encrypt sensitive fields
- Never store raw passwords

#### 4. **Error Handling** (Don't expose internals)
```typescript
// ❌ WRONG - exposes system details
return res.end(JSON.stringify({ 
  error: 'Database connection failed at pool.connect()' 
}));

// ✅ CORRECT - generic message
return createErrorResponse(res, 500, 'Internal server error');
// Details logged only in development or to monitoring service
```

### Frontend Security

#### 1. **XSS Prevention**
- Always sanitize user input before rendering
- Never use `dangerouslySetInnerHTML` unless absolutely necessary
- Escape all user-generated content

#### 2. **CSRF Protection**
- Include CSRF tokens in forms (Clerk handles this)
- Verify origin on state-changing requests

#### 3. **Secure Token Storage**
- **Web**: Store tokens in secure, httpOnly cookies (never `localStorage`/`sessionStorage`).
- **iOS/Android**: Use `expo-secure-store` via `@clerk/clerk-expo` token cache (never `AsyncStorage`).
- Auto-clear on logout and on token invalidation.
- Prefer short-lived tokens with refresh rotation.

### Development Workflow

#### 1. **Code Review Checklist** (BEFORE any merge)
- [ ] No hardcoded secrets?
- [ ] All user input validated?
- [ ] Security headers added?
- [ ] Rate limiting implemented?
- [ ] Error messages don't expose details?
- [ ] Database queries use Prisma?
- [ ] Sensitive data not logged?
- [ ] Tests include security scenarios?

#### 2. **Testing** (REQUIRED)
```typescript
// Always test security scenarios
describe('Authentication', () => {
  it('should reject requests without token', async () => {
    const res = await api.get('/api/content');
    expect(res.status).toBe(401);
  });

  it('should reject invalid tokens', async () => {
    const res = await api.get('/api/content', {
      headers: { Authorization: 'Bearer invalid' }
    });
    expect(res.status).toBe(401);
  });
});
```

### Deployment Security

#### 1. **Environment Variables**
- Never commit `.env` files
- Use Vercel environment variable UI
- Rotate secrets regularly
- Different secrets for staging/production

#### 2. **Monitoring**
- Enable Sentry for error tracking
- Review logs for suspicious activity
- Set up alerts for security events
- Monitor rate limit spikes

#### 3. **Secrets Management**
```bash
# ✅ DO set secrets in Vercel UI
# Settings → Environment Variables → Production

# ❌ DON'T commit to repo
# Don't add .env to git
# Don't hardcode in source

# ✅ DO rotate regularly
# Change API keys monthly
# Update webhooks when rotating
```

### Security Incident Response

**If a security issue is discovered:**

1. **Immediate** (within 1 hour)
   - Revoke compromised credentials
   - Deploy fix to production
   - Notify affected users

2. **Short-term** (within 24 hours)
   - Document root cause
   - Implement permanent fix
   - Add tests to prevent regression
   - Update security guidelines if needed

3. **Long-term** (within 1 week)
   - Post-mortem analysis
   - Update security review process
   - Add monitoring alerts
   - Train team

### Libraries & Tools

**Always Use:**
- ✅ Clerk for authentication (handles security)
- ✅ Prisma for database (prevents SQL injection)
- ✅ Zod for input validation
- ✅ Sentry for error monitoring
- ✅ npm audit for dependency scanning

**Never Use:**
- ❌ Custom authentication implementations
- ❌ Raw SQL queries
- ❌ eval() or Function() constructors
- ❌ Deprecated packages
- ❌ Packages with known vulnerabilities

### Red Flags (STOP and Review)

**These patterns indicate a security problem:**

1. `❌ "let me just hardcode this temporarily"`
   → Will end up in production
   
2. `❌ "we'll add validation later"`
   → Always skip validation if not immediate
   
3. `❌ "this endpoint doesn't need authentication"`
   → Assume everything needs authentication
   
4. `❌ "just log the whole request/response"`
   → Logs can be accessed by attackers
   
5. `❌ "we don't need rate limiting, we're too small"`
   → Rate limiting prevents abuse at any scale
   
6. `❌ "security will slow us down"`
   → Security violations cost more time later
   
7. `❌ "this is development, security doesn't matter"`
   → Bugs from dev end up in production

### Security Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Node.js Security Best Practices](https://nodejs.org/en/docs/guides/nodejs-security/)
- [Clerk Security](https://clerk.com/docs/security)
- [Prisma Security](https://www.prisma.io/docs/concepts/more/security)
- [React Security](https://react.dev/learn/security)

### Questions for Security Review

Before committing ANY code, ask yourself:

1. Does this endpoint require authentication? (probably yes)
2. Is all user input validated? (probably no, add it)
3. Could this data be malicious? (probably yes, sanitize it)
4. Am I logging sensitive information? (check)
5. Could this endpoint be rate-limited? (yes, add it)
6. Are security headers present? (check)
7. Could an attacker exploit this? (think hard)
8. Would I deploy this to production? (if no, don't commit)

---

**Note**: This document should be updated as the project evolves. All development decisions should align with the DRY, KISS, and TDD principles outlined above.
