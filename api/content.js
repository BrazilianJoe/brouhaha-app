// Content management API
export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    if (req.method === 'GET') {
      // Return sample content
      const content = [
        {
          id: '1',
          title: 'Welcome to Brouhaha',
          description: 'Your cross-platform media consumption platform',
          type: 'WEBTOON',
          status: 'PUBLISHED',
          author: 'Brouhaha Team',
          createdAt: new Date().toISOString()
        },
        {
          id: '2',
          title: 'Getting Started Guide',
          description: 'Learn how to use Brouhaha platform',
          type: 'BOOK',
          status: 'PUBLISHED',
          author: 'Brouhaha Team',
          createdAt: new Date().toISOString()
        }
      ];

      res.status(200).json({ content });
    } else if (req.method === 'POST') {
      // Create new content (placeholder)
      const { title, description, type } = req.body;
      
      const newContent = {
        id: Date.now().toString(),
        title,
        description,
        type: type || 'WEBTOON',
        status: 'DRAFT',
        author: 'User',
        createdAt: new Date().toISOString()
      };

      res.status(201).json({ content: newContent });
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Content API error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}