import React from 'react'
import { Link } from 'react-router-dom'
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react'
import { useCart } from '../context/CartContext'

const CartPage: React.FC = () => {
  const { items, removeFromCart, updateQty, totalItems, totalPrice } = useCart()

  if(items.length===0) return (
    <div className="pt-36 min-h-screen bg-cream flex items-center justify-center px-4">
      <div className="text-center">
        <div className="text-7xl mb-6">🛒</div>
        <h2 style={{fontFamily:"'Playfair Display',serif"}} className="text-3xl font-bold text-gray-900 mb-3">Your cart is empty</h2>
        <p className="font-body text-gray-500 mb-8">Discover our premium cooking oils and add them to your cart</p>
        <Link to="/shop" className="btn-primary text-base px-8 py-4"><ShoppingBag size={18}/>Start Shopping</Link>
      </div>
    </div>
  )

  const delivery = totalPrice>=999?0:50
  const total = totalPrice+delivery

  return (
    <div className="pt-24 md:pt-36 min-h-screen bg-cream">
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        <h1 style={{fontFamily:"'Playfair Display',serif"}} className="text-3xl md:text-4xl font-black text-gray-900 mb-8">My Cart <span className="text-gold-600">({totalItems} items)</span></h1>
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {items.map(item=>(
              <div key={`${item.product.id}-${item.size}`} className="bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-gold-100 flex gap-4 md:gap-6">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-xl flex items-center justify-center shrink-0 text-4xl md:text-5xl" style={{backgroundColor:item.product.bgColor}}>{item.product.emoji}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between gap-2">
                    <div>
                      <Link to={`/product/${item.product.id}`} style={{fontFamily:"'Playfair Display',serif"}} className="font-bold text-gray-900 hover:text-gold-700 transition-colors text-sm md:text-base line-clamp-2">{item.product.name}</Link>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="px-2 py-0.5 rounded-full bg-gold-100 text-gold-700 text-xs font-body font-semibold">{item.size}</span>
                        <span className="text-xs text-gray-400 font-body">{item.product.brand}</span>
                      </div>
                    </div>
                    <button onClick={()=>removeFromCart(item.product.id,item.size)} className="text-gray-400 hover:text-red-500 transition-colors p-1 shrink-0"><Trash2 size={17}/></button>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center border-2 border-gold-200 rounded-xl overflow-hidden">
                      <button onClick={()=>updateQty(item.product.id,item.size,item.quantity-1)} className="px-3 py-2 hover:bg-gold-50 text-gray-700"><Minus size={13}/></button>
                      <span style={{fontFamily:"'Playfair Display',serif"}} className="px-3 py-2 font-bold text-gray-900 text-sm min-w-[2rem] text-center">{item.quantity}</span>
                      <button onClick={()=>updateQty(item.product.id,item.size,item.quantity+1)} className="px-3 py-2 hover:bg-gold-50 text-gray-700"><Plus size={13}/></button>
                    </div>
                    <span style={{fontFamily:"'Playfair Display',serif"}} className="font-bold text-lg text-gray-900">₹{item.product.price[item.size]*item.quantity}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gold-100 sticky top-28">
              <h2 style={{fontFamily:"'Playfair Display',serif"}} className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
              <div className="space-y-3 mb-4">
                <div className="flex justify-between font-body text-gray-600"><span>Subtotal</span><span>₹{totalPrice}</span></div>
                <div className="flex justify-between font-body text-gray-600"><span>Delivery</span><span className={delivery===0?'text-green-600 font-semibold':''}>{delivery===0?'FREE':`₹${delivery}`}</span></div>
                {delivery>0&&<p className="text-xs text-gray-400 font-body">Add ₹{999-totalPrice} more for free delivery</p>}
              </div>
              <div className="border-t-2 border-gold-100 pt-4 mb-6">
                <div className="flex justify-between font-bold text-xl text-gray-900" style={{fontFamily:"'Playfair Display',serif"}}><span>Total</span><span className="text-gold-700">₹{total}</span></div>
              </div>
              <div className="flex gap-2 mb-5">
                <input type="text" placeholder="Promo code" className="input-field flex-1 text-sm py-2.5"/>
                <button className="px-4 py-2.5 rounded-xl bg-gold-100 text-gold-700 font-body font-semibold text-sm hover:bg-gold-200 transition-colors">Apply</button>
              </div>
              <Link to="/checkout" className="btn-primary w-full py-4 text-base">Proceed to Checkout <ArrowRight size={18}/></Link>
              <Link to="/shop" className="mt-3 block text-center font-body text-sm text-gold-600 hover:text-gold-800">← Continue Shopping</Link>
              <div className="mt-5 pt-4 border-t border-gray-100 flex justify-center gap-4">
                <span className="font-body text-xs text-gray-400">🔒 Secure Checkout</span>
                <span className="font-body text-xs text-gray-400">🚚 Fast Delivery</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default CartPage
