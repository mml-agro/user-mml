import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ShoppingCart, Star, Heart } from 'lucide-react'
import { Product } from '../types'
import { useCart } from '../context/CartContext'


const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const [size, setSize] = useState<'1L' | '5L' | '15L'>('1L')
  const [wished, setWished] = useState(false)
  const { addToCart, items } = useCart()
  const navigate = useNavigate();

  const handle = () => {
    const token =
      sessionStorage.getItem('token');

    if (!token) {
      navigate('/login');
      return;
    }
    addToCart(product, size);
  }

  const selectedVariant = product.variants.find(
    (v) => v.size.replace("SIZE_", "") === size
  );

  const isAdded = items.some(item => item.variantId === selectedVariant?.id);

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group border border-gold-100/60 flex flex-col">
      <div className="relative">
        {product.badge && (
          <span className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-full text-xs font-body font-bold text-white">
            {product.badge}
          </span>
        )}
        <button onClick={() => setWished(!wished)} className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors">
          <Heart size={14} fill={wished ? '#ef4444' : 'none'} stroke={wished ? '#ef4444' : '#9ca3af'} />
        </button>
        <Link to={`/product/${product.id}`}>
          <div className="h-44 md:h-48 flex items-center justify-center p-6 group-hover:scale-105 transition-transform duration-300">
            <div className="text-center">
              <div className="text-7xl md:text-8xl" style={{ animation: 'float 3s ease-in-out infinite' }}>{product.emoji}</div>
              <div style={{ fontFamily: "'Cormorant Garamond',serif" }} className="text-sm italic opacity-60 mt-1">{product.brand}</div>
            </div>
          </div>
        </Link>
      </div>

      <div className="p-4 md:p-5 flex flex-col flex-1">
        <div className="flex items-center gap-1 mb-2">
          {[1, 2, 3, 4, 5].map(i => (
            <Star
              key={i}
              size={11}
              fill={i <= Math.floor(product.avgRating) ? '#f59e0b' : 'none'}
              stroke={i <= Math.floor(product.avgRating) ? '#f59e0b' : '#d1d5db'}
            />
          ))}
          <span className="text-xs text-gray-400 ml-1 font-body">
            {product?.avgRating?.toFixed(1)} ({product.reviewCount.toLocaleString()})
          </span>
        </div>

        <Link to={`/product/${product.id}`}>
          <h3 style={{ fontFamily: "'Playfair Display',serif" }} className="text-base md:text-lg font-bold text-gray-900 hover:text-gold-700 transition-colors leading-snug mb-1">
            {product.name}
          </h3>
        </Link>
        <p className="font-body text-gray-500 text-sm mb-3 line-clamp-2">{product.shortDesc}</p>

        <div className="flex gap-1.5 mb-4 mt-auto">
          {(['1L', '5L', '15L'] as const).map(s => (
            <button
              key={s}
              onClick={() => setSize(s)}
              className={`flex-1 py-1.5 rounded-lg text-xs font-body font-semibold border-2 transition-all ${
                size === s ? 'border-gold-500 bg-gold-50 text-gold-700' : 'border-gray-200 text-gray-500 hover:border-gold-300'
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between gap-2">
          <div>
            <span style={{ fontFamily: "'Playfair Display',serif" }} className="text-xl font-bold text-gray-900">
              ₹{selectedVariant?.price}
            </span>
            <span className="text-xs text-gray-400 ml-1 font-body">
              /{size.replace("SIZE_", "")}
            </span>
          </div>
          <button
            onClick={handle}
            className={`flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-sm font-body font-semibold transition-all duration-300 ${
              isAdded ? 'bg-green-500 text-white scale-95' : 'bg-gold-600 hover:bg-gold-700 text-white hover:shadow-md active:scale-95'
            }`}
          >
            <ShoppingCart size={14} />{isAdded ? 'Added!' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  )
}
export default ProductCard;