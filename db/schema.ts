import { pgTable, serial, text, integer, timestamp } from 'drizzle-orm/pg-core';

export const registrations = pgTable('registrations', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  phone: text('phone').notNull(),
  teamName: text('team_name'),
  specialRequests: text('special_requests'),
  packageId: text('package_id').notNull(), // 'single' | 'team' | 'premium'
  packageName: text('package_name').notNull(),
  priceInCents: integer('price_in_cents').notNull(),
  paymentStatus: text('payment_status').notNull().default('pending'), // 'pending' | 'paid' | 'cancelled' | 'expired'
  stripeSessionId: text('stripe_session_id'),
  stripePaymentIntentId: text('stripe_payment_intent_id'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
