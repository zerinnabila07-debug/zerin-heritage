export default function LoginPage() {
  return (
    <div className="min-h-screen pt-[110px] px-6 py-16 bg-gradient-to-b from-white to-[#FFF0F5]">
      <div className="max-w-md mx-auto">
        <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200">
          <h1 className="text-3xl font-serif text-[#2C2C2C] mb-6 text-center">
            Welcome Back
          </h1>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#2C2C2C] mb-2">
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 border border-gray-300 focus:border-[#B22222] focus:outline-none focus:ring-2 focus:ring-[#B22222]/20 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#2C2C2C] mb-2">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full px-4 py-3 border border-gray-300 focus:border-[#B22222] focus:outline-none focus:ring-2 focus:ring-[#B22222]/20 transition-all"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-[#B22222] text-white font-medium hover:bg-[#A01F1F] transition-colors"
            >
              Sign In
            </button>
          </form>
          <p className="text-center text-sm text-gray-600 mt-6">
            Don't have an account?{' '}
            <a href="#" className="text-[#B22222] hover:underline">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
