/**
 * Content Management API - Secure Implementation
 * Handles content CRUD operations
 * 
 * Security Features:
 * - Authentication required for all endpoints
 * - Input validation and sanitization
 * - Security headers
 * - Rate limiting
 * - SQL injection prevention (via Prisma)
 */

import { IncomingMessage, ServerResponse } from 'http';
import {
  setSecurityHeaders,
  setCORSHeaders,
  verifyClerkToken,
  validateRequired,
  createErrorResponse,
  checkRateLimit,
  sanitizeString
} from '../lib/security';

export default async (req: IncomingMessage, res: ServerResponse) => {
  // Set security headers
  setSecurityHeaders(res);
  setCORSHeaders(res, req.headers.origin as string);

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return res.end();
  }

  try {
    // Rate limiting
    const clientIp = (req.headers['x-forwarded-for'] as string)?.split(',')[0] || 
                     req.socket?.remoteAddress || 'unknown';
    
    if (!checkRateLimit(clientIp, 100, 60 * 1000)) {
      return createErrorResponse(res, 429, 'Too many requests');
    }

    // All endpoints require authentication
    let user;
    try {
      user = await verifyClerkToken(req);
    } catch (error) {
      return createErrorResponse(res, 401, 'Authentication required');
    }

    // GET - List content
    if (req.method === 'GET') {
      // TODO: Implement with Prisma
      // const content = await prisma.content.findMany({
      //   where: { status: 'PUBLISHED' },
      //   take: 20,
      //   skip: 0
      // });
      
      return res.end(JSON.stringify({
        content: [],
        total: 0
      }));
    }

    // POST - Create content
    if (req.method === 'POST') {
      let body = '';

      req.on('data', chunk => {
        body += chunk.toString();
        if (body.length > 1e6) {
          createErrorResponse(res, 413, 'Payload too large');
          req.connection.destroy();
        }
      });

      req.on('end', async () => {
        try {
          const payload = JSON.parse(body);

          // Validate required fields
          const error = validateRequired(payload, ['title', 'type']);
          if (error) {
            return createErrorResponse(res, 400, error);
          }

          // Validate and sanitize
          const title = sanitizeString(payload.title, 200);
          const description = sanitizeString(payload.description || '', 2000);
          const type = sanitizeString(payload.type);

          // Validate content type
          const validTypes = ['WEBTOON', 'BOOK', 'VIDEO'];
          if (!validTypes.includes(type)) {
            return createErrorResponse(res, 400, `Invalid content type. Must be one of: ${validTypes.join(', ')}`);
          }

          if (title.length < 3) {
            return createErrorResponse(res, 400, 'Title must be at least 3 characters');
          }

          // TODO: Use Prisma to create content
          // const content = await prisma.content.create({
          //   data: {
          //     title,
          //     description,
          //     type,
          //     authorId: user.id,
          //     status: 'DRAFT'
          //   }
          // });

          return res.end(JSON.stringify({
            content: {
              id: 'content_123',
              title,
              description,
              type,
              status: 'DRAFT'
            }
          }));
        } catch (parseError) {
          return createErrorResponse(res, 400, 'Invalid JSON payload');
        }
      });

      return;
    }

    // PUT - Update content
    if (req.method === 'PUT') {
      return createErrorResponse(res, 501, 'Not yet implemented');
    }

    // DELETE - Delete content
    if (req.method === 'DELETE') {
      return createErrorResponse(res, 501, 'Not yet implemented');
    }

    createErrorResponse(res, 405, 'Method not allowed');
  } catch (error) {
    console.error('Content API error:', error);
    createErrorResponse(res, 500, 'Internal server error');
  }
};
