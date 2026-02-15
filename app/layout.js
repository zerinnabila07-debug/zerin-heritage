import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import CheckoutModal from "./components/CheckoutModal";
import StructuredData from "./components/StructuredData";
import { CheckoutProvider } from "./context/CheckoutContext";

export const metadata = {
  metadataBase: new URL('https://zerin-heritage.vercel.app'),
  title: {
    default: 'Zerin Heritage | Luxury South Asian Fashion & Heritage Wear',
    template: '%s | Zerin Heritage'
  },
  description: 'Explore Zerin Heritage for exclusive, high-fashion sarees, kurtis, and accessories. Experience timeless elegance with our handcrafted collections for Eid, Falgun, and special occasions.',
  keywords: ['Zerin Heritage', 'Women Fashion Bangladesh', 'Designer Saree', 'Luxury Kurti', 'Eid Collection 2026', 'Online Clothing Store', 'South Asian Fashion', 'Heritage Wear', 'Bridal Wear Bangladesh', 'Premium Sarees', 'Designer Kurtis', 'Falgun Collection', 'Valentine Collection', 'Luxury Fashion BD', 'Traditional Wear', 'Ethnic Fashion', 'Handcrafted Sarees', 'Festive Wear Bangladesh'],
  authors: [{ name: 'Zerin Heritage' }],
  creator: 'Zerin Heritage',
  publisher: 'Zerin Heritage',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://zerin-heritage.vercel.app',
    siteName: 'Zerin Heritage',
    title: 'Zerin Heritage | Luxury South Asian Fashion & Heritage Wear',
    description: 'Explore Zerin Heritage for exclusive, high-fashion sarees, kurtis, and accessories. Experience timeless elegance with our handcrafted collections for Eid, Falgun, and special occasions.',
    images: [
      {
        url: 'https://zerin-heritage.vercel.app/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Zerin Heritage - Luxury South Asian Fashion',
        type: 'image/jpeg',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zerin Heritage | Luxury South Asian Fashion & Heritage Wear',
    description: 'Explore Zerin Heritage for exclusive, high-fashion sarees, kurtis, and accessories. Experience timeless elegance with our handcrafted collections.',
    images: ['https://zerin-heritage.vercel.app/og-image.jpg'],
    creator: '@zerinheritage',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/safari-pinned-tab.svg',
        color: '#B22222',
      },
    ],
  },
  manifest: '/site.webmanifest',
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FFFFFF' },
    { media: '(prefers-color-scheme: dark)', color: '#2C2C2C' },
  ],
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
  category: 'shopping',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <StructuredData />
      </head>
      <body className="antialiased">
        <CheckoutProvider>
          <Navbar />
          {children}
          <Footer />
          <ScrollToTop />
          <CheckoutModal />
        </CheckoutProvider>
      </body>
    </html>
  );
}
