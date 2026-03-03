'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import AdminHeader from '../components/AdminHeader';
import { Mail, Phone, MapPin, ShoppingBag, X, User, Calendar, DollarSign, MessageCircle, ArrowLeft } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import Link from 'next/link';

const customers = [
  {
    id: 1,
    name: 'Ayesha Rahman',
    email: 'ayesha.rahman@email.com',
    phone: '+880 1712-345678',
    location: 'Dhaka',
    orders: 12,
    totalSpent: 145000,
    joinedDate: '2025-08-15',
  },
  {
    id: 2,
    name: 'Fatima Khan',
    email: 'fatima.khan@email.com',
    phone: '+880 1823-456789',
    location: 'Chittagong',
    orders: 8,
    totalSpent: 89000,
    joinedDate: '2025-09-22',
  },
  {
    id: 3,
    name: 'Nusrat Jahan',
    email: 'nusrat.jahan@email.com',
    phone: '+880 1934-567890',
    location: 'Sylhet',
    orders: 15,
    totalSpent: 198000,
    joinedDate: '2025-07-10',
  },
  {
    id: 4,
    name: 'Sadia Akter',
    email: 'sadia.akter@email.com',
    phone: '+880 1645-678901',
    location: 'Dhaka',
    orders: 5,
    totalSpent: 56000,
    joinedDate: '2025-11-05',
  },
  {
    id: 5,
    name: 'Tasneem Ahmed',
    email: 'tasneem.ahmed@email.com',
    phone: '+880 1756-789012',
    location: 'Rajshahi',
    orders: 9,
    totalSpent: 112000,
    joinedDate: '2025-10-18',
  },
];

