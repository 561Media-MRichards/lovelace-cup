import type { Metadata } from 'next';
import { desc } from 'drizzle-orm';
import { getDb } from '../../../db';
import { registrations } from '../../../db/schema';
import { DeleteButton } from './DeleteButton';

export const metadata: Metadata = {
  title: 'Signups — Lovelace Memorial Cup',
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

function formatCurrency(cents: number) {
  return `$${(cents / 100).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function formatDate(d: Date) {
  return new Date(d).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

function statusBadge(status: string) {
  const map: Record<string, string> = {
    paid: 'bg-sage-600 text-white',
    pending: 'bg-amber-400 text-midnight-900',
    pay_at_course: 'bg-amber-300 text-midnight-900',
    cancelled: 'bg-rose-500 text-white',
    expired: 'bg-midnight-700 text-white',
  };
  return map[status] ?? 'bg-midnight-700 text-white';
}

export default async function AdminPage() {
  const db = getDb();
  const rows = await db.select().from(registrations).orderBy(desc(registrations.createdAt));

  const totals = {
    all: rows.length,
    registrations: rows.filter((r) => r.type === 'registration').length,
    sponsorships: rows.filter((r) => r.type === 'sponsorship').length,
    paid: rows.filter((r) => r.paymentStatus === 'paid').length,
    pending: rows.filter((r) => r.paymentStatus === 'pending').length,
    payAtCourse: rows.filter((r) => r.paymentStatus === 'pay_at_course').length,
    grossPaidCents: rows
      .filter((r) => r.paymentStatus === 'paid')
      .reduce((sum, r) => sum + r.priceInCents, 0),
    grossPendingCents: rows
      .filter((r) => r.paymentStatus === 'pending' || r.paymentStatus === 'pay_at_course')
      .reduce((sum, r) => sum + r.priceInCents, 0),
  };

  return (
    <div className="min-h-screen bg-ivory-100 text-midnight-900">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <header className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display text-3xl font-bold">Signups</h1>
            <p className="text-sm text-midnight-700 mt-1">
              Lovelace Memorial Cup — internal admin
            </p>
          </div>
          <div className="flex gap-2">
            <a
              href="/api/admin-2026-lvlc/export"
              className="inline-flex items-center gap-2 bg-midnight-900 text-ivory-100 px-4 py-2 rounded-lg text-sm font-medium hover:bg-midnight-800 transition"
            >
              Export CSV
            </a>
          </div>
        </header>

        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Stat label="Total signups" value={totals.all.toString()} />
          <Stat label="Registrations" value={totals.registrations.toString()} />
          <Stat label="Sponsorships" value={totals.sponsorships.toString()} />
          <Stat label="Paid" value={totals.paid.toString()} />
          <Stat label="Pending" value={totals.pending.toString()} />
          <Stat label="Pay at course" value={totals.payAtCourse.toString()} />
          <Stat label="Gross (paid)" value={formatCurrency(totals.grossPaidCents)} />
          <Stat label="Gross (open)" value={formatCurrency(totals.grossPendingCents)} />
        </section>

        <div className="bg-white rounded-xl border border-ivory-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-ivory-200 text-midnight-700">
                <tr>
                  <Th>Created</Th>
                  <Th>Type</Th>
                  <Th>Name</Th>
                  <Th>Email</Th>
                  <Th>Phone</Th>
                  <Th>Company / Team</Th>
                  <Th>Package</Th>
                  <Th>Price</Th>
                  <Th>Status</Th>
                  <Th>Notes</Th>
                  <th className="text-left font-semibold px-4 py-3 whitespace-nowrap sticky right-0 bg-ivory-200 shadow-[-4px_0_4px_-2px_rgba(0,0,0,0.05)]">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.length === 0 && (
                  <tr>
                    <td colSpan={11} className="text-center py-10 text-midnight-700">
                      No signups yet.
                    </td>
                  </tr>
                )}
                {rows.map((r) => (
                  <tr key={r.id} className="border-t border-ivory-200 align-top">
                    <Td className="whitespace-nowrap text-midnight-700">{formatDate(r.createdAt)}</Td>
                    <Td className="capitalize">{r.type}</Td>
                    <Td className="font-medium">{r.name}</Td>
                    <Td>
                      <a href={`mailto:${r.email}`} className="text-sage-700 hover:underline">
                        {r.email}
                      </a>
                    </Td>
                    <Td>
                      <a href={`tel:${r.phone}`} className="text-sage-700 hover:underline whitespace-nowrap">
                        {r.phone}
                      </a>
                    </Td>
                    <Td>{r.companyName || r.teamName || '—'}</Td>
                    <Td>{r.packageName}</Td>
                    <Td className="whitespace-nowrap">{formatCurrency(r.priceInCents)}</Td>
                    <Td>
                      <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-semibold ${statusBadge(r.paymentStatus)}`}>
                        {r.paymentStatus.replace(/_/g, ' ')}
                      </span>
                    </Td>
                    <Td className="max-w-xs whitespace-pre-wrap text-midnight-700">
                      {r.specialRequests || '—'}
                    </Td>
                    <td className="px-4 py-3 sticky right-0 bg-white shadow-[-4px_0_4px_-2px_rgba(0,0,0,0.05)]">
                      <DeleteButton id={r.id} name={r.name} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white rounded-xl border border-ivory-200 p-4">
      <div className="text-xs uppercase tracking-wide text-midnight-700">{label}</div>
      <div className="font-display text-2xl font-bold mt-1">{value}</div>
    </div>
  );
}

function Th({ children }: { children?: React.ReactNode }) {
  return <th className="text-left font-semibold px-4 py-3 whitespace-nowrap">{children}</th>;
}

function Td({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <td className={`px-4 py-3 ${className}`}>{children}</td>;
}
