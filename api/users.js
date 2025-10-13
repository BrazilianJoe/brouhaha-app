// User management API with role-based access control
module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // Mock user database with roles
    const users = [
      {
        id: '1',
        email: 'tiago.freire@gmail.com',
        username: 'brazilianjoe',
        role: 'superadmin',
        firstName: 'Tiago',
        lastName: 'Freire',
        createdAt: '2025-01-01T00:00:00Z',
        lastLogin: new Date().toISOString(),
        status: 'active'
      },
      {
        id: '2',
        email: 'admin@brouhaha.com',
        username: 'admin',
        role: 'admin',
        firstName: 'Admin',
        lastName: 'User',
        createdAt: '2025-01-01T00:00:00Z',
        lastLogin: new Date().toISOString(),
        status: 'active'
      },
      {
        id: '3',
        email: 'moderator@brouhaha.com',
        username: 'moderator',
        role: 'moderator',
        firstName: 'Moderator',
        lastName: 'User',
        createdAt: '2025-01-01T00:00:00Z',
        lastLogin: new Date().toISOString(),
        status: 'active'
      },
      {
        id: '4',
        email: 'creator@brouhaha.com',
        username: 'creator',
        role: 'creator',
        firstName: 'Creator',
        lastName: 'User',
        createdAt: '2025-01-01T00:00:00Z',
        lastLogin: new Date().toISOString(),
        status: 'active'
      },
      {
        id: '5',
        email: 'reader@brouhaha.com',
        username: 'reader',
        role: 'reader',
        firstName: 'Reader',
        lastName: 'User',
        createdAt: '2025-01-01T00:00:00Z',
        lastLogin: new Date().toISOString(),
        status: 'active'
      }
    ];

    // Role hierarchy and permissions
    const roleHierarchy = {
      superadmin: 5,
      admin: 4,
      moderator: 3,
      creator: 2,
      reader: 1
    };

    const permissions = {
      superadmin: ['all'],
      admin: ['manage_users', 'manage_content', 'manage_payments', 'view_analytics'],
      moderator: ['moderate_content', 'manage_reports', 'view_analytics'],
      creator: ['create_content', 'manage_own_content', 'view_own_analytics'],
      reader: ['view_content', 'create_reports']
    };

    if (req.method === 'GET') {
      const { role, status, limit = 50, offset = 0 } = req.query;
      
      let filteredUsers = users;
      
      // Filter by role
      if (role) {
        filteredUsers = filteredUsers.filter(user => user.role === role);
      }
      
      // Filter by status
      if (status) {
        filteredUsers = filteredUsers.filter(user => user.status === status);
      }
      
      // Pagination
      const paginatedUsers = filteredUsers.slice(offset, offset + limit);
      
      res.status(200).json({
        users: paginatedUsers,
        total: filteredUsers.length,
        pagination: {
          limit: parseInt(limit),
          offset: parseInt(offset),
          hasMore: offset + limit < filteredUsers.length
        }
      });
    } else if (req.method === 'POST') {
      // Create new user
      const { email, username, role = 'reader', firstName, lastName } = req.body;
      
      if (!email || !username) {
        return res.status(400).json({ error: 'Email and username are required' });
      }
      
      // Check if user already exists
      const existingUser = users.find(u => u.email === email || u.username === username);
      if (existingUser) {
        return res.status(409).json({ error: 'User already exists' });
      }
      
      const newUser = {
        id: String(users.length + 1),
        email,
        username,
        role,
        firstName: firstName || '',
        lastName: lastName || '',
        createdAt: new Date().toISOString(),
        lastLogin: null,
        status: 'active'
      };
      
      users.push(newUser);
      
      res.status(201).json({ user: newUser });
    } else if (req.method === 'PUT') {
      // Update user role or status
      const { userId } = req.query;
      const { role, status } = req.body;
      
      if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
      }
      
      const userIndex = users.findIndex(u => u.id === userId);
      if (userIndex === -1) {
        return res.status(404).json({ error: 'User not found' });
      }
      
      // Update user
      if (role) users[userIndex].role = role;
      if (status) users[userIndex].status = status;
      
      res.status(200).json({ user: users[userIndex] });
    } else if (req.method === 'DELETE') {
      // Soft delete user
      const { userId } = req.query;
      
      if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
      }
      
      const userIndex = users.findIndex(u => u.id === userId);
      if (userIndex === -1) {
        return res.status(404).json({ error: 'User not found' });
      }
      
      // Soft delete by setting status to inactive
      users[userIndex].status = 'inactive';
      
      res.status(200).json({ message: 'User deactivated successfully' });
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Users API error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
