# MML Agro Foods - eCommerce Website

A fully responsive eCommerce website for MML Agro Foods built with React + TypeScript + Tailwind CSS.

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
src/
├── components/
│   ├── Navbar.tsx        # Responsive navbar with search, cart, user menu
│   ├── Footer.tsx        # Full footer with links, contact, CTA
│   ├── ProductCard.tsx   # Product card with size selector & add to cart
│   └── ScrollToTop.tsx   # Auto scroll to top on route change
├── context/
│   ├── CartContext.tsx   # Global cart state management
│   └── AuthContext.tsx   # Global auth state management
├── pages/
│   ├── HomePage.tsx      # Landing page with hero, products, FAQs
│   ├── ShopPage.tsx      # Product listing with filters & search
│   ├── ProductDetailPage.tsx  # Single product page
│   ├── CartPage.tsx      # Shopping cart
│   ├── CheckoutPage.tsx  # Multi-step checkout
│   ├── LoginPage.tsx     # Login & Register
│   ├── AboutPage.tsx     # About us, mission, team
│   ├── BlogPage.tsx      # Blog listing & detail
│   ├── BulkOrdersPage.tsx # Bulk order enquiry
│   ├── ContactPage.tsx   # Contact form
│   ├── AccountPage.tsx   # User profile, orders, addresses
│   ├── WishlistPage.tsx  # Saved products
│   └── PolicyPages.tsx   # Privacy, Terms, Shipping, Returns
├── data.ts               # All mock data (products, blogs, testimonials)
├── types.ts              # TypeScript interfaces
├── App.tsx               # Router and layout
├── main.tsx              # Entry point
└── index.css             # Global styles + Tailwind

```

## 🎨 Features

- ✅ Fully responsive (mobile, tablet, desktop)
- ✅ Product listing with category filters & search
- ✅ Size selector (1L / 5L / 15L) with dynamic pricing
- ✅ Shopping cart with quantity management
- ✅ Multi-step checkout with address & payment
- ✅ User auth (login / register / profile)
- ✅ Account page with orders, addresses, payments
- ✅ Wishlist functionality
- ✅ Blog with category filter
- ✅ Bulk orders enquiry form
- ✅ Contact form
- ✅ FAQ accordion
- ✅ All policy pages
- ✅ Mobile hamburger menu
- ✅ Search overlay
- ✅ Sticky navbar with scroll detection
- ✅ Toast/confirmation feedback on cart actions
- ✅ Testimonials section
- ✅ Smooth animations & hover effects

## 🛠️ Tech Stack

- **React 18** + **TypeScript**
- **Tailwind CSS v3**
- **React Router DOM v7**
- **Lucide React** (icons)
- **Vite** (build tool)

## 📦 All Mock Data

All data is mock/dummy and defined in `src/data.ts`:
- 6 products (MML Gold, Sunnova, Karthigai Jothi, etc.)
- 6 blog posts
- 6 testimonials
- 4 team members
- 6 FAQs
- 4 mock orders

## 🌐 Pages / Routes

| Route | Page |
|-------|------|
| `/` | Home |
| `/shop` | Shop / Product Listing |
| `/product/:id` | Product Detail |
| `/cart` | Shopping Cart |
| `/checkout` | Checkout |
| `/login` | Login / Register |
| `/about` | About Us |
| `/bulk-orders` | Bulk Orders |
| `/contact` | Contact |
| `/blog` | Blog |
| `/blog/:id` | Blog Detail |
| `/account` | My Account |
| `/wishlist` | Wishlist |
| `/privacy` | Privacy Policy |
| `/terms` | Terms & Conditions |
| `/shipping` | Shipping Policy |
| `/returns` | Return Policy |
# user-mml
