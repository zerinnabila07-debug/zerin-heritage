'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const AdminContext = createContext();

export function AdminProvider({ children }) {
  const [products, setProducts] = useState([
    { id: 1, name: 'Premium Silk Saree', category: 'Sarees', price: 12999, stock: 45, status: 'Active' },
    { id: 2, name: 'Designer Embroidery Kurti', category: 'Kurtis', price: 5999, stock: 3, status: 'Active' },
    { id: 3, name: 'Luxury Festive Lehenga', category: 'Lehengas', price: 18999, stock: 18, status: 'Active' },
    { id: 4, name: 'Floral Spring Tunic', category: 'Tunics', price: 4500, stock: 2, status: 'Active' },
    { id: 5, name: 'Traditional Silk Salwar', category: 'Salwar Kameez', price: 8999, stock: 28, status: 'Active' },
    { id: 6, name: 'Designer Handbag', category: 'Accessories', price: 2500, stock: 0, status: 'Out of Stock' },
  ]);

  const [orders, setOrders] = useState([
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
  ]);

  const [customers] = useState([
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
  ]);

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'order',
      title: 'New Order #2456 received',
      message: 'Ayesha Rahman placed an order for Premium Silk Saree',
      time: '5 minutes ago',
      unread: true,
      orderId: 'ORD-2456',
      timestamp: Date.now() - 5 * 60 * 1000,
    },
    {
      id: 2,
      type: 'stock',
      title: 'Product Silk Saree out of stock',
      message: 'Designer Handbag inventory is now at 0',
      time: '1 hour ago',
      unread: true,
      timestamp: Date.now() - 60 * 60 * 1000,
    },
    {
      id: 3,
      type: 'order',
      title: 'Order #2455 shipped',
      message: 'Order has been dispatched to Fatima Khan',
      time: '2 hours ago',
      unread: false,
      orderId: 'ORD-2455',
      timestamp: Date.now() - 2 * 60 * 60 * 1000,
    },
  ]);

  const [globalSearch, setGlobalSearch] = useState('');
  const [orderFilter, setOrderFilter] = useState('All');

  const addProduct = (product) => {
    const newProduct = {
      ...product,
      id: products.length + 1,
      status: product.stock > 0 ? 'Active' : 'Out of Stock',
    };
    setProducts([...products, newProduct]);
    
    addNotification({
      type: 'info',
      title: 'New product added',
      message: `${product.name} has been added to inventory`,
      timestamp: Date.now(),
    });
  };

  const updateProduct = (id, updates) => {
    setProducts(products.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const deleteProduct = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const addOrder = (order) => {
    const newOrder = {
      ...order,
      id: `ORD-${2456 + orders.length + 1}`,
      date: new Date().toISOString().split('T')[0],
    };
    setOrders([newOrder, ...orders]);
    
    addNotification({
      type: 'order',
      title: `New Order ${newOrder.id} received`,
      message: `${order.customer} placed an order for ${order.product}`,
      orderId: newOrder.id,
      timestamp: Date.now(),
    });
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
    
    if (newStatus === 'Shipped') {
      addNotification({
        type: 'order',
        title: `Order ${orderId} shipped`,
        message: `Order has been dispatched`,
        orderId: orderId,
        timestamp: Date.now(),
      });
    }
  };

  const addNotification = (notification) => {
    const newNotification = {
      ...notification,
      id: notifications.length + 1,
      unread: true,
      time: 'Just now',
    };
    setNotifications([newNotification, ...notifications]);
  };

  const markNotificationAsRead = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, unread: false } : n
    ));
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, unread: false })));
  };

  const getStats = () => {
    const totalRevenue = orders
      .filter(o => o.status !== 'Cancelled')
      .reduce((sum, o) => sum + o.amount, 0);
    
    const activeOrders = orders.filter(o => 
      o.status === 'Processing' || o.status === 'Shipped'
    ).length;

    const processingOrders = orders.filter(o => o.status === 'Processing').length;
    const shippedOrders = orders.filter(o => o.status === 'Shipped').length;
    const deliveredOrders = orders.filter(o => o.status === 'Delivered').length;

    return {
      totalRevenue,
      totalOrders: orders.length,
      activeOrders,
      processingOrders,
      shippedOrders,
      deliveredOrders,
      totalCustomers: customers.length,
      totalProducts: products.length,
      lowStockProducts: products.filter(p => p.stock > 0 && p.stock <= 5).length,
    };
  };

  const value = {
    products,
    orders,
    customers,
    notifications,
    globalSearch,
    orderFilter,
    setGlobalSearch,
    setOrderFilter,
    addProduct,
    updateProduct,
    deleteProduct,
    addOrder,
    updateOrderStatus,
    addNotification,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    getStats,
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within AdminProvider');
  }
  return context;
}
