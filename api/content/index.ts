import { VercelRequest, VercelResponse } from '@vercel/node';
import { prisma } from '../../lib/prisma';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    if (req.method === 'GET') {
      // Get all content
      const content = await prisma.content.findMany({
        include: {
          chapters: {
            include: {
              media: true
            }
          },
          author: {
            select: {
              id: true,
              username: true,
              email: true
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        }
      });

      res.status(200).json({ content });

    } else if (req.method === 'POST') {
      // Create new content
      const { title, description, type, status } = req.body;

      if (!title || !type) {
        return res.status(400).json({ error: 'Title and type are required' });
      }

      // For MVP, we'll use a default author (super admin)
      const superAdmin = await prisma.user.findFirst({
        where: { role: 'SUPER_ADMIN' }
      });

      if (!superAdmin) {
        return res.status(500).json({ error: 'Super admin not found' });
      }

      const content = await prisma.content.create({
        data: {
          title,
          description: description || '',
          type: type.toUpperCase(),
          status: status || 'DRAFT',
          authorId: superAdmin.id
        },
        include: {
          author: {
            select: {
              id: true,
              username: true,
              email: true
            }
          }
        }
      });

      res.status(201).json({ content });

    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }

  } catch (error) {
    console.error('Content error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
