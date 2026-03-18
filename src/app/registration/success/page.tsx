import { Check } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Registration Confirmed - Lovelace Memorial Cup',
};

export default function RegistrationSuccess() {
  return (
    <main className="min-h-screen bg-ivory-100 flex items-center justify-center px-4 py-20">
      <div className="max-w-lg w-full text-center">
        <div className="card-light rounded-2xl p-10">
          <div className="w-16 h-16 bg-sage-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-8 h-8 text-sage-600" />
          </div>

          <h1 className="font-display font-bold text-3xl text-midnight-900 mb-3">
            You&apos;re In!
          </h1>
          <p className="text-midnight-700 text-lg mb-8">
            Your registration and payment have been confirmed. Check your email for a full confirmation with event details.
          </p>

          <div className="bg-sage-50 border border-sage-200 rounded-xl p-6 mb-8 text-left space-y-2">
            <h3 className="font-display font-semibold text-midnight-900 mb-3">Event Details</h3>
            <p className="text-midnight-700"><strong>Date:</strong> June 29, 2026</p>
            <p className="text-midnight-700"><strong>Registration:</strong> 7:00 AM</p>
            <p className="text-midnight-700"><strong>Shotgun Start:</strong> 8:00 AM</p>
            <p className="text-midnight-700"><strong>Location:</strong> Sycamore Ridge Golf Course</p>
          </div>

          <p className="text-midnight-600 text-sm italic mb-8">
            &quot;In a world full of hate... let&apos;s show some LOVE!&quot;
          </p>

          <Link
            href="/"
            className="inline-block bg-sage-600 text-white px-8 py-3 rounded-full font-bold hover:bg-sage-700 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
