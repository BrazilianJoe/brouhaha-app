const jwt = require('jsonwebtoken');

// Mock database for MVP
const mockUsers = [
  {
    id: '1',
    email: 'tiago.freire@gmail.com',
    password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password: admin123
    username: 'tiago',
    role: 'SUPER_ADMIN',
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

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
      const user = mockUsers.find(u => u.id === decoded.userId);

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      const { password, ...userWithoutPassword } = user;
      res.status(200).json({ user: userWithoutPassword });

    } else if (req.method === 'PUT') {
      // Update user profile
      const { username } = req.body;

      if (!username) {
        return res.status(400).json({ error: 'Username is required' });
      }

      const userIndex = mockUsers.findIndex(u => u.id === decoded.userId);
      if (userIndex === -1) {
        return res.status(404).json({ error: 'User not found' });
      }

      mockUsers[userIndex].username = username;
      mockUsers[userIndex].updatedAt = new Date();

      const { password, ...userWithoutPassword } = mockUsers[userIndex];
      res.status(200).json({ user: userWithoutPassword });
    }

  } catch (error) {
    console.error('Profile error:', error);
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Invalid token' });
    }
    
    res.status(500).json({ error: 'Internal server error' });
  }
};
