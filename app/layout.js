import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import CheckoutModal from "./components/CheckoutModal";
import { CheckoutProvider } from "./context/CheckoutContext";

export const metadata = {
  title: "Zerin Heritage - Timeless Elegance",
  description: "Discover exquisite bridal wear, heritage sarees, and modern chic fashion",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
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
