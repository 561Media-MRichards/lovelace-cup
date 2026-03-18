import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getDb } from '../../../../../db';
import { registrations } from '../../../../../db/schema';
import { eq } from 'drizzle-orm';
import { sendConfirmationEmail, sendNotificationEmail } from '../../../../lib/emails';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-02-25.clover',
});

export async function POST(request: Request) {
  const body = await request.text();
  const sig = request.headers.get('stripe-signature')!;

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  const db = getDb();

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const registrationId = Number(session.metadata?.registrationId);

    if (!registrationId) {
      console.error('No registrationId in session metadata');
      return NextResponse.json({ received: true });
    }

    // Idempotent: check if already paid
    const [existing] = await db
      .select()
      .from(registrations)
      .where(eq(registrations.id, registrationId));

    if (!existing) {
      console.error('Registration not found:', registrationId);
      return NextResponse.json({ received: true });
    }

    if (existing.paymentStatus === 'paid') {
      return NextResponse.json({ received: true });
    }

    await db
      .update(registrations)
      .set({
        paymentStatus: 'paid',
        stripePaymentIntentId: session.payment_intent as string,
        updatedAt: new Date(),
      })
      .where(eq(registrations.id, registrationId));

    // Send emails after successful payment
    const [updated] = await db
      .select()
      .from(registrations)
      .where(eq(registrations.id, registrationId));

    try {
      await sendConfirmationEmail(updated);
      await sendNotificationEmail(updated);
    } catch (emailErr) {
      console.error('Failed to send emails:', emailErr);
      // Don't fail the webhook — payment is already recorded
    }
  }

  if (event.type === 'checkout.session.expired') {
    const session = event.data.object as Stripe.Checkout.Session;
    const registrationId = Number(session.metadata?.registrationId);

    if (registrationId) {
      await db
        .update(registrations)
        .set({ paymentStatus: 'expired', updatedAt: new Date() })
        .where(eq(registrations.id, registrationId));
    }
  }

  return NextResponse.json({ received: true });
}
