export default function WishlistPage() {
  return (
    <div className="min-h-screen pt-[110px] px-6 py-16 bg-white">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-serif text-[#2C2C2C] mb-8">
          My Wishlist
        </h1>
        <div className="bg-[#FFF0F5] p-12 rounded-lg text-center">
          <svg
            className="w-24 h-24 mx-auto mb-6 text-gray-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
          <h2 className="text-2xl font-serif text-[#2C2C2C] mb-4">
            Your Wishlist is Empty
          </h2>
          <p className="text-gray-600 mb-6">
            Save your favorite items here to easily find them later
          </p>
          <a
            href="/"
            className="inline-block px-8 py-3 bg-[#B22222] text-white font-medium hover:bg-[#A01F1F] transition-colors"
          >
            Continue Shopping
          </a>
        </div>
      </div>
    </div>
  );
}
