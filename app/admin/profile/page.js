'use client';

import { useState } from 'react';
import AdminHeader from '../components/AdminHeader';
import { User, Mail, Lock, Save, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function ProfilePage() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [profileData, setProfileData] = useState({
    name: 'Admin User',
    email: 'admin@zerinheritage.com',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    alert('Profile updated successfully!');
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (profileData.newPassword !== profileData.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }
    if (profileData.newPassword.length < 8) {
      alert('Password must be at least 8 characters long!');
      return;
    }
    alert('Password changed successfully!');
    setProfileData({
      ...profileData,
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
  };

  return (
    <main className="min-h-screen">
      <AdminHeader 
        title="Profile Settings" 
        subtitle="Manage your account settings and security"
      />

      <div className="p-8 max-w-4xl">
        <Link 
          href="/admin/overview"
          className="inline-flex items-center gap-2 text-sm font-sans text-[#C5A059] hover:text-[#B8935A] transition-colors mb-6"
        >
          <ArrowLeft size={16} />
          Back to Dashboard
        </Link>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-200">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#C5A059] to-[#B8935A] flex items-center justify-center text-white">
              <User size={36} />
            </div>
            <div>
              <h2 className="text-xl font-serif text-[#1A1A1A] mb-1">Admin User</h2>
              <p className="text-sm font-sans text-[#8A8A8A]">Administrator</p>
            </div>
          </div>

          <form onSubmit={handleProfileUpdate}>
            <h3 className="text-lg font-serif text-[#1A1A1A] mb-4">Profile Information</h3>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-sans font-medium text-[#1A1A1A] mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    value={profileData.name}
                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C5A059] focus:border-transparent font-sans text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-sans font-medium text-[#1A1A1A] mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C5A059] focus:border-transparent font-sans text-sm"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2 bg-[#C5A059] text-white rounded-lg hover:bg-[#B8935A] transition-colors font-sans text-sm font-medium"
            >
              <Save size={18} />
              Save Changes
            </button>
          </form>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <form onSubmit={handlePasswordChange}>
            <h3 className="text-lg font-serif text-[#1A1A1A] mb-4">Change Password</h3>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-sans font-medium text-[#1A1A1A] mb-2">
                  Current Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type={showCurrentPassword ? 'text' : 'password'}
                    value={profileData.currentPassword}
                    onChange={(e) => setProfileData({ ...profileData, currentPassword: e.target.value })}
                    className="w-full pl-10 pr-12 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C5A059] focus:border-transparent font-sans text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-sans font-medium text-[#1A1A1A] mb-2">
                  New Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    value={profileData.newPassword}
                    onChange={(e) => setProfileData({ ...profileData, newPassword: e.target.value })}
                    className="w-full pl-10 pr-12 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C5A059] focus:border-transparent font-sans text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                <p className="text-xs font-sans text-[#8A8A8A] mt-1">
                  Must be at least 8 characters long
                </p>
              </div>

              <div>
                <label className="block text-sm font-sans font-medium text-[#1A1A1A] mb-2">
                  Confirm New Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={profileData.confirmPassword}
                    onChange={(e) => setProfileData({ ...profileData, confirmPassword: e.target.value })}
                    className="w-full pl-10 pr-12 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C5A059] focus:border-transparent font-sans text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2 bg-[#D10056] text-white rounded-lg hover:bg-[#B8004A] transition-colors font-sans text-sm font-medium"
            >
              <Lock size={18} />
              Update Password
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
