const { prisma } = require('../../lib/prisma');
const jwt = require('jsonwebtoken');

module.exports = async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET' && req.method !== 'PUT') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Extract token from Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const token = authHeader.substring(7);

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret');
    
    if (req.method === 'GET') {
      // Get user profile
      const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
        select: {
          id: true,
          email: true,
          username: true,
          role: true,
          createdAt: true,
          updatedAt: true
        }
      });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.status(200).json({ user });

    } else if (req.method === 'PUT') {
      // Update user profile
      const { username } = req.body;

      if (!username) {
        return res.status(400).json({ error: 'Username is required' });
      }

      const user = await prisma.user.update({
        where: { id: decoded.userId },
        data: { username },
        select: {
          id: true,
          email: true,
          username: true,
          role: true,
          createdAt: true,
          updatedAt: true
        }
      });

      res.status(200).json({ user });
    }

  } catch (error) {
    console.error('Profile error:', error);
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Invalid token' });
    }
    
    res.status(500).json({ error: 'Internal server error' });
  }
};
