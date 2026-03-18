import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getDb } from '../../../../db';
import { registrations } from '../../../../db/schema';
import { SPONSORSHIP_TIERS, type SponsorshipTierId } from '../../../lib/packages';
import { eq } from 'drizzle-orm';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      httpClient: Stripe.createFetchHttpClient(),
    });
    const { name, email, phone, companyName, tierId } = body;

    if (!name || !email || !phone || !companyName || !tierId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const tier = SPONSORSHIP_TIERS[tierId as SponsorshipTierId];
    if (!tier) {
      return NextResponse.json({ error: 'Invalid sponsorship tier' }, { status: 400 });
    }

    const db = getDb();

    const [registration] = await db
      .insert(registrations)
      .values({
        type: 'sponsorship',
        name,
        email,
        phone,
        companyName,
        packageId: tier.id,
        packageName: tier.name,
        priceInCents: tier.priceInCents,
        paymentStatus: 'pending',
      })
      .returning();

    const origin = request.headers.get('origin') || 'https://www.lovelacememorial.com';

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `Lovelace Memorial Cup - ${tier.name}`,
              description: `Sponsorship — 3rd Annual Lovelace Memorial Cup Golf Tournament — June 29, 2026`,
            },
            unit_amount: tier.priceInCents,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${origin}/registration/success`,
      cancel_url: `${origin}/registration/cancel`,
      customer_email: email,
      metadata: {
        registrationId: String(registration.id),
      },
    });

    await db
      .update(registrations)
      .set({ stripeSessionId: session.id })
      .where(eq(registrations.id, registration.id));

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Sponsorship error:', error);
    return NextResponse.json({ error: 'Failed to process sponsorship' }, { status: 500 });
  }
}
