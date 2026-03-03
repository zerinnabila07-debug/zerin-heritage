'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, LayoutDashboard, RefreshCw } from 'lucide-react';

export default function AdminError({ error, reset }) {
  useEffect(() => {
    console.error('Admin Error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center bg-white rounded-2xl shadow-xl p-8">
        <div className="mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-[#C5A059] to-[#B8935A] rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertTriangle size={40} className="text-white" />
          </div>
          <h1 className="text-3xl font-serif text-[#1A1A1A] mb-4">Dashboard Error</h1>
          <p className="text-[#8A8A8A] font-sans mb-6">
            An error occurred in the admin dashboard. Please try refreshing the page.
          </p>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => reset()}
            className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-[#C5A059] text-white rounded-lg hover:bg-[#B8935A] transition-all duration-300 font-sans font-medium"
          >
            <RefreshCw size={20} />
            Retry
          </button>

          <Link
            href="/admin/overview"
            className="w-full flex items-center justify-center gap-3 px-6 py-3 border-2 border-[#C5A059] text-[#C5A059] rounded-lg hover:bg-[#C5A059] hover:text-white transition-all duration-300 font-sans font-medium"
          >
            <LayoutDashboard size={20} />
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
