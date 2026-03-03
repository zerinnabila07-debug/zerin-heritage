'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminHeader from '../components/AdminHeader';
import { TrendingUp, ShoppingBag, Users, DollarSign, ArrowLeft } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useAdmin } from '../context/AdminContext';
import Link from 'next/link';

const salesData = [
  { month: 'Jan', revenue: 45000, orders: 120 },
  { month: 'Feb', revenue: 52000, orders: 145 },
  { month: 'Mar', revenue: 48000, orders: 132 },
  { month: 'Apr', revenue: 61000, orders: 168 },
  { month: 'May', revenue: 55000, orders: 152 },
  { month: 'Jun', revenue: 67000, orders: 189 },
];


export default function OverviewPage() {
  const router = useRouter();
  const { getStats, orders, notifications, setOrderFilter } = useAdmin();
  const [searchTerm, setSearchTerm] = useState('');
  
  const stats = getStats();

  const summaryCards = [
    {
      title: 'Total Revenue',
      value: `৳ ${stats.totalRevenue.toLocaleString()}`,
      change: '+12.5%',
      icon: DollarSign,
      color: 'bg-gradient-to-br from-[#C5A059] to-[#B8935A]',
      link: '/admin/orders',
      clickable: true,
    },
    {
      title: 'Active Orders',
      value: stats.activeOrders.toString(),
      change: '+8.2%',
      icon: ShoppingBag,
      color: 'bg-gradient-to-br from-[#D10056] to-[#B8004A]',
      link: '/admin/orders',
      clickable: true,
    },
    {
      title: 'Total Customers',
      value: stats.totalCustomers.toString(),
      change: '+15.3%',
      icon: Users,
      color: 'bg-gradient-to-br from-[#1A1A1A] to-[#2C2C2C]',
      link: '/admin/customers',
      clickable: true,
    },
    {
      title: 'Total Products',
      value: stats.totalProducts.toString(),
      change: `${stats.lowStockProducts} low stock`,
      icon: TrendingUp,
      color: 'bg-gradient-to-br from-[#4CAF50] to-[#388E3C]',
      link: '/admin/products',
      clickable: true,
    },
  ];

  const handleCardClick = (card) => {
    if (card.clickable && card.link) {
      router.push(card.link);
    }
  };

  const handleActivityClick = (activity) => {
    if (activity.orderId) {
      router.push(`/admin/orders?orderId=${activity.orderId}`);
    } else if (activity.productId) {
      router.push(`/admin/products?productId=${activity.productId}`);
    }
  };

  const recentActivities = notifications.slice(0, 4).map(n => ({
    action: n.title,
    details: n.message,
    time: n.time,
    status: n.type === 'order' ? 'success' : n.type === 'stock' ? 'warning' : 'info',
    orderId: n.orderId,
  }));

  return (
    <main className="min-h-screen">
      <AdminHeader 
        title="Overview" 
        subtitle="Welcome back! Here's what's happening with your store today."
        onSearch={setSearchTerm}
        searchValue={searchTerm}
      />

        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {summaryCards.map((card, index) => {
              const Icon = card.icon;
              return (
                <div
                  key={index}
                  onClick={() => handleCardClick(card)}
                  className={`bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 ${
                    card.clickable 
                      ? 'cursor-pointer hover:shadow-lg hover:scale-105 hover:border-[#C5A059]' 
                      : 'hover:shadow-md'
                  }`}
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`${card.color} w-12 h-12 rounded-lg flex items-center justify-center text-white`}>
                        <Icon size={24} />
                      </div>
                      <span className="text-sm font-sans font-medium text-green-600">
                        {card.change}
                      </span>
                    </div>
                    <h3 className="text-sm font-sans text-[#8A8A8A] mb-1">{card.title}</h3>
                    <p className="text-2xl font-serif font-semibold text-[#1A1A1A]">{card.value}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-serif font-semibold text-[#1A1A1A] mb-6">Revenue Overview</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="month" 
                    stroke="#8A8A8A"
                    style={{ fontSize: '12px', fontFamily: 'Montserrat' }}
                  />
                  <YAxis 
                    stroke="#8A8A8A"
                    style={{ fontSize: '12px', fontFamily: 'Montserrat' }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#fff', 
                      border: '1px solid #e0e0e0',
                      borderRadius: '8px',
                      fontFamily: 'Montserrat'
                    }}
                  />
                  <Legend 
                    wrapperStyle={{ fontFamily: 'Montserrat', fontSize: '12px' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#C5A059" 
                    strokeWidth={3}
                    dot={{ fill: '#C5A059', r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-serif font-semibold text-[#1A1A1A] mb-6">Order Statistics</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="month" 
                    stroke="#8A8A8A"
                    style={{ fontSize: '12px', fontFamily: 'Montserrat' }}
                  />
                  <YAxis 
                    stroke="#8A8A8A"
                    style={{ fontSize: '12px', fontFamily: 'Montserrat' }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#fff', 
                      border: '1px solid #e0e0e0',
                      borderRadius: '8px',
                      fontFamily: 'Montserrat'
                    }}
                  />
                  <Legend 
                    wrapperStyle={{ fontFamily: 'Montserrat', fontSize: '12px' }}
                  />
                  <Bar 
                    dataKey="orders" 
                    fill="#D10056" 
                    radius={[8, 8, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-serif font-semibold text-[#1A1A1A] mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div 
                  key={index} 
                  onClick={() => handleActivityClick(activity)}
                  className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0 cursor-pointer hover:bg-gray-50 -mx-2 px-2 rounded transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${
                      activity.status === 'success' ? 'bg-green-500' :
                      activity.status === 'warning' ? 'bg-yellow-500' :
                      'bg-blue-500'
                    }`}></div>
                    <div>
                      <p className="text-sm font-sans text-[#1A1A1A]">{activity.action}</p>
                      <p className="text-xs font-sans text-[#8A8A8A]">
                        {activity.details}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-sans text-[#8A8A8A]">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
    </main>
  );
}
