'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import AdminHeader from '../components/AdminHeader';
import { Eye, Package, Truck, CheckCircle, XCircle, MessageCircle, Download, FileText, ChevronDown, Clock, ArrowLeft, Trash2, User, X, Calendar, DollarSign } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import Link from 'next/link';

const initialOrders = [
  {
    id: 'ORD-2456',
    customer: 'Ayesha Rahman',
    phone: '+8801712345678',
    product: 'Premium Silk Saree',
    amount: 12999,
    paymentMethod: 'bKash',
    status: 'Processing',
    date: '2026-03-03',
  },
  {
    id: 'ORD-2455',
    customer: 'Fatima Khan',
    phone: '+8801823456789',
    product: 'Designer Embroidery Kurti',
    amount: 5999,
    paymentMethod: 'Nagad',
    status: 'Shipped',
    date: '2026-03-02',
  },
  {
    id: 'ORD-2454',
    customer: 'Nusrat Jahan',
    phone: '+8801934567890',
    product: 'Luxury Festive Lehenga',
    amount: 18999,
    paymentMethod: 'Visa Card',
    status: 'Delivered',
    date: '2026-03-01',
  },
  {
    id: 'ORD-2453',
    customer: 'Sadia Akter',
    phone: '+8801645678901',
    product: 'Floral Spring Tunic',
    amount: 4500,
    paymentMethod: 'Rocket',
    status: 'Processing',
    date: '2026-03-01',
  },
  {
    id: 'ORD-2452',
    customer: 'Tasneem Ahmed',
    phone: '+8801756789012',
    product: 'Traditional Silk Salwar',
    amount: 8999,
    paymentMethod: 'Mastercard',
    status: 'Cancelled',
    date: '2026-02-28',
  },
];

const statusColors = {
  'Pending': 'bg-gray-100 text-gray-700',
  'Processing': 'bg-blue-100 text-blue-700',
  'Shipped': 'bg-orange-100 text-orange-700',
  'Delivered': 'bg-green-100 text-green-700',
  'Cancelled': 'bg-red-100 text-red-700',
};

const statusIcons = {
  'Pending': Clock,
  'Processing': Package,
  'Shipped': Truck,
  'Delivered': CheckCircle,
  'Cancelled': XCircle,
};

const statusOptions = ['Pending', 'Processing', 'Shipped', 'Delivered'];

