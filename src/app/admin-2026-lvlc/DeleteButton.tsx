'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';

export function DeleteButton({ id, name }: { id: number; name: string }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  async function onClick() {
    if (!confirm(`Delete signup for ${name}? This cannot be undone.`)) return;
    setError(null);
    try {
      const res = await fetch(`/api/admin-2026-lvlc/${id}`, { method: 'DELETE' });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `Failed (${res.status})`);
      }
      startTransition(() => router.refresh());
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to delete');
    }
  }

  return (
    <div className="flex flex-col items-end gap-1">
      <button
        type="button"
        onClick={onClick}
        disabled={isPending}
        className="text-xs font-semibold text-rose-500 hover:text-rose-600 disabled:opacity-50"
      >
        {isPending ? 'Deleting…' : 'Delete'}
      </button>
      {error && <span className="text-xs text-rose-500">{error}</span>}
    </div>
  );
}
