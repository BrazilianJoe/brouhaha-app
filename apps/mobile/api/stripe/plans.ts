import { VercelRequest, VercelResponse } from '@vercel/node';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

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
    // Check if Stripe is configured
    if (!process.env.STRIPE_SECRET_KEY) {
      return res.status(200).json({
        plans: [
          {
            id: 'free',
            name: 'Free',
            price: 0,
            currency: 'usd',
            interval: 'month',
            features: ['Access to all content', 'Ads included']
          },
          {
            id: 'premium',
            name: 'Premium',
            price: 999,
            currency: 'usd',
            interval: 'month',
            features: ['Access to all content', 'No ads', 'Priority support']
          }
        ]
      });
    }

    // Get Stripe products and prices
    const products = await stripe.products.list({
      active: true,
      expand: ['data.default_price']
    });

    const plans = products.data.map(product => {
      const price = product.default_price as Stripe.Price;
      return {
        id: product.id,
        name: product.name,
        price: price.unit_amount,
        currency: price.currency,
        interval: price.recurring?.interval || 'month',
        features: product.description ? [product.description] : []
      };
    });

    res.status(200).json({ plans });

  } catch (error) {
    console.error('Stripe plans error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
