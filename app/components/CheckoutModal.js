'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CreditCard, Building2, Wallet, CheckCircle, Loader2 } from 'lucide-react';
import { useCheckout } from '../context/CheckoutContext';
import Confetti from 'react-confetti';

const sizes = ['S', 'M', 'L', 'XL', 'XXL'];
const paymentMethods = [
  { id: 'online', name: 'Online Payment', desc: 'bKash / Nagad / Rocket', icon: CreditCard, hasLogos: true },
  { id: 'bank', name: 'Bank Transfer', desc: 'Direct bank transfer', icon: Building2, hasLogos: false },
  { id: 'cod', name: 'Cash on Delivery', desc: 'Pay when you receive', icon: Wallet, hasLogos: false }
];

const mobilePaymentLogos = [
  { name: 'bKash', logo: '/images/payment/bkash.png' },
  { name: 'Nagad', logo: '/images/payment/Nagad.png' },
  { name: 'Rocket', logo: '/images/payment/rocket.png' }
];

export default function CheckoutModal() {
  const { isCheckoutOpen, closeCheckout, selectedProduct } = useCheckout();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: '',
    size: 'M'
  });
  const [paymentMethod, setPaymentMethod] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleProceedToPayment = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handlePayment = async () => {
    if (!paymentMethod) return;
    
    if (paymentMethod === 'online') {
      setIsProcessing(true);
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsProcessing(false);
    }
    
    setStep(3);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 5000);
  };

  const handleClose = () => {
    closeCheckout();
    setTimeout(() => {
      setStep(1);
      setFormData({ fullName: '', phone: '', address: '', size: 'M' });
      setPaymentMethod('');
      setShowConfetti(false);
    }, 300);
  };

  if (!isCheckoutOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
        onClick={handleClose}
      >
        {showConfetti && <Confetti recycle={false} numberOfPieces={500} />}
        
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: 'spring', damping: 25 }}
          className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="sticky top-0 bg-gradient-to-r from-[#C5A059] to-[#B8935A] text-white px-6 py-4 flex items-center justify-between z-10">
            <h2 className="text-2xl font-serif">
              {step === 1 && 'Order Details'}
              {step === 2 && 'Payment Method'}
              {step === 3 && 'Order Confirmed'}
            </h2>
            <button onClick={handleClose} className="hover:scale-110 transition-transform">
              <X size={24} />
            </button>
          </div>

          <div className="p-6 md:p-8">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -20, opacity: 0 }}
                >
                  <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <h3 className="text-lg font-semibold text-[#2C2C2C] mb-3">Product Summary</h3>
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-20 bg-gradient-to-br from-[#FFF0F5] to-[#FFE4E1] rounded-lg flex items-center justify-center">
                        <span className="text-2xl">👗</span>
                      </div>
                      <div>
                        <p className="font-medium text-[#2C2C2C]">{selectedProduct?.title || 'Selected Item'}</p>
                        <p className="text-sm text-gray-600">Premium Collection</p>
                      </div>
                    </div>
                  </div>

                  <form onSubmit={handleProceedToPayment} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-[#2C2C2C] mb-2">Full Name *</label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-[#C5A059] focus:ring-2 focus:ring-[#C5A059]/20 outline-none transition-all"
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#2C2C2C] mb-2">Phone Number *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-[#C5A059] focus:ring-2 focus:ring-[#C5A059]/20 outline-none transition-all"
                        placeholder="+880 1XXX-XXXXXX"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#2C2C2C] mb-2">Delivery Address *</label>
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                        rows="3"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-[#C5A059] focus:ring-2 focus:ring-[#C5A059]/20 outline-none transition-all resize-none"
                        placeholder="House, Road, Area, City"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#2C2C2C] mb-2">Select Size *</label>
                      <select
                        name="size"
                        value={formData.size}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-[#C5A059] focus:ring-2 focus:ring-[#C5A059]/20 outline-none transition-all"
                      >
                        {sizes.map(size => (
                          <option key={size} value={size}>{size}</option>
                        ))}
                      </select>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 bg-gradient-to-r from-[#C5A059] to-[#B8935A] text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
                    >
                      Proceed to Payment
                    </button>
                  </form>
                </motion.div>
              )}

              {step === 2 && !isProcessing && (
                <motion.div
                  key="step2"
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -20, opacity: 0 }}
                >
                  <p className="text-gray-600 mb-6">Choose your preferred payment method</p>
                  
                  <div className="space-y-4 mb-6">
                    {paymentMethods.map((method) => {
                      const Icon = method.icon;
                      return (
                        <button
                          key={method.id}
                          onClick={() => setPaymentMethod(method.id)}
                          className={`w-full p-4 border-2 rounded-lg transition-all duration-300 ${
                            paymentMethod === method.id
                              ? 'border-[#C5A059] bg-[#C5A059]/5 shadow-md'
                              : 'border-gray-200 hover:border-[#C5A059]/50'
                          }`}
                        >
                          <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                              paymentMethod === method.id ? 'bg-[#C5A059] text-white' : 'bg-gray-100 text-gray-600'
                            }`}>
                              <Icon size={24} />
                            </div>
                            <div className="text-left flex-1">
                              <p className="font-semibold text-[#2C2C2C]">{method.name}</p>
                              <p className="text-sm text-gray-600">{method.desc}</p>
                            </div>
                          </div>
                          
                          {/* Show payment logos for online payment */}
                          {method.hasLogos && (
                            <div className="flex items-center gap-3 mt-3 pt-3 border-t border-gray-200">
                              {mobilePaymentLogos.map((payment) => (
                                <div 
                                  key={payment.name}
                                  className="relative h-8 w-16 bg-white rounded border border-gray-200 overflow-hidden hover:border-[#C5A059] transition-colors"
                                >
                                  <Image
                                    src={payment.logo}
                                    alt={payment.name}
                                    fill
                                    className="object-contain p-1"
                                    sizes="64px"
                                  />
                                </div>
                              ))}
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={() => setStep(1)}
                      className="flex-1 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-all"
                    >
                      Back
                    </button>
                    <button
                      onClick={handlePayment}
                      disabled={!paymentMethod}
                      className="flex-1 py-3 bg-gradient-to-r from-[#C5A059] to-[#B8935A] text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Confirm Order
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 2 && isProcessing && (
                <motion.div
                  key="processing"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="py-12 text-center"
                >
                  <Loader2 className="w-16 h-16 text-[#C5A059] animate-spin mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-[#2C2C2C] mb-2">Verifying Transaction</h3>
                  <p className="text-gray-600">Please wait while we process your payment...</p>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="py-8 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                  >
                    <CheckCircle className="w-24 h-24 text-green-500 mx-auto mb-6" />
                  </motion.div>
                  
                  <h3 className="text-3xl font-serif text-[#2C2C2C] mb-4">Order Confirmed!</h3>
                  <p className="text-lg text-gray-600 mb-6">
                    Thank you for shopping with Zerin Heritage
                  </p>
                  
                  <div className="bg-gradient-to-br from-[#FFF0F5] to-[#FFE4E1] p-6 rounded-lg mb-6">
                    <p className="text-sm text-gray-600 mb-2">Order Details</p>
                    <p className="font-semibold text-[#2C2C2C]">{formData.fullName}</p>
                    <p className="text-sm text-gray-600">{formData.phone}</p>
                    <p className="text-sm text-gray-600 mt-2">Size: {formData.size}</p>
                  </div>

                  <p className="text-sm text-gray-600 mb-6">
                    We'll contact you shortly to confirm your order and delivery details.
                  </p>

                  <button
                    onClick={handleClose}
                    className="px-8 py-3 bg-gradient-to-r from-[#C5A059] to-[#B8935A] text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300"
                  >
                    Continue Shopping
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
