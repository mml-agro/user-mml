import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ShoppingCart, Check, Truck, Shield, RefreshCw, Star } from 'lucide-react'
import { products } from '../data'
import { useCart } from '../context/CartContext'
import ProductCard from '../components/ProductCard'

const ProductDetailPage: React.FC = () => {
  const { id } = useParams()
  const product = products.find(p=>p.id===Number(id))
  const [size, setSize] = useState<'1L'|'5L'|'15L'>('1L')
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)
  const { addToCart } = useCart()

  if(!product) return (
    <div className="pt-32 min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl mb-4">🔍</div>
        <h2 style={{fontFamily:"'Playfair Display',serif"}} className="text-2xl font-bold mb-4">Product Not Found</h2>
        <Link to="/shop" className="btn-primary">Back to Shop</Link>
      </div>
    </div>
  )

  const related = products.filter(p=>p.id!==product.id).slice(0,3)

  const handle = () => {
    for(let i=0;i<qty;i++) addToCart(product,size)
    setAdded(true); 
  // setTimeout(()=>setAdded(false),2500)
  }

  return (
    <div className="pt-24 md:pt-36 min-h-screen bg-cream">
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        <div className="flex items-center gap-2 mb-8 font-body text-sm text-gray-500 flex-wrap">
          <Link to="/" className="hover:text-gold-600">Home</Link><span>/</span>
          <Link to="/shop" className="hover:text-gold-600">Shop</Link><span>/</span>
          <span className="text-gray-900">{product.name}</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 md:gap-16 mb-16">
          {/* Image */}
          <div className="rounded-3xl overflow-hidden" style={{backgroundColor:product.bgColor}}>
            <div className="h-72 md:h-96 flex items-center justify-center p-10">
              <div className="text-center">
                <div className="text-[150px] md:text-[190px]" style={{animation:'float 3s ease-in-out infinite'}}>{product.emoji}</div>
                <div style={{fontFamily:"'Cormorant Garamond',serif",color:product.color}} className="italic text-lg mt-3 opacity-70">{product.brand}</div>
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-col">
            {product.badge&&<span className="inline-flex w-fit px-3 py-1 rounded-full text-xs font-body font-bold text-white mb-4" style={{backgroundColor:product.color}}>{product.badge}</span>}
            <h1 style={{fontFamily:"'Playfair Display',serif"}} className="text-3xl md:text-4xl font-black text-gray-900 mb-3">{product.name}</h1>
            <div className="flex items-center gap-2 mb-5">
              <div className="flex gap-0.5">{[1,2,3,4,5].map(i=><Star key={i} size={15} fill={i<=Math.floor(product.rating)?'#f59e0b':'none'} stroke={i<=Math.floor(product.rating)?'#f59e0b':'#d1d5db'}/>)}</div>
              <span className="font-body text-sm text-gray-500">{product.rating} ({product.reviews.toLocaleString()} reviews)</span>
            </div>
            <p className="font-body text-gray-600 text-lg leading-relaxed mb-6">{product.description}</p>

            <div className="mb-6">
              <h3 style={{fontFamily:"'Playfair Display',serif"}} className="font-bold text-gray-900 mb-3">Key Features</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {product.features.map((f,i)=>(
                  <div key={i} className="flex items-center gap-2"><Check size={15} className="text-gold-600 shrink-0"/><span className="font-body text-sm text-gray-700">{f}</span></div>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h3 style={{fontFamily:"'Playfair Display',serif"}} className="font-bold text-gray-900 mb-3">Select Size</h3>
              <div className="flex gap-3 flex-wrap">
                {(['1L','5L','15L'] as const).map(s=>(
                  <button key={s} onClick={()=>setSize(s)} className={`flex flex-col items-center px-5 py-3 rounded-xl border-2 font-body transition-all ${size===s?'border-gold-500 bg-gold-50 text-gold-700':'border-gray-200 text-gray-600 hover:border-gold-300'}`}>
                    <span className="font-bold text-lg">{s}</span><span className="text-xs mt-0.5">₹{product.price[s]}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center border-2 border-gold-200 rounded-xl overflow-hidden">
                <button onClick={()=>setQty(q=>Math.max(1,q-1))} className="px-4 py-3 hover:bg-gold-50 font-bold text-xl text-gray-700">-</button>
                <span style={{fontFamily:"'Playfair Display',serif"}} className="px-4 py-3 font-bold text-gray-900 min-w-[3rem] text-center">{qty}</span>
                <button onClick={()=>setQty(q=>q+1)} className="px-4 py-3 hover:bg-gold-50 font-bold text-xl text-gray-700">+</button>
              </div>
              <button onClick={handle} className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-body font-bold text-base transition-all duration-300 ${added?'bg-green-500 text-white':'btn-primary'}`}>
                <ShoppingCart size={18}/>{added?'✓ Added to Cart!':'Add to Cart'}
              </button>
            </div>

            <div className="mb-6 p-4 bg-gold-50 rounded-xl border border-gold-200">
              <span style={{fontFamily:"'Playfair Display',serif"}} className="text-3xl font-black text-gold-700">₹{product.price[size]*qty}</span>
              <span className="font-body text-gray-500 ml-2">for {qty} × {size}</span>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[{I:Truck,l:'Free Delivery',s:'Above ₹999'},{I:Shield,l:'Quality Assured',s:'100% Pure'},{I:RefreshCw,l:'Easy Returns',s:'7 Days Policy'}].map(({I,l,s},i)=>(
                <div key={i} className="text-center p-3 rounded-xl bg-white border border-gray-100">
                  <I size={18} className="text-gold-600 mx-auto mb-1"/><div className="font-body text-xs font-semibold text-gray-900">{l}</div><div className="font-body text-xs text-gray-400">{s}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related */}
        <div>
          <h2 style={{fontFamily:"'Playfair Display',serif"}} className="text-2xl font-bold text-gray-900 mb-6">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map(p=><ProductCard key={p.id} product={p}/>)}
          </div>
        </div>
      </div>
    </div>
  )
}
export default ProductDetailPage