export default function OrdersPage() {
  const searchParams = useSearchParams();
  const { orders, updateOrderStatus, getStats, customers } = useAdmin();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const orderId = searchParams?.get('orderId');
    const status = searchParams?.get('status');
    
    if (orderId) {
      const order = orders.find(o => o.id === orderId);
      if (order) {
        setSelectedOrder(order);
      }
    }
    
    if (status && status !== 'All') {
      setStatusFilter(status);
    }
  }, [searchParams, orders]);

  const filteredOrders = orders.filter(order => {
    const matchesStatus = statusFilter === 'All' || order.status === statusFilter;
    const matchesSearch = searchTerm === '' || 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.product.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleWhatsAppClick = (order) => {
    const message = `Hello ${order.customer}, this is from Zerin Heritage regarding your order ${order.id}. We wanted to update you on your ${order.product}.`;
    const whatsappUrl = `https://wa.me/${order.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleStatusChange = (orderId, newStatus) => {
    updateOrderStatus(orderId, newStatus);
    showToast(`Order ${orderId} status updated to ${newStatus}`);
  };

  const handleCustomerClick = (customerName) => {
    const customer = customers.find(c => c.name === customerName);
    if (customer) {
      setSelectedCustomer(customer);
    }
  };

  const handleDeleteOrder = (orderId) => {
    if (confirm(`Are you sure you want to delete order ${orderId}?`)) {
      showToast(`Order ${orderId} deleted successfully`);
    }
  };

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const exportToCSV = () => {
    const headers = ['Order ID', 'Customer', 'Phone', 'Product', 'Amount (৳)', 'Payment Method', 'Status', 'Date'];
    const csvData = filteredOrders.map(order => [
      order.id,
      order.customer,
      order.phone,
      order.product,
      order.amount,
      order.paymentMethod,
      order.status,
      order.date
    ]);

    const csvContent = [
      headers.join(','),
      ...csvData.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `zerin-heritage-orders-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportToPDF = () => {
    const currentDate = new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });

    let pdfContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Zerin Heritage - Orders Report</title>
        <style>
          body { font-family: 'Arial', sans-serif; margin: 40px; color: #1A1A1A; }
          .header { text-align: center; margin-bottom: 30px; border-bottom: 3px solid #C5A059; padding-bottom: 20px; }
          .header h1 { color: #C5A059; font-size: 32px; margin: 0; font-family: 'Georgia', serif; }
          .header p { color: #8A8A8A; font-size: 14px; margin: 5px 0; }
          .date { text-align: right; color: #8A8A8A; font-size: 12px; margin-bottom: 20px; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; font-size: 12px; }
          th { background-color: #C5A059; color: white; padding: 10px; text-align: left; font-weight: 600; }
          td { padding: 8px; border-bottom: 1px solid #E0E0E0; }
          tr:nth-child(even) { background-color: #F9F9F9; }
          .status-processing { color: #1976D2; font-weight: 600; }
          .status-shipped { color: #F57C00; font-weight: 600; }
          .status-delivered { color: #388E3C; font-weight: 600; }
          .status-cancelled { color: #D32F2F; font-weight: 600; }
          .footer { margin-top: 40px; text-align: center; color: #8A8A8A; font-size: 12px; border-top: 1px solid #E0E0E0; padding-top: 20px; }
          .summary { display: flex; justify-content: space-around; margin: 20px 0; }
          .summary-item { text-align: center; }
          .summary-item h3 { color: #C5A059; margin: 5px 0; font-size: 24px; }
          .summary-item p { color: #8A8A8A; margin: 0; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Zerin Heritage</h1>
          <p>Luxury South Asian Fashion & Heritage Wear</p>
        </div>
        <div class="date">Generated on: ${currentDate}</div>
        <h2 style="color: #1A1A1A; font-size: 24px;">Orders Report</h2>
        
        <div class="summary">
          <div class="summary-item">
            <h3>${filteredOrders.length}</h3>
            <p>Total Orders</p>
          </div>
          <div class="summary-item">
            <h3>৳ ${filteredOrders.reduce((sum, o) => sum + o.amount, 0).toLocaleString()}</h3>
            <p>Total Revenue</p>
          </div>
          <div class="summary-item">
            <h3>${filteredOrders.filter(o => o.status === 'Processing').length}</h3>
            <p>Processing</p>
          </div>
          <div class="summary-item">
            <h3>${filteredOrders.filter(o => o.status === 'Delivered').length}</h3>
            <p>Delivered</p>
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Phone</th>
              <th>Product</th>
              <th>Amount</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            ${filteredOrders.map(order => `
              <tr>
                <td>${order.id}</td>
                <td>${order.customer}</td>
                <td>${order.phone}</td>
                <td>${order.product}</td>
                <td>৳ ${order.amount.toLocaleString()}</td>
                <td>${order.paymentMethod}</td>
                <td class="status-${order.status.toLowerCase()}">${order.status}</td>
                <td>${order.date}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        <div class="footer">
          <p>Zerin Heritage - Admin Dashboard Report</p>
          <p>This report contains ${filteredOrders.length} order(s)</p>
        </div>
      </body>
      </html>
    `;

    const printWindow = window.open('', '', 'height=600,width=800');
    printWindow.document.write(pdfContent);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 250);
  };

  // Calculate stats before using them
  const stats = getStats();

  const orderStats = [
    { label: 'Total Orders', value: stats.totalOrders, color: 'bg-[#C5A059]', filter: 'All' },
    { label: 'Processing', value: stats.processingOrders, color: 'bg-blue-500', filter: 'Processing' },
    { label: 'Shipped', value: stats.shippedOrders, color: 'bg-orange-500', filter: 'Shipped' },
    { label: 'Delivered', value: stats.deliveredOrders, color: 'bg-green-500', filter: 'Delivered' },
  ];

  return (
    <main className="min-h-screen">
      <AdminHeader 
        title="Orders" 
        subtitle="Manage customer orders and track shipments"
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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {orderStats.map((stat, index) => (
              <div 
                key={index} 
                onClick={() => setStatusFilter(stat.filter)}
                className={`bg-white rounded-xl shadow-sm border p-6 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                  statusFilter === stat.filter 
                    ? 'border-[#C5A059] ring-2 ring-[#C5A059]/20' 
                    : 'border-gray-100 hover:border-[#C5A059]'
                }`}
              >
                <div className={`${stat.color} w-10 h-10 rounded-lg flex items-center justify-center text-white mb-3`}>
                  <Package size={20} />
                </div>
                <p className="text-sm font-sans text-[#8A8A8A] mb-1">{stat.label}</p>
                <p className="text-2xl font-serif font-semibold text-[#1A1A1A]">{stat.value}</p>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-serif font-semibold text-[#1A1A1A]">Recent Orders</h3>
              <div className="flex items-center gap-3">
                {statusFilter !== 'All' && (
                  <button
                    onClick={() => setStatusFilter('All')}
                    className="text-sm font-sans text-[#C5A059] hover:text-[#B8935A] transition-colors"
                  >
                    Clear Filter
                  </button>
                )}
                <button
                  onClick={exportToCSV}
                  className="flex items-center gap-2 px-4 py-2 border border-[#C5A059] text-[#C5A059] rounded-lg hover:bg-[#C5A059] hover:text-white transition-colors font-sans text-sm font-medium"
                >
                  <Download size={16} />
                  Export CSV
                </button>
                <button
                  onClick={exportToPDF}
                  className="flex items-center gap-2 px-4 py-2 border border-[#C5A059] text-[#C5A059] rounded-lg hover:bg-[#C5A059] hover:text-white transition-colors font-sans text-sm font-medium"
                >
                  <FileText size={16} />
                  Download PDF
                </button>
              </div>
            </div>
            
            <div className="overflow-x-auto -mx-6 px-6">
              <table className="w-full min-w-max">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-3 px-2 font-sans text-[13px] font-semibold text-[#1A1A1A] w-[100px]">Order ID</th>
                    <th className="text-left py-3 px-2 font-sans text-[13px] font-semibold text-[#1A1A1A] w-[140px]">Customer</th>
                    <th className="text-left py-3 px-2 font-sans text-[13px] font-semibold text-[#1A1A1A] w-[110px]">Phone</th>
                    <th className="text-left py-3 px-2 font-sans text-[13px] font-semibold text-[#1A1A1A] w-[180px]">Product</th>
                    <th className="text-left py-3 px-2 font-sans text-[13px] font-semibold text-[#1A1A1A] w-[90px]">Amount</th>
                    <th className="text-left py-3 px-2 font-sans text-[13px] font-semibold text-[#1A1A1A] w-[90px]">Payment</th>
                    <th className="text-left py-3 px-2 font-sans text-[13px] font-semibold text-[#1A1A1A] w-[120px]">Status</th>
                    <th className="text-left py-3 px-2 font-sans text-[13px] font-semibold text-[#1A1A1A] w-[90px]">Date</th>
                    <th className="text-center py-3 px-2 font-sans text-[13px] font-semibold text-[#1A1A1A] w-[80px]">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.length === 0 ? (
                    <tr>
                      <td colSpan="9" className="py-12 text-center">
                        <p className="text-sm font-sans text-[#8A8A8A]">No orders found</p>
                      </td>
                    </tr>
                  ) : (
                    filteredOrders.map((order) => {
                      const StatusIcon = statusIcons[order.status];
                      return (
                        <tr key={order.id} className="border-b border-gray-100 hover:bg-gradient-to-r hover:from-[#FFF9F5] hover:to-white transition-all">
                          <td className="py-3 px-2">
                            <button
                              onClick={() => setSelectedOrder(order)}
                              className="font-sans text-[13px] font-semibold text-[#C5A059] hover:text-[#B8935A] hover:underline transition-colors"
                            >
                              {order.id}
                            </button>
                          </td>
                          <td className="py-3 px-2">
                            <button
                              onClick={() => handleCustomerClick(order.customer)}
                              className="font-sans text-[13px] text-[#1A1A1A] hover:text-[#C5A059] hover:underline transition-colors text-left truncate max-w-[140px]"
                              title={order.customer}
                            >
                              {order.customer}
                            </button>
                          </td>
                          <td className="py-3 px-2">
                            <button
                              onClick={() => handleWhatsAppClick(order)}
                              className="flex items-center gap-1 text-[13px] font-sans text-[#25D366] hover:text-[#128C7E] transition-colors group"
                              title="Contact via WhatsApp"
                            >
                              <MessageCircle size={14} className="text-[#C5A059] group-hover:text-[#B8935A] flex-shrink-0" />
                              <span className="group-hover:underline truncate">
                                {order.phone.replace('+880', '')}
                              </span>
                            </button>
                          </td>
                          <td className="py-3 px-2">
                            <span className="font-sans text-[13px] text-[#8A8A8A] truncate block max-w-[180px]" title={order.product}>
                              {order.product}
                            </span>
                          </td>
                          <td className="py-3 px-2">
                            <span className="font-sans text-[13px] text-[#1A1A1A] font-semibold whitespace-nowrap">
                              ৳{(order.amount / 1000).toFixed(1)}k
                            </span>
                          </td>
                          <td className="py-3 px-2">
                            <span className="inline-block px-2 py-0.5 bg-gray-100 text-gray-700 rounded-md text-[11px] font-sans font-medium truncate max-w-[90px]">
                              {order.paymentMethod}
                            </span>
                          </td>
                          <td className="py-3 px-2">
                            {order.status === 'Cancelled' ? (
                              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-sans font-medium ${statusColors[order.status]}`}>
                                <StatusIcon size={12} />
                                {order.status}
                              </span>
                            ) : (
                              <div className="relative">
                                <select
                                  value={order.status}
                                  onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                  className={`appearance-none cursor-pointer px-2 py-0.5 pr-6 rounded-md text-[11px] font-sans font-medium border-0 focus:outline-none focus:ring-1 focus:ring-[#C5A059] transition-all w-full ${statusColors[order.status]}`}
                                >
                                  {statusOptions.map(status => (
                                    <option key={status} value={status}>{status}</option>
                                  ))}
                                </select>
                                <ChevronDown size={10} className="absolute right-1 top-1/2 -translate-y-1/2 pointer-events-none" />
                              </div>
                            )}
                          </td>
                          <td className="py-3 px-2">
                            <span className="font-sans text-[13px] text-[#8A8A8A] whitespace-nowrap">
                              {new Date(order.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                            </span>
                          </td>
                          <td className="py-3 px-2">
                            <div className="flex items-center justify-center gap-1">
                              <button 
                                onClick={() => setSelectedOrder(order)}
                                className="p-1.5 text-gray-600 hover:text-[#C5A059] hover:bg-[#C5A059]/10 rounded-lg transition-colors"
                                title="View Details"
                              >
                                <Eye size={14} />
                              </button>
                              <button 
                                onClick={() => handleDeleteOrder(order.id)}
                                className="p-1.5 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                title="Delete Order"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      {selectedOrder && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-[90%] max-w-5xl">
            <div className="flex items-center justify-between px-10 py-6 border-b border-gray-200 bg-gradient-to-r from-[#C5A059]/5 to-white">
              <div>
                <h2 className="text-3xl font-serif text-[#1A1A1A] mb-1">Order Details</h2>
                <p className="text-sm font-sans text-[#8A8A8A]">Complete order information</p>
              </div>
              <button 
                onClick={() => setSelectedOrder(null)}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                title="Close"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="px-10 py-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                <div className="space-y-6">
                  <div className="pb-4 border-b border-gray-200">
                    <span className="font-sans text-xs text-[#8A8A8A] uppercase tracking-wide mb-2 block">Order ID</span>
                    <span className="font-serif text-xl font-semibold text-[#C5A059]">{selectedOrder.id}</span>
                  </div>
                  
                  <div className="pb-4 border-b border-gray-200">
                    <span className="font-sans text-xs text-[#8A8A8A] uppercase tracking-wide mb-2 block">Customer Name</span>
                    <span className="font-sans text-lg font-medium text-[#1A1A1A]">{selectedOrder.customer}</span>
                  </div>
                  
                  <div className="pb-4 border-b border-gray-200">
                    <span className="font-sans text-xs text-[#8A8A8A] uppercase tracking-wide mb-2 block">Phone Number</span>
                    <button
                      onClick={() => handleWhatsAppClick(selectedOrder)}
                      className="flex items-center gap-2 text-base font-sans text-[#25D366] hover:text-[#128C7E] transition-colors group"
                      title="Contact via WhatsApp"
                    >
                      <MessageCircle size={18} className="text-[#C5A059] group-hover:text-[#B8935A]" />
                      <span className="group-hover:underline">{selectedOrder.phone}</span>
                    </button>
                  </div>
                  
                  <div className="pb-4 border-b border-gray-200">
                    <span className="font-sans text-xs text-[#8A8A8A] uppercase tracking-wide mb-2 block">Product</span>
                    <span className="font-sans text-lg font-medium text-[#1A1A1A]">{selectedOrder.product}</span>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="pb-4 border-b border-gray-200">
                    <span className="font-sans text-xs text-[#8A8A8A] uppercase tracking-wide mb-2 block">Order Amount</span>
                    <span className="font-serif text-2xl font-bold text-[#1A1A1A]">৳ {selectedOrder.amount.toLocaleString()}</span>
                  </div>
                  
                  <div className="pb-4 border-b border-gray-200">
                    <span className="font-sans text-xs text-[#8A8A8A] uppercase tracking-wide mb-2 block">Payment Method</span>
                    <span className="font-sans text-lg font-medium text-[#1A1A1A]">{selectedOrder.paymentMethod}</span>
                  </div>
                  
                  <div className="pb-4 border-b border-gray-200">
                    <span className="font-sans text-xs text-[#8A8A8A] uppercase tracking-wide mb-2 block">Order Status</span>
                    <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-sans font-semibold ${statusColors[selectedOrder.status]}`}>
                      {React.createElement(statusIcons[selectedOrder.status], { size: 16 })}
                      {selectedOrder.status}
                    </span>
                  </div>
                  
                  <div className="pb-4 border-b border-gray-200">
                    <span className="font-sans text-xs text-[#8A8A8A] uppercase tracking-wide mb-2 block">Order Date</span>
                    <span className="font-sans text-lg font-medium text-[#1A1A1A]">{selectedOrder.date}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-10 py-6 border-t border-gray-200 bg-gradient-to-r from-gray-50 to-white flex justify-end">
              <button
                onClick={() => setSelectedOrder(null)}
                className="px-8 py-3 bg-gradient-to-r from-[#C5A059] to-[#B8935A] text-white rounded-lg hover:from-[#B8935A] hover:to-[#A67C4A] transition-all font-sans text-sm font-medium shadow-lg hover:shadow-xl"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedCustomer && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-[90%] max-w-5xl">
            <div className="flex items-center justify-between px-10 py-6 border-b border-gray-200 bg-gradient-to-r from-[#C5A059]/5 to-white">
              <div>
                <h2 className="text-3xl font-serif text-[#1A1A1A] mb-1">Customer Profile</h2>
                <p className="text-sm font-sans text-[#8A8A8A]">Complete customer information</p>
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
                        <User size={14} />
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
                      onClick={() => {
                        const message = `Hello ${selectedCustomer.name}, this is from Zerin Heritage. We wanted to reach out regarding your recent orders with us.`;
                        const whatsappUrl = `https://wa.me/${selectedCustomer.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
                        window.open(whatsappUrl, '_blank');
                      }}
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
                </div>

                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-[#C5A059]/10 to-[#B8935A]/10 rounded-xl p-6 border-2 border-[#C5A059]/20">
                    <div className="flex items-center gap-3 mb-3">
                      <Package size={22} className="text-[#C5A059]" />
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
              </div>
            </div>

            <div className="px-10 py-6 border-t border-gray-200 bg-gradient-to-r from-gray-50 to-white flex justify-end">
              <button
                onClick={() => setSelectedCustomer(null)}
                className="px-8 py-3 bg-gradient-to-r from-[#C5A059] to-[#B8935A] text-white rounded-lg hover:from-[#B8935A] hover:to-[#A67C4A] transition-all font-sans text-sm font-medium shadow-lg hover:shadow-xl"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div className="fixed bottom-8 right-8 z-50 animate-slide-up">
          <div className="bg-white rounded-xl shadow-2xl border border-[#C5A059] p-4 flex items-center gap-3 min-w-[320px]">
            <div className="w-10 h-10 bg-gradient-to-br from-[#C5A059] to-[#B8935A] rounded-full flex items-center justify-center flex-shrink-0">
              <CheckCircle size={20} className="text-white" />
            </div>
            <div className="flex-1">
              <p className="font-sans text-sm font-medium text-[#1A1A1A]">Success</p>
              <p className="font-sans text-xs text-[#8A8A8A] mt-0.5">{toast}</p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
