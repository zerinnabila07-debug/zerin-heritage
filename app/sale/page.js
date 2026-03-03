import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function SalePage() {
  return (
    <main className="min-h-screen bg-white pt-32 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <Link href="/">
          <button className="flex items-center gap-2 text-[#1A1A1A] hover:text-[#D10056] transition-colors font-sans font-medium mb-8">
            <ArrowLeft size={20} />
            Back to Home
          </button>
        </Link>
        
        <div className="text-center py-20">
          <div className="inline-block px-4 py-2 bg-[#D10056] text-white rounded-full mb-6">
            <span className="text-sm font-sans font-semibold uppercase tracking-wider">
              Special Offers
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif text-[#1A1A1A] mb-4">
            Sale Collection
          </h1>
          <p className="text-lg text-[#8A8A8A] font-sans mb-8">
            Amazing deals on designer wear
          </p>
          <p className="text-base text-[#8A8A8A] font-sans max-w-2xl mx-auto mb-8">
            Looking for the best deals? Check out our Clearance Craze section with up to 60% off on selected items!
          </p>
          <div className="mt-8 flex gap-4 justify-center">
            <Link href="/clearance">
              <button className="px-8 py-3 bg-[#D10056] text-white font-sans font-medium rounded-lg hover:bg-[#B8004A] transition-all">
                View Clearance Sale
              </button>
            </Link>
            <Link href="/">
              <button className="px-8 py-3 border-2 border-[#D10056] text-[#D10056] font-sans font-medium rounded-lg hover:bg-[#D10056] hover:text-white transition-all">
                Go to Homepage
              </button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
