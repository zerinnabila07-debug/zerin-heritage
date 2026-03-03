export default function Loading() {
  return (
    <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
      <div className="text-center">
        <div className="relative w-20 h-20 mx-auto mb-6">
          <div className="absolute inset-0 border-4 border-[#F5F5F5] rounded-full"></div>
          <div className="absolute inset-0 border-4 border-[#C5A059] rounded-full border-t-transparent animate-spin"></div>
        </div>
        
        <h2 className="text-2xl font-serif text-[#1A1A1A] mb-2">Zerin Heritage</h2>
        <p className="text-sm font-sans text-[#8A8A8A]">Loading your experience...</p>
      </div>
    </div>
  );
}
