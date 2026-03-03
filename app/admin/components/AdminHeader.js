'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Bell, Search, User, X, ShoppingBag, Package, AlertCircle, Clock } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';

const notificationIcons = {
  'order': ShoppingBag,
  'stock': AlertCircle,
  'info': Clock,
};

export default function AdminHeader({ title, subtitle, onSearch, searchValue = '' }) {
  const router = useRouter();
  const { notifications, markNotificationAsRead, markAllNotificationsAsRead, globalSearch, setGlobalSearch } = useAdmin();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [searchInput, setSearchInput] = useState(searchValue);
  
  const notificationRef = useRef(null);
  const searchRef = useRef(null);
  const profileRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearch(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfile(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    setGlobalSearch(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  const handleNotificationClick = (notification) => {
    markNotificationAsRead(notification.id);
    if (notification.orderId) {
      router.push(`/admin/orders?orderId=${notification.orderId}`);
    }
    setShowNotifications(false);
  };

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <header className="bg-white border-b border-gray-200 px-8 py-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif text-[#1A1A1A] mb-1">{title}</h1>
          {subtitle && (
            <p className="text-sm font-sans text-[#8A8A8A]">{subtitle}</p>
          )}
        </div>

        <div className="flex items-center gap-4">
          <div ref={notificationRef} className="relative">
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 text-gray-600 hover:text-[#C5A059] transition-colors"
            >
              <Bell size={20} />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-[#D10056] rounded-full"></span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 top-12 w-96 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 overflow-hidden">
                <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                  <h3 className="font-serif text-lg text-[#1A1A1A]">Notifications</h3>
                  {unreadCount > 0 && (
                    <span className="text-xs font-sans text-[#C5A059] bg-[#C5A059]/10 px-2 py-1 rounded-full">
                      {unreadCount} new
                    </span>
                  )}
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="p-8 text-center">
                      <p className="text-sm font-sans text-[#8A8A8A]">No notifications</p>
                    </div>
                  ) : (
                    notifications.map((notification) => {
                      const Icon = notificationIcons[notification.type] || Package;
                      return (
                        <div
                          key={notification.id}
                          onClick={() => handleNotificationClick(notification)}
                          className={`p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer ${
                            notification.unread ? 'bg-blue-50/30' : ''
                          }`}
                        >
                          <div className="flex gap-3">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                              notification.type === 'order' ? 'bg-green-100 text-green-600' :
                              notification.type === 'stock' ? 'bg-red-100 text-red-600' :
                              'bg-blue-100 text-blue-600'
                            }`}>
                              <Icon size={18} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-sans font-medium text-[#1A1A1A] mb-1">
                                {notification.title}
                              </p>
                              <p className="text-xs font-sans text-[#8A8A8A] mb-1">
                                {notification.message}
                              </p>
                              <p className="text-xs font-sans text-[#C5A059]">
                                {notification.time}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
                <div className="p-3 border-t border-gray-200 text-center">
                  <button 
                    onClick={() => {
                      markAllNotificationsAsRead();
                      setShowNotifications(false);
                    }}
                    className="text-sm font-sans text-[#C5A059] hover:text-[#B8935A] transition-colors"
                  >
                    Mark all as read
                  </button>
                </div>
              </div>
            )}
          </div>
          
          <div ref={searchRef} className="relative">
            <button 
              onClick={() => setShowSearch(!showSearch)}
              className="p-2 text-gray-600 hover:text-[#C5A059] transition-colors"
            >
              <Search size={20} />
            </button>

            {showSearch && (
              <div className="absolute right-0 top-12 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 p-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    placeholder="Search orders, products..."
                    value={searchInput}
                    onChange={handleSearchChange}
                    autoFocus
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C5A059] focus:border-transparent font-sans text-sm"
                  />
                </div>
              </div>
            )}
          </div>

          <div ref={profileRef} className="relative">
            <button 
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center gap-2 px-4 py-2 bg-[#F5F5F5] rounded-lg hover:bg-[#C5A059] hover:text-white transition-all"
            >
              <User size={18} />
              <span className="text-sm font-sans font-medium">Admin</span>
            </button>

            {showProfile && (
              <div className="absolute right-0 top-12 w-56 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 overflow-hidden">
                <div className="p-4 border-b border-gray-200">
                  <p className="font-sans text-sm font-medium text-[#1A1A1A]">Admin User</p>
                  <p className="font-sans text-xs text-[#8A8A8A]">admin@zerinheritage.com</p>
                </div>
                <div className="py-2">
                  <button
                    onClick={() => {
                      setShowProfile(false);
                      router.push('/admin/profile');
                    }}
                    className="w-full px-4 py-2 text-left font-sans text-sm text-[#1A1A1A] hover:bg-gray-50 transition-colors"
                  >
                    Profile Settings
                  </button>
                  <button
                    onClick={() => {
                      setShowProfile(false);
                      router.push('/');
                    }}
                    className="w-full px-4 py-2 text-left font-sans text-sm text-[#D10056] hover:bg-red-50 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
