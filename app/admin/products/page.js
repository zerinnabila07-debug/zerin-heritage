'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import AdminHeader from '../components/AdminHeader';
import { Plus, Edit, Trash2, Search, Filter, AlertTriangle, Download, FileText, ArrowLeft, X, Upload, CheckCircle, ImageIcon } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import Link from 'next/link';

const initialProducts = [
  { id: 1, name: 'Premium Silk Saree', category: 'Sarees', price: 12999, stock: 45, status: 'Active' },
  { id: 2, name: 'Designer Embroidery Kurti', category: 'Kurtis', price: 5999, stock: 3, status: 'Active' },
  { id: 3, name: 'Luxury Festive Lehenga', category: 'Lehengas', price: 18999, stock: 18, status: 'Active' },
  { id: 4, name: 'Floral Spring Tunic', category: 'Tunics', price: 4500, stock: 2, status: 'Active' },
  { id: 5, name: 'Traditional Silk Salwar', category: 'Salwar Kameez', price: 8999, stock: 28, status: 'Active' },
  { id: 6, name: 'Designer Handbag', category: 'Accessories', price: 2500, stock: 0, status: 'Out of Stock' },
];

export default function ProductsPage() {
  const { products, addProduct, deleteProduct, updateProduct } = useAdmin();
  const [showModal, setShowModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [toast, setToast] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  
  const [formData, setFormData] = useState({
    name: '',
    category: 'Sarees',
    price: '',
    stock: '',
    image: '',
    imageFile: null,
  });

  const categories = ['Sarees', 'Kurtis', 'Lehengas', 'Accessories', 'Tunics', 'Salwar Kameez'];

  const openAddModal = () => {
    setEditingProduct(null);
    setImagePreview(null);
    setFormData({
      name: '',
      category: 'Sarees',
      price: '',
      stock: '',
      image: '',
      imageFile: null,
    });
    setShowModal(true);
  };

  const openEditModal = (product) => {
    setEditingProduct(product);
    setImagePreview(product.image || null);
    setFormData({
      name: product.name,
      category: product.category,
      price: product.price.toString(),
      stock: product.stock.toString(),
      image: product.image || '',
      imageFile: null,
    });
    setShowModal(true);
  };

  const handleImageSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        showToast('Image size must be less than 2MB');
        return;
      }

      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
      setFormData({ 
        ...formData, 
        image: imageUrl,
        imageFile: file 
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const productData = {
      name: formData.name,
      category: formData.category,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock),
      image: formData.image || '/placeholder-product.jpg',
    };

    if (editingProduct) {
      updateProduct(editingProduct.id, productData);
      showToast(`Product "${formData.name}" updated successfully`);
    } else {
      addProduct(productData);
      showToast(`Product "${formData.name}" added successfully`);
    }

    closeModal();
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingProduct(null);
    setImagePreview(null);
    setFormData({ 
      name: '', 
      category: 'Sarees', 
      price: '', 
      stock: '', 
      image: '',
      imageFile: null 
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const openDeleteConfirm = (product) => {
    setProductToDelete(product);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    if (productToDelete) {
      deleteProduct(productToDelete.id);
      showToast(`Product "${productToDelete.name}" deleted successfully`);
      setShowDeleteConfirm(false);
      setProductToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
    setProductToDelete(null);
  };

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 4000);
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const exportToCSV = () => {
    const headers = ['ID', 'Product Name', 'Category', 'Price (৳)', 'Stock', 'Status'];
    const csvData = filteredProducts.map(product => [
      product.id,
      product.name,
      product.category,
      product.price,
      product.stock,
      product.status
    ]);

    const csvContent = [
      headers.join(','),
      ...csvData.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `zerin-heritage-products-${new Date().toISOString().split('T')[0]}.csv`);
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
        <title>Zerin Heritage - Products Report</title>
        <style>
          body { font-family: 'Arial', sans-serif; margin: 40px; color: #1A1A1A; }
          .header { text-align: center; margin-bottom: 30px; border-bottom: 3px solid #C5A059; padding-bottom: 20px; }
          .header h1 { color: #C5A059; font-size: 32px; margin: 0; font-family: 'Georgia', serif; }
          .header p { color: #8A8A8A; font-size: 14px; margin: 5px 0; }
          .date { text-align: right; color: #8A8A8A; font-size: 12px; margin-bottom: 20px; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th { background-color: #C5A059; color: white; padding: 12px; text-align: left; font-weight: 600; }
          td { padding: 10px; border-bottom: 1px solid #E0E0E0; }
          tr:nth-child(even) { background-color: #F9F9F9; }
          .low-stock { color: #D32F2F; font-weight: 600; }
          .footer { margin-top: 40px; text-align: center; color: #8A8A8A; font-size: 12px; border-top: 1px solid #E0E0E0; padding-top: 20px; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Zerin Heritage</h1>
          <p>Luxury South Asian Fashion & Heritage Wear</p>
        </div>
        <div class="date">Generated on: ${currentDate}</div>
        <h2 style="color: #1A1A1A; font-size: 24px;">Products Report</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Product Name</th>
              <th>Category</th>
              <th>Price (৳)</th>
              <th>Stock</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            ${filteredProducts.map(product => `
              <tr>
                <td>${product.id}</td>
                <td>${product.name}</td>
                <td>${product.category}</td>
                <td>৳ ${product.price.toLocaleString()}</td>
                <td class="${product.stock <= 5 ? 'low-stock' : ''}">${product.stock}</td>
                <td>${product.status}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        <div class="footer">
          <p>Zerin Heritage - Admin Dashboard Report</p>
          <p>Total Products: ${filteredProducts.length}</p>
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

  return (
    <main className="min-h-screen">
      <AdminHeader 
        title="Products" 
        subtitle="Manage your product catalog"
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
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4 flex-1">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search products by name or category..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C5A059] focus:border-transparent font-sans text-sm"
                  />
                </div>
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-sans text-sm">
                  <Filter size={18} />
                  Filter
                </button>
              </div>
              
              <div className="flex items-center gap-3">
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
                <button
                  onClick={openAddModal}
                  className="flex items-center gap-2 px-6 py-2 bg-[#C5A059] text-white rounded-lg hover:bg-[#B8935A] transition-colors font-sans text-sm font-medium shadow-lg hover:shadow-xl"
                >
                  <Plus size={18} />
                  Add Product
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-sans text-sm font-semibold text-[#1A1A1A]">Product Name</th>
                    <th className="text-left py-3 px-4 font-sans text-sm font-semibold text-[#1A1A1A]">Category</th>
                    <th className="text-left py-3 px-4 font-sans text-sm font-semibold text-[#1A1A1A]">Price</th>
                    <th className="text-left py-3 px-4 font-sans text-sm font-semibold text-[#1A1A1A]">Stock</th>
                    <th className="text-left py-3 px-4 font-sans text-sm font-semibold text-[#1A1A1A]">Status</th>
                    <th className="text-right py-3 px-4 font-sans text-sm font-semibold text-[#1A1A1A]">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product) => {
                    const isLowStock = product.stock > 0 && product.stock <= 5;
                    const isOutOfStock = product.stock === 0;
                    
                    return (
                      <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                        <td className="py-4 px-4 font-sans text-sm text-[#1A1A1A]">{product.name}</td>
                        <td className="py-4 px-4 font-sans text-sm text-[#8A8A8A]">{product.category}</td>
                        <td className="py-4 px-4 font-sans text-sm text-[#1A1A1A] font-medium">৳ {product.price.toLocaleString()}</td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <span className={`font-sans text-sm font-medium ${
                              isOutOfStock ? 'text-red-600' : 
                              isLowStock ? 'text-red-600' : 
                              'text-[#8A8A8A]'
                            }`}>
                              {product.stock}
                            </span>
                            {isLowStock && (
                              <span className="inline-flex items-center gap-1 px-2 py-1 bg-red-50 text-red-600 rounded-full text-xs font-sans font-medium">
                                <AlertTriangle size={12} className="text-red-600" />
                                Low Stock
                              </span>
                            )}
                            {isOutOfStock && (
                              <span className="inline-flex items-center gap-1 px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-sans font-medium">
                                <AlertTriangle size={12} />
                                Out of Stock
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span className={`inline-block px-3 py-1 rounded-full text-xs font-sans font-medium ${
                            product.status === 'Active' 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-red-100 text-red-700'
                          }`}>
                            {product.status}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center justify-end gap-2">
                            <button 
                              onClick={() => openEditModal(product)}
                              className="p-2 text-gray-600 hover:text-[#C5A059] hover:bg-[#C5A059]/10 rounded-lg transition-colors"
                              title="Edit Product"
                            >
                              <Edit size={16} />
                            </button>
                            <button 
                              onClick={() => openDeleteConfirm(product)}
                              className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Delete Product"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200 bg-gradient-to-r from-[#FFF9F5] to-white">
              <div>
                <h2 className="text-2xl font-serif text-[#1A1A1A] mb-1">
                  {editingProduct ? 'Edit Product' : 'Add New Product'}
                </h2>
                <p className="text-sm font-sans text-[#8A8A8A]">
                  {editingProduct ? 'Update product information' : 'Fill in the details to add a new product'}
                </p>
              </div>
              <button 
                onClick={closeModal}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-white rounded-lg transition-colors"
              >
                <X size={22} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto px-6 py-6">
              <form id="productForm" onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-sans font-semibold text-[#1A1A1A] mb-2">
                    Product Name <span className="text-[#D10056]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C5A059] focus:border-transparent font-sans text-sm transition-all"
                    placeholder="e.g., Premium Silk Saree"
                  />
                </div>

                <div>
                  <label className="block text-sm font-sans font-semibold text-[#1A1A1A] mb-2">
                    Category <span className="text-[#D10056]">*</span>
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C5A059] focus:border-transparent font-sans text-sm bg-white cursor-pointer transition-all"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-sans font-semibold text-[#1A1A1A] mb-2">
                      Price (৳) <span className="text-[#D10056]">*</span>
                    </label>
                    <input
                      type="number"
                      required
                      min="0"
                      step="1"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C5A059] focus:border-transparent font-sans text-sm transition-all"
                      placeholder="12999"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-sans font-semibold text-[#1A1A1A] mb-2">
                      Stock Quantity <span className="text-[#D10056]">*</span>
                    </label>
                    <input
                      type="number"
                      required
                      min="0"
                      value={formData.stock}
                      onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C5A059] focus:border-transparent font-sans text-sm transition-all"
                      placeholder="50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-sans font-semibold text-[#1A1A1A] mb-2">
                    Product Image
                  </label>
                  
                  {imagePreview ? (
                    <div className="relative border-2 border-[#C5A059] rounded-lg p-4 bg-gradient-to-br from-[#FFF9F5] to-white">
                      <div className="flex items-start gap-4">
                        <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                          <Image
                            src={imagePreview}
                            alt="Preview"
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-sans font-medium text-[#1A1A1A] mb-1">Image Preview</p>
                          <p className="text-xs font-sans text-[#8A8A8A] mb-3">
                            {formData.imageFile ? formData.imageFile.name : 'Current image'}
                          </p>
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="text-sm font-sans text-[#C5A059] hover:text-[#B8935A] transition-colors"
                          >
                            Change Image
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setImagePreview(null);
                            setFormData({ ...formData, image: '', imageFile: null });
                            if (fileInputRef.current) fileInputRef.current.value = '';
                          }}
                          className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                        >
                          <X size={18} />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div 
                      onClick={() => fileInputRef.current?.click()}
                      className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-[#C5A059] hover:bg-[#FFF9F5] transition-all cursor-pointer"
                    >
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <ImageIcon size={28} className="text-gray-400" />
                      </div>
                      <p className="text-sm font-sans font-medium text-[#1A1A1A] mb-1">Upload Product Image</p>
                      <p className="text-xs font-sans text-[#8A8A8A] mb-1">Click to browse or drag and drop</p>
                      <p className="text-xs font-sans text-[#8A8A8A]">PNG, JPG or WEBP (max. 2MB)</p>
                    </div>
                  )}
                  
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/png,image/jpeg,image/jpg,image/webp"
                    className="hidden"
                    onChange={handleImageSelect}
                  />
                </div>

                <div className="bg-gradient-to-r from-[#FFF9F5] to-white border border-[#C5A059]/30 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle size={18} className="text-[#C5A059] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-sans font-semibold text-[#1A1A1A] mb-1">Local Storage Note</p>
                      <p className="text-xs font-sans text-[#8A8A8A] leading-relaxed">
                        Images are stored locally using URL.createObjectURL(). In production, this would upload to your server and update the database.
                      </p>
                    </div>
                  </div>
                </div>
              </form>
            </div>

            <div className="px-6 py-4 border-t border-gray-200 bg-gradient-to-r from-gray-50 to-white">
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-all font-sans text-sm font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  form="productForm"
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-[#C5A059] to-[#B8935A] text-white rounded-lg hover:from-[#B8935A] hover:to-[#A67C4A] transition-all font-sans text-sm font-medium shadow-lg hover:shadow-xl"
                >
                  {editingProduct ? 'Update Product' : 'Add Product'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showDeleteConfirm && productToDelete && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
            <div className="bg-gradient-to-r from-red-50 to-white px-6 py-5 border-b border-red-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <AlertTriangle size={24} className="text-red-600" />
                </div>
                <div>
                  <h3 className="text-xl font-serif text-[#1A1A1A] mb-1">Delete Product?</h3>
                  <p className="text-sm font-sans text-[#8A8A8A]">This action cannot be undone</p>
                </div>
              </div>
            </div>

            <div className="px-6 py-5">
              <p className="text-sm font-sans text-[#1A1A1A] mb-2">
                Are you sure you want to delete:
              </p>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <p className="font-serif text-lg font-semibold text-[#1A1A1A] mb-1">
                  {productToDelete.name}
                </p>
                <div className="flex items-center gap-4 text-sm font-sans text-[#8A8A8A]">
                  <span>{productToDelete.category}</span>
                  <span>•</span>
                  <span>৳ {productToDelete.price.toLocaleString()}</span>
                  <span>•</span>
                  <span>{productToDelete.stock} in stock</span>
                </div>
              </div>
            </div>

            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex gap-3">
              <button
                onClick={cancelDelete}
                className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-white transition-all font-sans text-sm font-medium"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 transition-all font-sans text-sm font-medium shadow-lg hover:shadow-xl"
              >
                Delete Product
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
            <button
              onClick={() => setToast(null)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
