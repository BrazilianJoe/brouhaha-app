/**
 * Authentication API - Secure Implementation
 * Handles user authentication and authorization
 * 
 * Security Features:
 * - Clerk token verification
 * - Input validation
 * - Security headers
 * - CORS protection
 * - Rate limiting
 */

import { IncomingMessage, ServerResponse } from 'http';
import {
  setSecurityHeaders,
  setCORSHeaders,
  verifyClerkToken,
  validateRequired,
  isValidEmail,
  createErrorResponse,
  checkRateLimit,
  sanitizeString
} from '../lib/security';

export default async (req: IncomingMessage, res: ServerResponse) => {
  // Set security headers on every response
  setSecurityHeaders(res);
  setCORSHeaders(res, req.headers.origin as string);

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return res.end();
  }

  try {
    // Rate limiting - 60 requests per minute per IP
    const clientIp = (req.headers['x-forwarded-for'] as string)?.split(',')[0] || 
                     req.socket?.remoteAddress || 'unknown';
    
    if (!checkRateLimit(clientIp, 60, 60 * 1000)) {
      return createErrorResponse(res, 429, 'Too many requests');
    }

    // GET endpoints
    if (req.method === 'GET') {
      const url = new URL(req.url || '', 'http://localhost');
      const action = url.searchParams.get('action');

      if (action === 'profile') {
        // Get user profile (requires authentication)
        try {
          await verifyClerkToken(req);
          
          // TODO: Fetch actual user from database using Clerk user ID
          return res.end(JSON.stringify({
            user: {
              id: 'user_123',
              email: 'user@example.com',
              firstName: 'John',
              lastName: 'Doe'
            }
          }));
        } catch (error) {
          return createErrorResponse(res, 401, 'Authentication required');
        }
      }

      return createErrorResponse(res, 400, 'Invalid action');
    }

    // POST endpoints
    if (req.method === 'POST') {
      let body = '';
      
      req.on('data', chunk => {
        body += chunk.toString();
        // Prevent large payloads
        if (body.length > 1e6) {
          createErrorResponse(res, 413, 'Payload too large');
          req.connection.destroy();
        }
      });

      req.on('end', async () => {
        try {
          const payload = JSON.parse(body);
          const action = payload.action;

          if (action === 'login') {
            // Validate input
            const error = validateRequired(payload, ['email', 'password']);
            if (error) {
              return createErrorResponse(res, 400, error);
            }

            const email = sanitizeString(payload.email);
            if (!isValidEmail(email)) {
              return createErrorResponse(res, 400, 'Invalid email format');
            }

            // TODO: Implement real Clerk authentication
            // This is a placeholder
            return res.end(JSON.stringify({
              token: 'jwt_token_here',
              user: { id: 'user_123', email }
            }));
          }

          if (action === 'register') {
            // Validate input
            const error = validateRequired(payload, ['email', 'username', 'password']);
            if (error) {
              return createErrorResponse(res, 400, error);
            }

            const email = sanitizeString(payload.email);
            const username = sanitizeString(payload.username);

            if (!isValidEmail(email)) {
              return createErrorResponse(res, 400, 'Invalid email format');
            }

            if (username.length < 3 || username.length > 50) {
              return createErrorResponse(res, 400, 'Username must be 3-50 characters');
            }

            // TODO: Use Clerk API to create user
            return res.end(JSON.stringify({
              token: 'jwt_token_here',
              user: { id: 'user_123', email, username }
            }));
          }

          return createErrorResponse(res, 400, 'Invalid action');
        } catch (parseError) {
          return createErrorResponse(res, 400, 'Invalid JSON payload');
        }
      });

      return;
    }

    createErrorResponse(res, 405, 'Method not allowed');
  } catch (error) {
    console.error('Auth API error:', error);
    createErrorResponse(res, 500, 'Internal server error');
  }
};
