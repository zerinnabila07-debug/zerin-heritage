import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import CheckoutModal from "./components/CheckoutModal";
import Chatbot from "./components/Chatbot";
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
    icon: '/logo.png',
  },
  manifest: '/site.webmanifest',
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
  category: 'shopping',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FFFFFF' },
    { media: '(prefers-color-scheme: dark)', color: '#2C2C2C' },
  ],
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
          <Chatbot />
        </CheckoutProvider>
      </body>
    </html>
  );
}
