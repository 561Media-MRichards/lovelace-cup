import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getDb } from '../../../../db';
import { registrations } from '../../../../db/schema';
import { PACKAGES, type PackageId } from '../../../lib/packages';
import { eq } from 'drizzle-orm';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-02-25.clover',
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, teamName, specialRequests, packageId } = body;

    if (!name || !email || !phone || !packageId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const pkg = PACKAGES[packageId as PackageId];
    if (!pkg) {
      return NextResponse.json({ error: 'Invalid package' }, { status: 400 });
    }

    const db = getDb();

    // Insert registration as pending
    const [registration] = await db
      .insert(registrations)
      .values({
        name,
        email,
        phone,
        teamName: teamName || null,
        specialRequests: specialRequests || null,
        packageId: pkg.id,
        packageName: pkg.name,
        priceInCents: pkg.priceInCents,
        paymentStatus: 'pending',
      })
      .returning();

    // Create Stripe Checkout Session
    const origin = request.headers.get('origin') || 'https://lovelacememorialcup.com';

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `Lovelace Memorial Cup - ${pkg.name}`,
              description: '3rd Annual Lovelace Memorial Cup Golf Tournament — June 29, 2026',
            },
            unit_amount: pkg.priceInCents,
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

    // Store session ID on registration
    await db
      .update(registrations)
      .set({ stripeSessionId: session.id })
      .where(eq(registrations.id, registration.id));

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ error: 'Failed to process registration' }, { status: 500 });
  }
}
