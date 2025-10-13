// Bunny.net video API
export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    if (req.method === 'GET') {
      // Return sample videos
      const videos = [
        {
          id: '1',
          title: 'Welcome Video',
          description: 'Introduction to Brouhaha platform',
          thumbnailUrl: 'https://via.placeholder.com/300x200/667eea/ffffff?text=Welcome',
          streamUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
          duration: 120,
          createdAt: new Date().toISOString()
        },
        {
          id: '2',
          title: 'Platform Demo',
          description: 'See Brouhaha in action',
          thumbnailUrl: 'https://via.placeholder.com/300x200/764ba2/ffffff?text=Demo',
          streamUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
          duration: 180,
          createdAt: new Date().toISOString()
        }
      ];

      res.status(200).json({ videos });
    } else if (req.method === 'POST') {
      // Handle video upload (placeholder)
      const { title, description } = req.body;
      
      const newVideo = {
        id: Date.now().toString(),
        title,
        description,
        thumbnailUrl: 'https://via.placeholder.com/300x200/667eea/ffffff?text=New+Video',
        streamUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        duration: 0,
        createdAt: new Date().toISOString()
      };

      res.status(201).json({ video: newVideo });
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Videos API error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}