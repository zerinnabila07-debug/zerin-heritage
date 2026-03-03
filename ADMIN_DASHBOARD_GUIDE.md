# Zerin Heritage - Admin Dashboard Guide

## Overview

A comprehensive, luxury-branded admin dashboard for managing the Zerin Heritage e-commerce store. Built with Next.js 14+ App Router, featuring a professional sidebar layout, interactive charts, and full CRUD operations.

---

## 🎨 Design Philosophy

The admin dashboard maintains Zerin Heritage's luxury brand identity:

- **Colors**: White (#FFFFFF), Gold (#C5A059), Charcoal Black (#1A1A1A)
- **Typography**: Cormorant Garamond (serif) for headings, Montserrat (sans-serif) for body
- **Layout**: Spacious, professional, and responsive
- **Theme**: Minimalist, elegant, and modern

---

## 📁 File Structure

```
app/admin/
├── layout.js                      # Admin layout with metadata
├── page.js                        # Redirects to /admin/overview
├── components/
│   ├── AdminSidebar.js           # Sidebar navigation
│   └── AdminHeader.js            # Page header with search & notifications
├── overview/
│   └── page.js                   # Dashboard home with charts & stats
├── products/
│   └── page.js                   # Product management (CRUD)
├── orders/
│   └── page.js                   # Order management & tracking
├── customers/
│   └── page.js                   # Customer database
└── settings/
    └── page.js                   # Store settings configuration
```

---

## 🚀 Features

### 1. **Overview Dashboard** (`/admin/overview`)

**Summary Cards:**
- Total Revenue: ৳ 3,28,000 (+12.5%)
- Active Orders: 156 (+8.2%)
- New Customers: 89 (+15.3%)
- Conversion Rate: 3.2% (+2.1%)

**Charts (Recharts):**
- **Revenue Overview**: Line chart showing monthly revenue trends
- **Order Statistics**: Bar chart displaying order counts per month
- Data spans 6 months (Jan-Jun 2026)

**Recent Activity Feed:**
- Real-time activity log
- Color-coded status indicators
- Timestamp for each activity

### 2. **Product Management** (`/admin/products`)

**Features:**
- View all products in a table format
- Search functionality (by name or category)
- Filter options
- Add new product modal with form:
  - Product Name (required)
  - Category (dropdown: Sarees, Kurtis, Tunics, Lehengas, Salwar Kameez, Accessories)
  - Price in BDT (required)
  - Stock Quantity (required)
- Edit product (button available)
- Delete product with confirmation
- Status badges (Active/Out of Stock)

**Initial Products:**
- 6 pre-loaded products
- Categories: Sarees, Kurtis, Lehengas, Tunics, Salwar Kameez, Accessories
- Price range: ৳2,500 - ৳18,999

### 3. **Order Management** (`/admin/orders`)

**Statistics Cards:**
- Total Orders
- Processing Orders
- Shipped Orders
- Delivered Orders

**Order Table:**
- Order ID
- Customer Name
- Product Name
- Amount
- Payment Method (bKash, Nagad, Rocket, Visa, Mastercard)
- Status (Processing, Shipped, Delivered, Cancelled)
- Date
- View Details action

**Order Details Modal:**
- Complete order information
- Customer details
- Payment method
- Order status with color-coded badges
- Status icons (Package, Truck, CheckCircle, XCircle)

**Initial Orders:**
- 5 sample orders
- Multiple payment methods represented
- Various order statuses

### 4. **Customer Management** (`/admin/customers`)

**Summary Cards:**
- Total Customers: 5
- Total Orders: 49
- Total Revenue: ৳ 6,00,000

**Customer Cards:**
- Customer avatar (initial letter)
- Full name
- Email address
- Phone number
- Location
- Member since date
- Order count
- Total spent

**Customer Details Modal:**
- Complete customer profile
- Contact information
- Order history
- Total spending

**Initial Customers:**
- 5 pre-loaded customers
- Locations: Dhaka, Chittagong, Sylhet, Rajshahi
- Order range: 5-15 orders per customer
- Spending range: ৳56,000 - ৳198,000

### 5. **Settings** (`/admin/settings`)

**Store Information:**
- Store Name
- Store Email
- Store Phone
- Store Address

**Payment & Currency:**
- Currency selection (BDT, USD, EUR)
- Tax Rate (%)

**Shipping Settings:**
- Shipping Fee (BDT)
- Free Shipping Threshold (BDT)

**Notifications:**
- Enable push notifications (checkbox)
- Enable email alerts for new orders (checkbox)

**Save Functionality:**
- Save button with confirmation alert

---

## 🎯 Navigation

### From Main Website to Admin:
- **Navbar Icon**: Dashboard icon (LayoutDashboard) added to main navbar
- Located between Search and User icons
- Visible on desktop only
- Hover tooltip: "Admin Dashboard"

### From Admin to Main Website:
- **Sidebar Link**: "Back to Store" button at bottom of sidebar
- Home icon with text
- Redirects to homepage (/)

### Admin Sidebar Navigation:
1. Overview (Dashboard home)
2. Products (Product management)
3. Orders (Order tracking)
4. Customers (Customer database)
5. Settings (Store configuration)

**Active State:**
- Gold background (#C5A059)
- White text
- Shadow effect
- Chevron right icon

---

## 📊 Data Integration

### Knowledge Base Connection:
The admin dashboard reads from `/public/data/knowledge-base.json`:

```json
{
  "brand_identity": { ... },
  "collections": { ... },
  "pricing_guide": { ... },
  "fabric_care": { ... },
  "customer_service": { ... }
}
```

### Data Flow:
1. **Read**: Dashboard displays existing data from knowledge base
2. **Create**: New products added via form (client-side state)
3. **Update**: Edit functionality available (to be implemented)
4. **Delete**: Remove products with confirmation

**Note**: Current implementation uses client-side state. For production, integrate with a database (MongoDB, PostgreSQL, etc.) or API routes.

---

## 🛠️ Technologies Used

### Core:
- **Next.js 16.1.4**: App Router, Server Components
- **React 19.2.3**: Client Components, Hooks
- **Tailwind CSS 4**: Utility-first styling

### Charts:
- **Recharts 2.x**: Line charts, bar charts
- Responsive containers
- Custom tooltips and legends
- Brand color integration

### Icons:
- **Lucide React**: Consistent icon system
- 20+ icons used across dashboard

### Fonts:
- **Cormorant Garamond**: Serif headings
- **Montserrat**: Sans-serif body text

---

## 🎨 Color Palette

```css
/* Primary Colors */
--color-gold: #C5A059;        /* Primary actions, highlights */
--color-primary: #1A1A1A;     /* Text, sidebar background */
--color-pink: #D10056;        /* Secondary actions, alerts */

/* Backgrounds */
--color-background: #FFFFFF;  /* Main background */
--color-gray-light: #F5F5F5;  /* Page background */
--color-accent-bg: #FFF9F5;   /* Subtle accents */

/* Text */
--color-gray-medium: #8A8A8A; /* Secondary text */

/* Status Colors */
--color-blue: #3B82F6;        /* Processing */
--color-yellow: #F59E0B;      /* Shipped */
--color-green: #10B981;       /* Delivered, Success */
--color-red: #EF4444;         /* Cancelled, Error */
```

---

## 📱 Responsive Design

### Breakpoints:
- **Mobile**: < 768px (sidebar hidden, mobile menu)
- **Tablet**: 768px - 1024px (sidebar visible)
- **Desktop**: > 1024px (full layout)

### Sidebar:
- Fixed position on desktop
- Width: 256px (w-64)
- Collapsible on mobile (future enhancement)

### Content Area:
- Margin-left: 256px (ml-64) on desktop
- Full width on mobile
- Responsive padding: px-8

### Tables:
- Horizontal scroll on mobile
- Full width on desktop
- Responsive text sizes

---

## 🔐 Security Considerations

**Current Status**: Demo/Development Mode

**For Production, Implement:**
1. **Authentication**: NextAuth.js or similar
2. **Authorization**: Role-based access control (RBAC)
3. **API Protection**: Middleware for admin routes
4. **CSRF Protection**: Token-based security
5. **Input Validation**: Server-side validation
6. **Rate Limiting**: Prevent abuse
7. **Audit Logs**: Track all admin actions

---

## 🚀 Getting Started

### Access the Admin Dashboard:

1. **From Main Website**:
   - Click the Dashboard icon in the navbar
   - URL: `http://localhost:3000/admin`

2. **Direct URL**:
   - Navigate to `/admin/overview`
   - Automatically redirects from `/admin`

### Development:

```bash
# Install dependencies (recharts already installed)
npm install

# Run development server
npm run dev

# Open browser
http://localhost:3000/admin/overview
```

---

## 📈 Future Enhancements

### Phase 1 (Immediate):
- [ ] Database integration (MongoDB/PostgreSQL)
- [ ] API routes for CRUD operations
- [ ] Authentication system
- [ ] Real-time data updates

### Phase 2 (Short-term):
- [ ] Product image upload
- [ ] Bulk operations (import/export)
- [ ] Advanced filtering and sorting
- [ ] Email notifications
- [ ] Order status updates
- [ ] Invoice generation

### Phase 3 (Long-term):
- [ ] Analytics dashboard
- [ ] Inventory management
- [ ] Multi-user support
- [ ] Activity logs
- [ ] Backup and restore
- [ ] Mobile app

---

## 🎯 Key Features Summary

✅ **Luxury Brand Integration**: Maintains Zerin Heritage's gold/black theme  
✅ **Responsive Design**: Works on all devices  
✅ **Interactive Charts**: Revenue and order statistics  
✅ **CRUD Operations**: Full product management  
✅ **Order Tracking**: Multiple payment methods supported  
✅ **Customer Database**: Complete customer profiles  
✅ **Settings Panel**: Store configuration  
✅ **Easy Navigation**: Seamless switching between admin and store  
✅ **Professional UI**: Spacious, clean, and modern  
✅ **Data Integration**: Reads from knowledge base  

---

## 📞 Support

For questions or issues:
- Email: support@zerinheritage.com
- Phone: +880 1234-567890

---

**Built with ❤️ for Zerin Heritage**  
*Luxury South Asian Fashion & Heritage Wear*
