import AdminSidebar from './components/AdminSidebar';
import { AdminProvider } from './context/AdminContext';

export const metadata = {
  title: 'Admin Dashboard | Zerin Heritage',
  description: 'Manage your Zerin Heritage store - products, orders, and customers.',
};

export default function AdminLayout({ children }) {
  return (
    <AdminProvider>
      <div className="flex min-h-screen bg-[#F5F5F5]">
        <AdminSidebar />
        <div className="flex-1 ml-64">
          {children}
        </div>
      </div>
    </AdminProvider>
  );
}
