import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Heart, ShoppingCart } from 'lucide-react'
// import { products } from '../data'
import { useCart } from '../context/CartContext'
import { useProducts } from '../context/ProductContext'

const WishlistPage: React.FC = () => {
  const { products, loading, loadMoreProducts } = useProducts();
  const [wishlist, setWishlist] = useState(products.slice(0, 2))
  const { addToCart } = useCart()

  return (
    <div className="pt-24 md:pt-36 min-h-screen bg-cream">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h1 style={{ fontFamily: "'Playfair Display',serif" }} className="text-3xl font-black text-gray-900">My Wishlist <span className="text-gold-600">({wishlist.length})</span></h1>
          <Link to="/shop" className="font-body text-sm text-gold-600 hover:text-gold-800">+ Add More</Link>
        </div>
        {wishlist.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">❤️</div>
            <h3 style={{ fontFamily: "'Playfair Display',serif" }} className="text-xl font-bold text-gray-900 mb-2">Your wishlist is empty</h3>
            <p className="font-body text-gray-500 mb-6">Save products you love to buy them later</p>
            <Link to="/shop" className="btn-primary">Explore Products</Link>
          </div>
        ) : (
          <div className="space-y-4">
            {wishlist.map(p => (
              <div key={p.id} className="bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-gold-100 flex gap-4 md:gap-6 items-center">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl flex items-center justify-center shrink-0 text-4xl" style={{ backgroundColor: p.bgColor }}>{p.emoji}</div>
                <div className="flex-1 min-w-0">
                  <Link to={`/product/${p.id}`} style={{ fontFamily: "'Playfair Display',serif" }} className="font-bold text-gray-900 hover:text-gold-700 transition-colors">{p.name}</Link>
                  <p className="font-body text-sm text-gray-500 mt-0.5">{p.shortDesc}</p>
                  <p style={{ fontFamily: "'Playfair Display',serif" }} className="text-xl font-bold text-gold-700 mt-2">₹{p.price['1L']} <span className="text-sm text-gray-400 font-body font-normal">/1L</span></p>
                </div>
                <div className="flex flex-col gap-2 shrink-0">
                  <button onClick={() => addToCart(p, '1L')} className="btn-primary text-xs px-3 py-2"><ShoppingCart size={13} />Add to Cart</button>
                  <button onClick={() => setWishlist(w => w.filter(x => x.id !== p.id))} className="flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-body text-red-500 hover:bg-red-50 transition-colors border border-red-200"><Heart size={13} fill="#ef4444" />Remove</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
export default WishlistPage
