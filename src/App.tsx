import React from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'

import HomePage from './pages/HomePage'
import ShopPage from './pages/ShopPage'
import ProductDetailPage from './pages/ProductDetailPage'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import LoginPage from './pages/LoginPage'
import AboutPage from './pages/AboutPage'
import BulkOrdersPage from './pages/BulkOrdersPage'
import ContactPage from './pages/ContactPage'
import BlogPage from './pages/BlogPage'
import AccountPage from './pages/AccountPage'
import OrdersPage from './pages/OrdersPage'
import WishlistPage from './pages/WishlistPage'
import { PrivacyPage, TermsPage, ShippingPage, ReturnsPage } from './pages/PolicyPage'

const NotFound: React.FC = () => (
  <div className="pt-36 min-h-screen bg-cream flex items-center justify-center text-center px-4">
    <div>
      <div className="text-8xl mb-4">🌻</div>
      <h1 style={{fontFamily:"'Playfair Display',serif"}} className="text-4xl font-black text-gray-900 mb-4">Page Not Found</h1>
      <p className="font-body text-gray-500 mb-6">The page you're looking for doesn't exist.</p>
      <a href="/" className="btn-primary inline-flex">Go Home</a>
    </div>
  </div>
)

const Layout: React.FC<{children:React.ReactNode}> = ({children}) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar/>
      <main className="flex-1">{children}</main>
      <Footer/>
    </div>
  )
}

const App: React.FC = () => (
  <BrowserRouter>
    <AuthProvider>
      <CartProvider>
        <ScrollToTop/>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/shop" element={<ShopPage/>}/>
            <Route path="/product/:id" element={<ProductDetailPage/>}/>
            <Route path="/cart" element={<CartPage/>}/>
            <Route path="/checkout" element={<CheckoutPage/>}/>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/about" element={<AboutPage/>}/>
            <Route path="/bulk-orders" element={<BulkOrdersPage/>}/>
            <Route path="/contact" element={<ContactPage/>}/>
            <Route path="/blog" element={<BlogPage/>}/>
            <Route path="/blog/:id" element={<BlogPage/>}/>
            <Route path="/account" element={<AccountPage/>}/>
            <Route path="/orders" element={<OrdersPage/>}/>
            <Route path="/wishlist" element={<WishlistPage/>}/>
            <Route path="/privacy" element={<PrivacyPage/>}/>
            <Route path="/terms" element={<TermsPage/>}/>
            <Route path="/shipping" element={<ShippingPage/>}/>
            <Route path="/returns" element={<ReturnsPage/>}/>
            <Route path="*" element={<NotFound/>}/>
          </Routes>
        </Layout>
      </CartProvider>
    </AuthProvider>
  </BrowserRouter>
)

export default App
