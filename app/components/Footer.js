'use client';

import { Facebook, Instagram, Youtube, Mail, Phone, MapPin, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <h3 className="text-2xl font-serif text-[#2C2C2C] mb-4">
              Zerin Heritage
            </h3>
            <p className="text-sm text-gray-600 mb-6 leading-relaxed">
              Zerin Heritage brings you timeless elegance and contemporary fashion. 
              We celebrate the beauty of traditional craftsmanship blended with modern design.
            </p>
            <div className="space-y-3 mb-6">
              <a href="tel:+8801234567890" className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#E0115F] transition-colors">
                <Phone size={16} />
                <span>+880 1234-567890</span>
              </a>
              <a href="mailto:info@zerinheritage.com" className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#E0115F] transition-colors">
                <Mail size={16} />
                <span>info@zerinheritage.com</span>
              </a>
              <div className="flex items-start gap-2 text-sm text-gray-600">
                <MapPin size={16} className="mt-0.5 flex-shrink-0" />
                <span>Banani, Dhaka 1213, Bangladesh</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-[#E0115F] hover:text-white hover:border-[#E0115F] transition-all duration-300"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-[#E0115F] hover:text-white hover:border-[#E0115F] transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-[#E0115F] hover:text-white hover:border-[#E0115F] transition-all duration-300"
                aria-label="YouTube"
              >
                <Youtube size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-serif text-[#2C2C2C] mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {['Home', 'All Collections', 'Size Guide', 'Store Locator'].map((link) => (
                <li key={link}>
                  <a 
                    href="#" 
                    className="text-sm text-gray-600 hover:text-[#E0115F] hover:translate-x-1 transition-all duration-200 inline-block"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-serif text-[#2C2C2C] mb-6">
              Policies
            </h4>
            <ul className="space-y-3">
              {['Shipping Policy', 'Return & Exchange', 'Terms & Conditions', 'Privacy Policy'].map((link) => (
                <li key={link}>
                  <a 
                    href="#" 
                    className="text-sm text-gray-600 hover:text-[#E0115F] hover:translate-x-1 transition-all duration-200 inline-block"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-serif text-[#2C2C2C] mb-4">
              Newsletter
            </h4>
            
            <AnimatePresence mode="wait">
              {!isSubscribed ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-sm text-gray-600 mb-4">
                    Join the Zerin Heritage family
                  </p>
                  <form onSubmit={handleSubscribe} className="space-y-3">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      required
                      className="w-full px-4 py-3 border border-gray-300 focus:border-[#E0115F] focus:outline-none focus:ring-2 focus:ring-[#E0115F]/20 transition-all text-sm"
                    />
                    <button
                      type="submit"
                      className="w-full px-6 py-3 bg-[#E0115F] text-white font-sans font-medium text-sm hover:bg-[#C00F54] transition-colors duration-300"
                    >
                      Subscribe
                    </button>
                  </form>
                  <p className="text-xs text-gray-500 mt-3">
                    Get exclusive offers and updates delivered to your inbox
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="bg-gradient-to-br from-[#FFF0F5] to-[#FFE4E1] p-6 rounded-lg border border-[#E0115F]/20"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <CheckCircle className="text-[#E0115F] flex-shrink-0 mt-0.5" size={24} strokeWidth={2} />
                    <h5 className="text-lg font-serif text-[#E0115F]">
                      Subscription Confirmed!
                    </h5>
                  </div>
                  <p className="text-sm text-[#2C2C2C] leading-relaxed">
                    Thank you for joining the Zerin Heritage family! We are excited to have you with us. Look out for exclusive offers and updates in your inbox.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-600 text-center md:text-left">
              © {new Date().getFullYear()} Zerin Heritage. All rights reserved.
            </p>
            
            <div className="flex items-center gap-4">
              <span className="text-xs text-gray-500 font-medium">Secured by</span>
              <div className="flex items-center gap-3">
                <div className="px-3 py-1.5 bg-gray-100 border border-gray-200 rounded">
                  <span className="text-xs font-semibold text-gray-700">SSL Commerz</span>
                </div>
                <div className="px-3 py-1.5 bg-gray-100 border border-gray-200 rounded">
                  <span className="text-xs font-semibold text-gray-700">VISA</span>
                </div>
                <div className="px-3 py-1.5 bg-gray-100 border border-gray-200 rounded">
                  <span className="text-xs font-semibold text-gray-700">Mastercard</span>
                </div>
                <div className="px-3 py-1.5 bg-gray-100 border border-gray-200 rounded">
                  <span className="text-xs font-semibold text-gray-700">bKash</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
