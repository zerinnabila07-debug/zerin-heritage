'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, Home, RefreshCw } from 'lucide-react';

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error('Error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF9F5] to-white flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-[#C5A059] to-[#B8935A] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <AlertTriangle size={40} className="text-white" />
          </div>
          <h1 className="text-4xl font-serif text-[#1A1A1A] mb-4">Oops! Something went wrong</h1>
          <p className="text-[#8A8A8A] font-sans mb-8">
            We encountered an unexpected error. Don't worry, we're here to help you get back on track.
          </p>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => reset()}
            className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-[#C5A059] text-white rounded-lg hover:bg-[#B8935A] transition-all duration-300 font-sans font-medium shadow-lg hover:shadow-xl"
          >
            <RefreshCw size={20} />
            Try Again
          </button>

          <Link
            href="/"
            className="w-full flex items-center justify-center gap-3 px-6 py-3 border-2 border-[#C5A059] text-[#C5A059] rounded-lg hover:bg-[#C5A059] hover:text-white transition-all duration-300 font-sans font-medium"
          >
            <Home size={20} />
            Back to Home
          </Link>
        </div>

        <p className="mt-8 text-xs text-[#8A8A8A] font-sans">
          If the problem persists, please contact our support team.
        </p>
      </div>
    </div>
  );
}
