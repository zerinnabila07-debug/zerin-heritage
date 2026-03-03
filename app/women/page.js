import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function WomenPage() {
  return (
    <main className="min-h-screen bg-white pt-32 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <Link href="/">
          <button className="flex items-center gap-2 text-[#1A1A1A] hover:text-[#C5A059] transition-colors font-sans font-medium mb-8">
            <ArrowLeft size={20} />
            Back to Home
          </button>
        </Link>
        
        <div className="text-center py-20">
          <h1 className="text-4xl md:text-5xl font-serif text-[#1A1A1A] mb-4">
            Women Collection
          </h1>
          <p className="text-lg text-[#8A8A8A] font-sans mb-8">
            Discover our complete range of women's fashion
          </p>
          <p className="text-base text-[#8A8A8A] font-sans max-w-2xl mx-auto">
            This page is under construction. Please explore our featured collections on the homepage or visit our Trending section for the latest arrivals.
          </p>
          <div className="mt-8 flex gap-4 justify-center">
            <Link href="/">
              <button className="px-8 py-3 bg-[#C5A059] text-white font-sans font-medium rounded-lg hover:bg-[#B8935A] transition-all">
                Go to Homepage
              </button>
            </Link>
            <Link href="/trending">
              <button className="px-8 py-3 border-2 border-[#C5A059] text-[#C5A059] font-sans font-medium rounded-lg hover:bg-[#C5A059] hover:text-white transition-all">
                View Trending
              </button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
