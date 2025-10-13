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
- Cost-effective for webtoons/books

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

**Note**: This document should be updated as the project evolves. All development decisions should align with the DRY, KISS, and TDD principles outlined above.