export default function CustomersPage() {
  const router = useRouter();
  const { customers } = useAdmin();
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const customerListRef = useRef(null);

  const handleWhatsAppClick = (customer) => {
    const message = `Hello ${customer.name}, this is from Zerin Heritage. We wanted to reach out regarding your recent orders with us.`;
    const whatsappUrl = `https://wa.me/${customer.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const scrollToCustomerList = () => {
    customerListRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <main className="min-h-screen">
      <AdminHeader 
        title="Customers" 
        subtitle="Manage your customer database"
        onSearch={setSearchTerm}
        searchValue={searchTerm}
      />

        <div className="p-8">
          <Link 
            href="/admin/overview"
            className="inline-flex items-center gap-2 text-sm font-sans text-[#C5A059] hover:text-[#B8935A] transition-colors mb-6"
          >
            <ArrowLeft size={16} />
            Back to Dashboard
          </Link>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div 
              onClick={scrollToCustomerList}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 hover:border-[#C5A059]"
            >
              <div className="bg-gradient-to-br from-[#C5A059] to-[#B8935A] w-12 h-12 rounded-lg flex items-center justify-center text-white mb-4">
                <Mail size={24} />
              </div>
              <p className="text-sm font-sans text-[#8A8A8A] mb-1">Total Customers</p>
              <p className="text-2xl font-serif font-semibold text-[#1A1A1A]">{customers.length}</p>
            </div>

            <div 
              onClick={() => router.push('/admin/orders')}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 hover:border-[#C5A059]"
            >
              <div className="bg-gradient-to-br from-[#D10056] to-[#B8004A] w-12 h-12 rounded-lg flex items-center justify-center text-white mb-4">
                <ShoppingBag size={24} />
              </div>
              <p className="text-sm font-sans text-[#8A8A8A] mb-1">Total Orders</p>
              <p className="text-2xl font-serif font-semibold text-[#1A1A1A]">
                {customers.reduce((sum, c) => sum + c.orders, 0)}
              </p>
            </div>

            <div 
              onClick={() => router.push('/admin/overview')}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 hover:border-[#C5A059]"
            >
              <div className="bg-gradient-to-br from-[#4CAF50] to-[#388E3C] w-12 h-12 rounded-lg flex items-center justify-center text-white mb-4">
                <span className="text-xl font-serif">৳</span>
              </div>
              <p className="text-sm font-sans text-[#8A8A8A] mb-1">Total Revenue</p>
              <p className="text-2xl font-serif font-semibold text-[#1A1A1A]">
                ৳ {customers.reduce((sum, c) => sum + c.totalSpent, 0).toLocaleString()}
              </p>
            </div>
          </div>

          <div ref={customerListRef} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 scroll-mt-8">
            <h3 className="text-lg font-serif font-semibold text-[#1A1A1A] mb-6">Customer List</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {customers.map((customer) => (
                <div
                  key={customer.id}
                  className="border border-gray-200 rounded-xl p-6 hover:border-[#C5A059] hover:shadow-md transition-all cursor-pointer"
                  onClick={() => setSelectedCustomer(customer)}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#C5A059] to-[#B8935A] rounded-full flex items-center justify-center text-white font-serif text-lg">
                      {customer.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-sans font-semibold text-[#1A1A1A]">{customer.name}</h4>
                      <p className="text-xs font-sans text-[#8A8A8A]">Member since {customer.joinedDate}</p>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm font-sans text-[#8A8A8A]">
                      <Mail size={14} />
                      <span className="truncate">{customer.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm font-sans text-[#8A8A8A]">
                      <Phone size={14} />
                      <span>{customer.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm font-sans text-[#8A8A8A]">
                      <MapPin size={14} />
                      <span>{customer.location}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div>
                      <p className="text-xs font-sans text-[#8A8A8A]">Orders</p>
                      <p className="text-lg font-serif font-semibold text-[#1A1A1A]">{customer.orders}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-sans text-[#8A8A8A]">Total Spent</p>
                      <p className="text-lg font-serif font-semibold text-[#C5A059]">৳ {customer.totalSpent.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      {selectedCustomer && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-[90%] max-w-5xl">
            <div className="flex items-center justify-between px-10 py-6 border-b border-gray-200 bg-gradient-to-r from-[#C5A059]/5 to-white">
              <div>
                <h2 className="text-3xl font-serif text-[#1A1A1A] mb-1">Customer Profile</h2>
                <p className="text-sm font-sans text-[#8A8A8A]">Complete customer information and order history</p>
              </div>
              <button 
                onClick={() => setSelectedCustomer(null)}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                title="Close"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="px-10 py-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                <div className="space-y-6">
                  <div className="flex items-center gap-4 pb-6 border-b border-gray-200">
                    <div className="w-20 h-20 bg-gradient-to-br from-[#C5A059] to-[#B8935A] rounded-full flex items-center justify-center text-white font-serif text-3xl flex-shrink-0 shadow-lg">
                      {selectedCustomer.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-2xl font-serif font-semibold text-[#1A1A1A] mb-1">{selectedCustomer.name}</h3>
                      <p className="text-sm font-sans text-[#8A8A8A] flex items-center gap-1">
                        <Calendar size={14} />
                        Member since {selectedCustomer.joinedDate}
                      </p>
                    </div>
                  </div>

                  <div className="pb-4 border-b border-gray-200">
                    <span className="font-sans text-xs text-[#8A8A8A] uppercase tracking-wide mb-2 block">Email Address</span>
                    <span className="font-sans text-lg font-medium text-[#1A1A1A] break-words">{selectedCustomer.email}</span>
                  </div>

                  <div className="pb-4 border-b border-gray-200">
                    <span className="font-sans text-xs text-[#8A8A8A] uppercase tracking-wide mb-2 block">Phone Number</span>
                    <button
                      onClick={() => handleWhatsAppClick(selectedCustomer)}
                      className="flex items-center gap-2 text-base font-sans text-[#25D366] hover:text-[#128C7E] transition-colors group"
                      title="Contact via WhatsApp"
                    >
                      <MessageCircle size={18} className="text-[#C5A059] group-hover:text-[#B8935A]" />
                      <span className="group-hover:underline">{selectedCustomer.phone}</span>
                    </button>
                  </div>

                  <div className="pb-4 border-b border-gray-200">
                    <span className="font-sans text-xs text-[#8A8A8A] uppercase tracking-wide mb-2 block">Location</span>
                    <span className="font-sans text-lg font-medium text-[#1A1A1A]">{selectedCustomer.location}</span>
                  </div>

                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border-2 border-blue-200">
                    <div className="flex items-center gap-3 mb-3">
                      <Calendar size={22} className="text-blue-600" />
                      <span className="text-xs font-sans text-[#8A8A8A] uppercase tracking-wide">Average Order</span>
                    </div>
                    <p className="text-4xl font-serif font-bold text-blue-600">
                      ৳ {Math.round(selectedCustomer.totalSpent / selectedCustomer.orders).toLocaleString()}
                    </p>
                    <p className="text-sm font-sans text-[#8A8A8A] mt-2">Per transaction</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-[#C5A059]/10 to-[#B8935A]/10 rounded-xl p-6 border-2 border-[#C5A059]/20">
                    <div className="flex items-center gap-3 mb-3">
                      <ShoppingBag size={22} className="text-[#C5A059]" />
                      <span className="text-xs font-sans text-[#8A8A8A] uppercase tracking-wide">Total Orders</span>
                    </div>
                    <p className="text-4xl font-serif font-bold text-[#1A1A1A]">
                      {selectedCustomer.orders}
                    </p>
                    <p className="text-sm font-sans text-[#8A8A8A] mt-2">Lifetime purchases</p>
                  </div>

                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200">
                    <div className="flex items-center gap-3 mb-3">
                      <DollarSign size={22} className="text-green-600" />
                      <span className="text-xs font-sans text-[#8A8A8A] uppercase tracking-wide">Total Spent</span>
                    </div>
                    <p className="text-4xl font-serif font-bold text-green-600">
                      ৳ {selectedCustomer.totalSpent.toLocaleString()}
                    </p>
                    <p className="text-sm font-sans text-[#8A8A8A] mt-2">Customer lifetime value</p>
                  </div>

                  <div className="border-t border-gray-200 pt-6">
                    <h4 className="text-lg font-serif font-semibold text-[#1A1A1A] mb-4">Recent Orders</h4>
                    <div className="space-y-3">
                      {[
                        { id: 'ORD-2456', product: 'Premium Silk Saree', amount: 12999, date: '2026-03-03', status: 'Delivered' },
                        { id: 'ORD-2398', product: 'Designer Embroidery Kurti', amount: 5999, date: '2026-02-15', status: 'Delivered' },
                        { id: 'ORD-2301', product: 'Luxury Festive Lehenga', amount: 18999, date: '2026-01-28', status: 'Delivered' },
                      ].map((order, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                          <div className="flex-1">
                            <p className="font-sans text-sm font-medium text-[#1A1A1A] mb-1">{order.product}</p>
                            <p className="font-sans text-xs text-[#8A8A8A]">{order.id} • {order.date}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-sans text-sm font-semibold text-[#C5A059] mb-1">৳ {order.amount.toLocaleString()}</p>
                            <span className="inline-block px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-sans font-medium">
                              {order.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-10 py-6 border-t border-gray-200 bg-gradient-to-r from-gray-50 to-white flex justify-end">
              <button
                onClick={() => setSelectedCustomer(null)}
                className="px-8 py-3 bg-gradient-to-r from-[#C5A059] to-[#B8935A] text-white rounded-lg hover:from-[#B8935A] hover:to-[#A67C4A] transition-all font-sans text-sm font-medium shadow-lg hover:shadow-xl"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
