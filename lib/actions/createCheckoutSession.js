import Stripe from 'stripe';
import { NextResponse } from 'next/server';

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export async function createCheckoutSession(req, res) {
  const domainURL = process.env.NEXT_PUBLIC_DOMAIN_URL;
  const priceId = 'price_1NZlqSDmlUUr9uNW13LqdNIE';

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${domainURL}/success`,
    cancel_url: `${domainURL}/pricing`,
  });

  console.log('From inside createCheckoutSession', session);

  return session.url;
}
