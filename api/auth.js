// Authentication and authorization API
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

    // Role hierarchy
    const roleHierarchy = {
      superadmin: 5,
      admin: 4,
      moderator: 3,
      creator: 2,
      reader: 1
    };

    // Helper function to check permissions
    const hasPermission = (userRole, requiredPermission) => {
      if (userRole === 'superadmin') return true;
      
      const permissions = {
        admin: ['manage_users', 'manage_content', 'manage_payments', 'view_analytics', 'moderate_content', 'manage_reports'],
        moderator: ['moderate_content', 'manage_reports', 'view_analytics', 'manage_comments'],
        creator: ['create_content', 'manage_own_content', 'view_own_analytics', 'upload_files', 'publish_content'],
        reader: ['view_content', 'create_reports', 'bookmark_content', 'rate_content']
      };
      
      return permissions[userRole]?.includes(requiredPermission) || false;
    };

    // Helper function to check role hierarchy
    const hasRoleLevel = (userRole, requiredLevel) => {
      return roleHierarchy[userRole] >= requiredLevel;
    };

    if (req.method === 'GET') {
      const { action } = req.query;
      
      if (action === 'profile') {
        // Get user profile (requires authentication)
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
          return res.status(401).json({ error: 'Authentication required' });
        }
        
        const token = authHeader.substring(7);
        // In a real app, you would verify the JWT token here
        // For now, we'll use a simple mock token system
        
        if (token === 'mock-token-superadmin') {
          const user = users.find(u => u.role === 'superadmin');
          return res.status(200).json({ user });
        } else if (token === 'mock-token-admin') {
          const user = users.find(u => u.role === 'admin');
          return res.status(200).json({ user });
        } else if (token === 'mock-token-moderator') {
          const user = users.find(u => u.role === 'moderator');
          return res.status(200).json({ user });
        } else if (token === 'mock-token-creator') {
          const user = users.find(u => u.role === 'creator');
          return res.status(200).json({ user });
        } else if (token === 'mock-token-reader') {
          const user = users.find(u => u.role === 'reader');
          return res.status(200).json({ user });
        } else {
          return res.status(401).json({ error: 'Invalid token' });
        }
      } else if (action === 'check-permission') {
        // Check if user has specific permission
        const { permission, userRole } = req.query;
        
        if (!permission || !userRole) {
          return res.status(400).json({ error: 'Permission and userRole are required' });
        }
        
        const hasAccess = hasPermission(userRole, permission);
        
        res.status(200).json({ 
          hasPermission: hasAccess,
          permission,
          userRole
        });
      } else if (action === 'check-role-level') {
        // Check if user has required role level
        const { requiredLevel, userRole } = req.query;
        
        if (!requiredLevel || !userRole) {
          return res.status(400).json({ error: 'RequiredLevel and userRole are required' });
        }
        
        const hasAccess = hasRoleLevel(userRole, parseInt(requiredLevel));
        
        res.status(200).json({ 
          hasRoleLevel: hasAccess,
          requiredLevel: parseInt(requiredLevel),
          userRole,
          userLevel: roleHierarchy[userRole]
        });
      } else {
        res.status(400).json({ error: 'Invalid action' });
      }
    } else if (req.method === 'POST') {
      const { action } = req.body;
      
      if (action === 'login') {
        // Mock login (in real app, this would verify credentials)
        const { email, password } = req.body;
        
        if (!email || !password) {
          return res.status(400).json({ error: 'Email and password are required' });
        }
        
        const user = users.find(u => u.email === email);
        if (!user) {
          return res.status(401).json({ error: 'Invalid credentials' });
        }
        
        // Mock password verification (in real app, use bcrypt)
        if (password !== 'password123') {
          return res.status(401).json({ error: 'Invalid credentials' });
        }
        
        // Generate mock token based on role
        const token = `mock-token-${user.role}`;
        
        // Update last login
        user.lastLogin = new Date().toISOString();
        
        res.status(200).json({
          token,
          user: {
            id: user.id,
            email: user.email,
            username: user.username,
            role: user.role,
            firstName: user.firstName,
            lastName: user.lastName
          }
        });
      } else if (action === 'register') {
        // Mock registration
        const { email, username, password, firstName, lastName } = req.body;
        
        if (!email || !username || !password) {
          return res.status(400).json({ error: 'Email, username, and password are required' });
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
          role: 'reader', // Default role
          firstName: firstName || '',
          lastName: lastName || '',
          createdAt: new Date().toISOString(),
          lastLogin: new Date().toISOString(),
          status: 'active'
        };
        
        users.push(newUser);
        
        // Generate mock token
        const token = `mock-token-${newUser.role}`;
        
        res.status(201).json({
          token,
          user: {
            id: newUser.id,
            email: newUser.email,
            username: newUser.username,
            role: newUser.role,
            firstName: newUser.firstName,
            lastName: newUser.lastName
          }
        });
      } else {
        res.status(400).json({ error: 'Invalid action' });
      }
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Auth API error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
