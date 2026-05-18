import { NextResponse } from 'next/server';
import { desc } from 'drizzle-orm';
import { getDb } from '../../../../../db';
import { registrations } from '../../../../../db/schema';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

function csvEscape(value: unknown): string {
  if (value === null || value === undefined) return '';
  const str = String(value);
  if (/[",\n\r]/.test(str)) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

export async function GET() {
  const db = getDb();
  const rows = await db.select().from(registrations).orderBy(desc(registrations.createdAt));

  const headers = [
    'id',
    'created_at',
    'type',
    'name',
    'email',
    'phone',
    'company_name',
    'team_name',
    'package_id',
    'package_name',
    'price',
    'payment_status',
    'stripe_session_id',
    'stripe_payment_intent_id',
    'special_requests',
    'updated_at',
  ];

  const lines = [headers.join(',')];

  for (const r of rows) {
    lines.push(
      [
        r.id,
        r.createdAt instanceof Date ? r.createdAt.toISOString() : r.createdAt,
        r.type,
        r.name,
        r.email,
        r.phone,
        r.companyName ?? '',
        r.teamName ?? '',
        r.packageId,
        r.packageName,
        (r.priceInCents / 100).toFixed(2),
        r.paymentStatus,
        r.stripeSessionId ?? '',
        r.stripePaymentIntentId ?? '',
        r.specialRequests ?? '',
        r.updatedAt instanceof Date ? r.updatedAt.toISOString() : r.updatedAt,
      ]
        .map(csvEscape)
        .join(','),
    );
  }

  const csv = lines.join('\n');
  const today = new Date().toISOString().slice(0, 10);

  return new NextResponse(csv, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="lovelace-cup-signups-${today}.csv"`,
      'Cache-Control': 'no-store',
      'X-Robots-Tag': 'noindex, nofollow',
    },
  });
}
