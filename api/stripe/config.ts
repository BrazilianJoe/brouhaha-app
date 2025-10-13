import { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    res.status(200).json({
      publishableKey: process.env.STRIPE_PUBLISHABLE_KEY || '',
      isConfigured: !!(process.env.STRIPE_PUBLISHABLE_KEY && process.env.STRIPE_SECRET_KEY)
    });

  } catch (error) {
    console.error('Stripe config error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
