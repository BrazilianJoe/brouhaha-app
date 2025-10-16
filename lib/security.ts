/**
 * Security Utilities for Brouhaha API
 * Provides authentication, validation, CORS, and security helpers
 */

import { IncomingMessage, ServerResponse } from 'http';

/**
 * Get environment variable with validation
 */
export function getEnvVar(key: string, required: boolean = true): string {
  const value = process.env[key];
  if (!value && required) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value || '';
}

/**
 * Verify Clerk authentication token
 * @throws Error if token is invalid or missing
 */
export async function verifyClerkToken(req: IncomingMessage): Promise<any> {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new Error('Missing or invalid Authorization header');
  }

  const token = authHeader.substring(7);

  // TODO: Implement actual Clerk JWT verification
  // For now, this is a placeholder - replace with real Clerk SDK
  if (!token) {
    throw new Error('Invalid token');
  }

  return { token };
}

/**
 * Set security headers on response
 */
export function setSecurityHeaders(res: ServerResponse): void {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  res.setHeader('Content-Security-Policy', "default-src 'self'");
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
}

/**
 * Set CORS headers safely
 */
export function setCORSHeaders(res: ServerResponse, origin?: string): void {
  const allowedOrigins = (process.env.CORS_ORIGIN || 'http://localhost:3000').split(',');
  const requestOrigin = origin || '';
  
  if (allowedOrigins.includes(requestOrigin) || process.env.NODE_ENV === 'development') {
    res.setHeader('Access-Control-Allow-Origin', requestOrigin || allowedOrigins[0]);
  }
  
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Max-Age', '3600');
}

/**
 * Validate required fields in request body
 */
export function validateRequired(body: any, fields: string[]): string | null {
  for (const field of fields) {
    if (!body[field]) {
      return `Missing required field: ${field}`;
    }
  }
  return null;
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Sanitize string to prevent XSS
 */
export function sanitizeString(str: string, maxLength: number = 1000): string {
  if (!str) return '';
  
  // Trim and limit length
  let sanitized = str.trim().substring(0, maxLength);
  
  // Remove HTML/script tags
  sanitized = sanitized.replace(/<[^>]*>/g, '');
  
  // Escape special characters
  sanitized = sanitized
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
  
  return sanitized;
}

/**
 * Create error response with proper logging
 */
export function createErrorResponse(
  res: ServerResponse,
  status: number,
  message: string,
  details?: any
): void {
  // Log error securely (don't log sensitive data)
  console.error(`[${status}] ${message}`, { timestamp: new Date().toISOString() });
  
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.end(
    JSON.stringify({
      error: message,
      status,
      timestamp: new Date().toISOString(),
      // Only include details in development
      ...(process.env.NODE_ENV === 'development' && { details })
    })
  );
}

/**
 * Rate limiting check (simple in-memory implementation)
 * TODO: Replace with Redis for production
 */
const requestCounts = new Map<string, number[]>();

export function checkRateLimit(
  identifier: string,
  maxRequests: number = 60,
  windowMs: number = 60 * 1000
): boolean {
  const now = Date.now();
  const windowStart = now - windowMs;
  
  if (!requestCounts.has(identifier)) {
    requestCounts.set(identifier, []);
  }
  
  const requests = requestCounts.get(identifier)!;
  const recentRequests = requests.filter(timestamp => timestamp > windowStart);
  
  if (recentRequests.length >= maxRequests) {
    return false;
  }
  
  recentRequests.push(now);
  requestCounts.set(identifier, recentRequests);
  
  return true;
}

/**
 * Logout expired entries from rate limiter (call periodically)
 */
export function cleanupRateLimit(): void {
  const now = Date.now();
  const windowMs = 60 * 1000;
  
  for (const [key, timestamps] of requestCounts.entries()) {
    const valid = timestamps.filter(ts => now - ts < windowMs);
    if (valid.length === 0) {
      requestCounts.delete(key);
    } else {
      requestCounts.set(key, valid);
    }
  }
}
