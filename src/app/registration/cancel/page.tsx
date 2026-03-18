import { X } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Payment Cancelled - Lovelace Memorial Cup',
};

export default function RegistrationCancel() {
  return (
    <main className="min-h-screen bg-ivory-100 flex items-center justify-center px-4 py-20">
      <div className="max-w-lg w-full text-center">
        <div className="card-light rounded-2xl p-10">
          <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <X className="w-8 h-8 text-amber-600" />
          </div>

          <h1 className="font-display font-bold text-3xl text-midnight-900 mb-3">
            Payment Cancelled
          </h1>
          <p className="text-midnight-700 text-lg mb-8">
            No worries — your payment was not processed. You can try again anytime.
          </p>

          <Link
            href="/#registration"
            className="inline-block bg-sage-600 text-white px-8 py-3 rounded-full font-bold hover:bg-sage-700 transition-colors"
          >
            Try Again
          </Link>

          <p className="text-midnight-600 text-sm mt-6">
            Having trouble? Contact us at{' '}
            <a href="mailto:wolfersway@gmail.com" className="text-sage-600 underline underline-offset-2">
              wolfersway@gmail.com
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
