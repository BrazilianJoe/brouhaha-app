// Role management API
module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // Role definitions with hierarchy and permissions
    const roles = [
      {
        id: 'superadmin',
        name: 'Super Admin',
        level: 5,
        description: 'Full system access with all permissions',
        permissions: [
          'all'
        ],
        color: '#ff6b6b',
        icon: '👑'
      },
      {
        id: 'admin',
        name: 'Administrator',
        level: 4,
        description: 'System administration with user and content management',
        permissions: [
          'manage_users',
          'manage_content',
          'manage_payments',
          'view_analytics',
          'moderate_content',
          'manage_reports'
        ],
        color: '#667eea',
        icon: '🛡️'
      },
      {
        id: 'moderator',
        name: 'Moderator',
        level: 3,
        description: 'Content moderation and community management',
        permissions: [
          'moderate_content',
          'manage_reports',
          'view_analytics',
          'manage_comments'
        ],
        color: '#feca57',
        icon: '⚖️'
      },
      {
        id: 'creator',
        name: 'Content Creator',
        level: 2,
        description: 'Content creation and self-publishing',
        permissions: [
          'create_content',
          'manage_own_content',
          'view_own_analytics',
          'upload_files',
          'publish_content'
        ],
        color: '#48dbfb',
        icon: '🎨'
      },
      {
        id: 'reader',
        name: 'Reader',
        level: 1,
        description: 'Basic user with content consumption access',
        permissions: [
          'view_content',
          'create_reports',
          'bookmark_content',
          'rate_content'
        ],
        color: '#a55eea',
        icon: '👤'
      }
    ];

    // Permission definitions
    const permissions = [
      {
        id: 'all',
        name: 'All Permissions',
        description: 'Access to all system features and data',
        category: 'system'
      },
      {
        id: 'manage_users',
        name: 'Manage Users',
        description: 'Create, update, and delete user accounts',
        category: 'users'
      },
      {
        id: 'manage_content',
        name: 'Manage Content',
        description: 'Create, update, and delete all content',
        category: 'content'
      },
      {
        id: 'manage_payments',
        name: 'Manage Payments',
        description: 'Handle subscriptions and payment processing',
        category: 'payments'
      },
      {
        id: 'view_analytics',
        name: 'View Analytics',
        description: 'Access to system analytics and reports',
        category: 'analytics'
      },
      {
        id: 'moderate_content',
        name: 'Moderate Content',
        description: 'Review and moderate user-generated content',
        category: 'moderation'
      },
      {
        id: 'manage_reports',
        name: 'Manage Reports',
        description: 'Handle user reports and complaints',
        category: 'moderation'
      },
      {
        id: 'create_content',
        name: 'Create Content',
        description: 'Create new content (webtoons, books, videos)',
        category: 'content'
      },
      {
        id: 'manage_own_content',
        name: 'Manage Own Content',
        description: 'Edit and delete own content',
        category: 'content'
      },
      {
        id: 'view_own_analytics',
        name: 'View Own Analytics',
        description: 'View analytics for own content',
        category: 'analytics'
      },
      {
        id: 'upload_files',
        name: 'Upload Files',
        description: 'Upload media files for content',
        category: 'content'
      },
      {
        id: 'publish_content',
        name: 'Publish Content',
        description: 'Publish content to the platform',
        category: 'content'
      },
      {
        id: 'view_content',
        name: 'View Content',
        description: 'Access to view platform content',
        category: 'content'
      },
      {
        id: 'create_reports',
        name: 'Create Reports',
        description: 'Report inappropriate content or users',
        category: 'moderation'
      },
      {
        id: 'bookmark_content',
        name: 'Bookmark Content',
        description: 'Save content for later viewing',
        category: 'content'
      },
      {
        id: 'rate_content',
        name: 'Rate Content',
        description: 'Rate and review content',
        category: 'content'
      },
      {
        id: 'manage_comments',
        name: 'Manage Comments',
        description: 'Moderate comments and discussions',
        category: 'moderation'
      }
    ];

    if (req.method === 'GET') {
      const { type } = req.query;
      
      if (type === 'permissions') {
        res.status(200).json({ permissions });
      } else {
        res.status(200).json({ roles });
      }
    } else if (req.method === 'POST') {
      // Create new role
      const { name, level, description, permissions: rolePermissions, color, icon } = req.body;
      
      if (!name || !level || !description) {
        return res.status(400).json({ error: 'Name, level, and description are required' });
      }
      
      // Check if role already exists
      const existingRole = roles.find(r => r.name.toLowerCase() === name.toLowerCase());
      if (existingRole) {
        return res.status(409).json({ error: 'Role already exists' });
      }
      
      const newRole = {
        id: name.toLowerCase().replace(/\s+/g, '_'),
        name,
        level: parseInt(level),
        description,
        permissions: rolePermissions || [],
        color: color || '#667eea',
        icon: icon || '👤'
      };
      
      roles.push(newRole);
      
      res.status(201).json({ role: newRole });
    } else if (req.method === 'PUT') {
      // Update role
      const { roleId } = req.query;
      const { name, level, description, permissions: rolePermissions, color, icon } = req.body;
      
      if (!roleId) {
        return res.status(400).json({ error: 'Role ID is required' });
      }
      
      const roleIndex = roles.findIndex(r => r.id === roleId);
      if (roleIndex === -1) {
        return res.status(404).json({ error: 'Role not found' });
      }
      
      // Update role
      if (name) roles[roleIndex].name = name;
      if (level) roles[roleIndex].level = parseInt(level);
      if (description) roles[roleIndex].description = description;
      if (rolePermissions) roles[roleIndex].permissions = rolePermissions;
      if (color) roles[roleIndex].color = color;
      if (icon) roles[roleIndex].icon = icon;
      
      res.status(200).json({ role: roles[roleIndex] });
    } else if (req.method === 'DELETE') {
      // Delete role
      const { roleId } = req.query;
      
      if (!roleId) {
        return res.status(400).json({ error: 'Role ID is required' });
      }
      
      const roleIndex = roles.findIndex(r => r.id === roleId);
      if (roleIndex === -1) {
        return res.status(404).json({ error: 'Role not found' });
      }
      
      // Prevent deletion of system roles
      const systemRoles = ['superadmin', 'admin', 'moderator', 'creator', 'reader'];
      if (systemRoles.includes(roleId)) {
        return res.status(403).json({ error: 'Cannot delete system roles' });
      }
      
      roles.splice(roleIndex, 1);
      
      res.status(200).json({ message: 'Role deleted successfully' });
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Roles API error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
