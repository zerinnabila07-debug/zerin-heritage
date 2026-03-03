'use client';

import { useState } from 'react';
import AdminHeader from '../components/AdminHeader';
import { Save, Store, CreditCard, Truck, Bell, Shield, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    storeName: 'Zerin Heritage',
    storeEmail: 'support@zerinheritage.com',
    storePhone: '+880 1234-567890',
    storeAddress: 'Dhaka, Bangladesh',
    currency: 'BDT',
    taxRate: '0',
    shippingFee: '100',
    freeShippingThreshold: '5000',
    enableNotifications: true,
    enableEmailAlerts: true,
  });

  const handleSave = (e) => {
    e.preventDefault();
    alert('Settings saved successfully!');
  };

  const [searchTerm, setSearchTerm] = useState('');

  return (
    <main className="min-h-screen">
      <AdminHeader 
        title="Settings" 
        subtitle="Configure your store settings"
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
          
          <form onSubmit={handleSave} className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-[#C5A059] rounded-lg flex items-center justify-center text-white">
                  <Store size={20} />
                </div>
                <h3 className="text-lg font-serif font-semibold text-[#1A1A1A]">Store Information</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-sans font-medium text-[#1A1A1A] mb-2">Store Name</label>
                  <input
                    type="text"
                    value={settings.storeName}
                    onChange={(e) => setSettings({ ...settings, storeName: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C5A059] focus:border-transparent font-sans text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-sans font-medium text-[#1A1A1A] mb-2">Store Email</label>
                  <input
                    type="email"
                    value={settings.storeEmail}
                    onChange={(e) => setSettings({ ...settings, storeEmail: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C5A059] focus:border-transparent font-sans text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-sans font-medium text-[#1A1A1A] mb-2">Store Phone</label>
                  <input
                    type="tel"
                    value={settings.storePhone}
                    onChange={(e) => setSettings({ ...settings, storePhone: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C5A059] focus:border-transparent font-sans text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-sans font-medium text-[#1A1A1A] mb-2">Store Address</label>
                  <input
                    type="text"
                    value={settings.storeAddress}
                    onChange={(e) => setSettings({ ...settings, storeAddress: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C5A059] focus:border-transparent font-sans text-sm"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-[#D10056] rounded-lg flex items-center justify-center text-white">
                  <CreditCard size={20} />
                </div>
                <h3 className="text-lg font-serif font-semibold text-[#1A1A1A]">Payment & Currency</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-sans font-medium text-[#1A1A1A] mb-2">Currency</label>
                  <select
                    value={settings.currency}
                    onChange={(e) => setSettings({ ...settings, currency: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C5A059] focus:border-transparent font-sans text-sm"
                  >
                    <option value="BDT">BDT (৳)</option>
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-sans font-medium text-[#1A1A1A] mb-2">Tax Rate (%)</label>
                  <input
                    type="number"
                    value={settings.taxRate}
                    onChange={(e) => setSettings({ ...settings, taxRate: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C5A059] focus:border-transparent font-sans text-sm"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-[#4CAF50] rounded-lg flex items-center justify-center text-white">
                  <Truck size={20} />
                </div>
                <h3 className="text-lg font-serif font-semibold text-[#1A1A1A]">Shipping Settings</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-sans font-medium text-[#1A1A1A] mb-2">Shipping Fee (BDT)</label>
                  <input
                    type="number"
                    value={settings.shippingFee}
                    onChange={(e) => setSettings({ ...settings, shippingFee: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C5A059] focus:border-transparent font-sans text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-sans font-medium text-[#1A1A1A] mb-2">Free Shipping Threshold (BDT)</label>
                  <input
                    type="number"
                    value={settings.freeShippingThreshold}
                    onChange={(e) => setSettings({ ...settings, freeShippingThreshold: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C5A059] focus:border-transparent font-sans text-sm"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-[#1A1A1A] rounded-lg flex items-center justify-center text-white">
                  <Bell size={20} />
                </div>
                <h3 className="text-lg font-serif font-semibold text-[#1A1A1A]">Notifications</h3>
              </div>

              <div className="space-y-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.enableNotifications}
                    onChange={(e) => setSettings({ ...settings, enableNotifications: e.target.checked })}
                    className="w-5 h-5 text-[#C5A059] border-gray-300 rounded focus:ring-[#C5A059]"
                  />
                  <span className="font-sans text-sm text-[#1A1A1A]">Enable push notifications</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.enableEmailAlerts}
                    onChange={(e) => setSettings({ ...settings, enableEmailAlerts: e.target.checked })}
                    className="w-5 h-5 text-[#C5A059] border-gray-300 rounded focus:ring-[#C5A059]"
                  />
                  <span className="font-sans text-sm text-[#1A1A1A]">Enable email alerts for new orders</span>
                </label>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="flex items-center gap-2 px-8 py-3 bg-[#C5A059] text-white rounded-lg hover:bg-[#B8935A] transition-colors font-sans text-sm font-medium shadow-lg"
              >
                <Save size={18} />
                Save Settings
              </button>
            </div>
          </form>
        </div>
    </main>
  );
}
