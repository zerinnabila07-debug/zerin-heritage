export const metadata = {
  title: 'Trending Collection',
  description: 'Discover the most popular styles at Zerin Heritage. Shop trending sarees, kurtis, lehengas, and more. Free delivery on orders over ৳5000.',
  openGraph: {
    title: 'Trending Collection | Zerin Heritage',
    description: 'Discover the most popular styles at Zerin Heritage. Shop trending sarees, kurtis, lehengas, and more.',
    url: 'https://zerin-heritage.vercel.app/trending',
    images: [
      {
        url: 'https://zerin-heritage.vercel.app/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Zerin Heritage - Trending Collection',
      }
    ],
  },
};

export default function TrendingLayout({ children }) {
  return children;
}
