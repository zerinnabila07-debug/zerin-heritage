export default function CartPage() {
  return (
    <div className="min-h-screen pt-[110px] px-6 py-16 bg-white">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-serif text-[#2C2C2C] mb-8">
          Shopping Bag
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
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            />
          </svg>
          <h2 className="text-2xl font-serif text-[#2C2C2C] mb-4">
            Your Cart is Empty
          </h2>
          <p className="text-gray-600 mb-6">
            Add items to your cart to start shopping
          </p>
          <a
            href="/"
            className="inline-block px-8 py-3 bg-[#B22222] text-white font-medium hover:bg-[#A01F1F] transition-colors"
          >
            Start Shopping
          </a>
        </div>
      </div>
    </div>
  );
}
