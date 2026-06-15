// import React from 'react'
// import { Link } from 'react-router-dom'
// import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react'
// import { useCart } from '../context/CartContext'

// const formatSize = (size: string) =>
//   size.replace('SIZE_', '').toUpperCase()

// const CartPage: React.FC = () => {
//   const { items, removeFromCart, updateQty, totalItems, totalPrice } = useCart()

//   if (items.length === 0) return (
//     <div className="pt-36 min-h-screen bg-cream flex items-center justify-center px-4">
//       <div className="text-center">
//         <div className="text-7xl mb-6">🛒</div>
//         <h2 style={{ fontFamily: "'Playfair Display',serif" }} className="text-3xl font-bold text-gray-900 mb-3">
//           Your cart is empty
//         </h2>
//         <p className="font-body text-gray-500 mb-8">
//           Discover our premium cooking oils and add them to your cart
//         </p>
//         <Link to="/shop" className="btn-primary text-base px-8 py-4">
//           <ShoppingBag size={18} /> Start Shopping
//         </Link>
//       </div>
//     </div>
//   )

//   const delivery = totalPrice >= 999 ? 0 : 50
//   const total = totalPrice + delivery

//   return (
//     <div className="pt-24 md:pt-36 min-h-screen bg-cream">
//       <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
//         <h1
//           style={{ fontFamily: "'Playfair Display',serif" }}
//           className="text-3xl md:text-4xl font-black text-gray-900 mb-8"
//         >
//           My Cart <span className="text-gold-600">({totalItems} {totalItems === 1 ? 'item' : 'items'})</span>
//         </h1>

//         <div className="grid lg:grid-cols-3 gap-8">

//           {/* Cart Items */}
//           <div className="lg:col-span-2 space-y-4">
//             {items.map(item => (
//               <div
//                 key={item.id}
//                 className="bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-gold-100 flex gap-4 md:gap-6"
//               >
//                 <div className="w-20 h-20 md:w-24 md:h-24 rounded-xl bg-gold-50 flex items-center justify-center shrink-0 text-4xl md:text-5xl">
//                   {item.productEmoji}
//                 </div>

//                 <div className="flex-1 min-w-0">
//                   <div className="flex justify-between gap-2">
//                     <div>
//                       <span
//                         style={{ fontFamily: "'Playfair Display',serif" }}
//                         className="font-bold text-gray-900 text-sm md:text-base line-clamp-2 block"
//                       >
//                         {item.productName}
//                       </span>
//                       <div className="flex items-center gap-2 mt-1">
//                         <span className="px-2 py-0.5 rounded-full bg-gold-100 text-gold-700 text-xs font-body font-semibold">
//                           {formatSize(item.size)}
//                         </span>
//                         <span className="text-xs text-gray-400 font-body">
//                           ₹{item.price} / unit
//                         </span>
//                       </div>
//                     </div>
//                     <button
//                       onClick={() => removeFromCart(item.id)}
//                       className="text-gray-400 hover:text-red-500 transition-colors p-1 shrink-0"
//                       aria-label={`Remove ${item.productName}`}
//                     >
//                       <Trash2 size={17} />
//                     </button>
//                   </div>

//                   <div className="flex items-center justify-between mt-4">
//                     <div className="flex items-center border-2 border-gold-200 rounded-xl overflow-hidden">
//                       <button
//                         onClick={() => updateQty(item.id, item.quantity - 1)}
//                         className="px-3 py-2 hover:bg-gold-50 text-gray-700 disabled:opacity-40"
//                         disabled={item.quantity <= 1}
//                         aria-label="Decrease quantity"
//                       >
//                         <Minus size={13} />
//                       </button>
//                       <span
//                         style={{ fontFamily: "'Playfair Display',serif" }}
//                         className="px-3 py-2 font-bold text-gray-900 text-sm min-w-[2rem] text-center"
//                       >
//                         {item.quantity}
//                       </span>
//                       <button
//                         onClick={() => updateQty(item.id, item.quantity + 1)}
//                         className="px-3 py-2 hover:bg-gold-50 text-gray-700"
//                         aria-label="Increase quantity"
//                       >
//                         <Plus size={13} />
//                       </button>
//                     </div>
//                     <span
//                       style={{ fontFamily: "'Playfair Display',serif" }}
//                       className="font-bold text-lg text-gray-900"
//                     >
//                       ₹{item.totalPrice}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Order Summary */}
//           <div>
//             <div className="bg-white rounded-2xl p-6 shadow-sm border border-gold-100 sticky top-28">
//               <h2
//                 style={{ fontFamily: "'Playfair Display',serif" }}
//                 className="text-xl font-bold text-gray-900 mb-6"
//               >
//                 Order Summary
//               </h2>

//               <div className="space-y-3 mb-4">
//                 <div className="flex justify-between font-body text-gray-600">
//                   <span>Subtotal</span>
//                   <span>₹{totalPrice}</span>
//                 </div>
//                 <div className="flex justify-between font-body text-gray-600">
//                   <span>Delivery</span>
//                   <span className={delivery === 0 ? 'text-green-600 font-semibold' : ''}>
//                     {delivery === 0 ? 'FREE' : `₹${delivery}`}
//                   </span>
//                 </div>
//                 {delivery === 0 && (
//                   <p className="text-xs text-green-600 font-body">🎉 You qualify for free delivery!</p>
//                 )}
//                 {delivery > 0 && (
//                   <p className="text-xs text-gray-400 font-body">
//                     Add ₹{999 - totalPrice} more for free delivery
//                   </p>
//                 )}
//               </div>

//               <div className="border-t-2 border-gold-100 pt-4 mb-6">
//                 <div
//                   className="flex justify-between font-bold text-xl text-gray-900"
//                   style={{ fontFamily: "'Playfair Display',serif" }}
//                 >
//                   <span>Total</span>
//                   <span className="text-gold-700">₹{total}</span>
//                 </div>
//               </div>

//               <div className="flex gap-2 mb-5">
//                 <input
//                   type="text"
//                   placeholder="Promo code"
//                   className="input-field flex-1 text-sm py-2.5"
//                 />
//                 <button className="px-4 py-2.5 rounded-xl bg-gold-100 text-gold-700 font-body font-semibold text-sm hover:bg-gold-200 transition-colors">
//                   Apply
//                 </button>
//               </div>

//               <Link to="/checkout" className="btn-primary w-full py-4 text-base">
//                 Proceed to Checkout <ArrowRight size={18} />
//               </Link>

//               <Link to="/shop" className="mt-3 block text-center font-body text-sm text-gold-600 hover:text-gold-800">
//                 ← Continue Shopping
//               </Link>

//               <div className="mt-5 pt-4 border-t border-gray-100 flex justify-center gap-4">
//                 <span className="font-body text-xs text-gray-400">🔒 Secure Checkout</span>
//                 <span className="font-body text-xs text-gray-400">🚚 Fast Delivery</span>
//               </div>
//             </div>
//           </div>

//         </div>
//       </div>
//     </div>
//   )
// }

// export default CartPage






// import React, { useState } from 'react'
// import { Link } from 'react-router-dom'
// import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag, X, ChevronRight, CheckCircle2, AlertCircle } from 'lucide-react'
// import { useCart } from '../context/CartContext'
// import { getCouponsAPI, getValidateAPI } from '../service'

// const formatSize = (size: string) => size.replace('SIZE_', '').toUpperCase()

// interface Coupon {
//   id: number
//   code: string
//   description: string
//   type: 'PERCENTAGE' | 'FLAT'
//   value: number
//   minOrderValue: number
//   maxDiscount: number | null
//   status: 'ACTIVE' | 'EXPIRED'
//   expiresAt: string
// }

// const CartPage: React.FC = () => {
//   const { items, removeFromCart, updateQty, totalItems, totalPrice } = useCart()

//   const [couponInput, setCouponInput] = useState('')
//   const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null)
//   const [discount, setDiscount] = useState(0)
//   const [couponError, setCouponError] = useState('')
//   const [couponSuccess, setCouponSuccess] = useState('')
//   const [validating, setValidating] = useState(false)

//   const [showModal, setShowModal] = useState(false)
//   const [coupons, setCoupons] = useState<Coupon[]>([])
//   const [loadingCoupons, setLoadingCoupons] = useState(false)

//   const delivery = totalPrice >= 999 ? 0 : 50
//   const total = totalPrice + delivery - discount

//   const openCouponModal = async () => {
//     setShowModal(true)
//     if (coupons.length > 0) return
//     setLoadingCoupons(true)
//     try {
//       const res = await getCouponsAPI()
//       setCoupons(res.data)
//     } catch {
//       // fail silently
//     } finally {
//       setLoadingCoupons(false)
//     }
//   }

//   const validateCoupon = async (code: string) => {
//     const trimmed = code.trim().toUpperCase()
//     if (!trimmed) return

//     setCouponError('')
//     setCouponSuccess('')
//     setValidating(true)

//     try {
//       const res = await getValidateAPI({ code: trimmed, orderAmount: totalPrice })
//       const { success, message, data } = res.data

//       if (success) {
//         setDiscount(data)
//         setAppliedCoupon(trimmed)
//         setCouponInput(trimmed)
//         setCouponSuccess(message)
//         setShowModal(false)
//       } else {
//         setCouponError(message)
//         setDiscount(0)
//         setAppliedCoupon(null)
//       }
//     } catch (err: any) {
//       const msg = err?.response?.data?.message || 'Invalid or expired coupon'
//       setCouponError(msg)
//       setDiscount(0)
//       setAppliedCoupon(null)
//     } finally {
//       setValidating(false)
//     }
//   }

//   const removeCoupon = () => {
//     setAppliedCoupon(null)
//     setDiscount(0)
//     setCouponInput('')
//     setCouponSuccess('')
//     setCouponError('')
//   }

//   if (items.length === 0) return (
//     <div className="pt-36 min-h-screen bg-cream flex items-center justify-center px-4">
//       <div className="text-center">
//         <div className="text-7xl mb-6">🛒</div>
//         <h2 style={{ fontFamily: "'Playfair Display',serif" }} className="text-3xl font-bold text-gray-900 mb-3">
//           Your cart is empty
//         </h2>
//         <p className="font-body text-gray-500 mb-8">
//           Discover our premium cooking oils and add them to your cart
//         </p>
//         <Link to="/shop" className="btn-primary text-base px-8 py-4">
//           <ShoppingBag size={18} /> Start Shopping
//         </Link>
//       </div>
//     </div>
//   )

//   return (
//     <div className="pt-24 md:pt-36 min-h-screen bg-cream">
//       <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
//         <h1
//           style={{ fontFamily: "'Playfair Display',serif" }}
//           className="text-3xl md:text-4xl font-black text-gray-900 mb-8"
//         >
//           My Cart <span className="text-gold-600">({totalItems} {totalItems === 1 ? 'item' : 'items'})</span>
//         </h1>

//         <div className="grid lg:grid-cols-3 gap-8">

//           {/* ── Cart Items ── */}
//           <div className="lg:col-span-2 space-y-4">
//             {items.map(item => (
//               <div
//                 key={item.id}
//                 className="bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-gold-100 flex gap-4 md:gap-6"
//               >
//                 <div className="w-20 h-20 md:w-24 md:h-24 rounded-xl bg-gold-50 flex items-center justify-center shrink-0 text-4xl md:text-5xl">
//                   {item.productEmoji}
//                 </div>

//                 <div className="flex-1 min-w-0">
//                   <div className="flex justify-between gap-2">
//                     <div>
//                       <span
//                         style={{ fontFamily: "'Playfair Display',serif" }}
//                         className="font-bold text-gray-900 text-sm md:text-base line-clamp-2 block"
//                       >
//                         {item.productName}
//                       </span>
//                       <div className="flex items-center gap-2 mt-1">
//                         <span className="px-2 py-0.5 rounded-full bg-gold-100 text-gold-700 text-xs font-body font-semibold">
//                           {formatSize(item.size)}
//                         </span>
//                         <span className="text-xs text-gray-400 font-body">
//                           ₹{item.price} / unit
//                         </span>
//                       </div>
//                     </div>
//                     <button
//                       onClick={() => removeFromCart(item.id)}
//                       className="text-gray-400 hover:text-red-500 transition-colors p-1 shrink-0"
//                       aria-label={`Remove ${item.productName}`}
//                     >
//                       <Trash2 size={17} />
//                     </button>
//                   </div>

//                   <div className="flex items-center justify-between mt-4">
//                     <div className="flex items-center border-2 border-gold-200 rounded-xl overflow-hidden">
//                       <button
//                         onClick={() => updateQty(item.id, item.quantity - 1)}
//                         className="px-3 py-2 hover:bg-gold-50 text-gray-700 disabled:opacity-40"
//                         disabled={item.quantity <= 1}
//                         aria-label="Decrease quantity"
//                       >
//                         <Minus size={13} />
//                       </button>
//                       <span
//                         style={{ fontFamily: "'Playfair Display',serif" }}
//                         className="px-3 py-2 font-bold text-gray-900 text-sm min-w-[2rem] text-center"
//                       >
//                         {item.quantity}
//                       </span>
//                       <button
//                         onClick={() => updateQty(item.id, item.quantity + 1)}
//                         className="px-3 py-2 hover:bg-gold-50 text-gray-700"
//                         aria-label="Increase quantity"
//                       >
//                         <Plus size={13} />
//                       </button>
//                     </div>
//                     <span
//                       style={{ fontFamily: "'Playfair Display',serif" }}
//                       className="font-bold text-lg text-gray-900"
//                     >
//                       ₹{item.totalPrice}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* ── Order Summary ── */}
//           <div>
//             <div className="bg-white rounded-2xl p-6 shadow-sm border border-gold-100 sticky top-28">
//               <h2
//                 style={{ fontFamily: "'Playfair Display',serif" }}
//                 className="text-xl font-bold text-gray-900 mb-6"
//               >
//                 Order Summary
//               </h2>

//               <div className="space-y-3 mb-4">
//                 <div className="flex justify-between font-body text-gray-600">
//                   <span>Subtotal</span>
//                   <span>₹{totalPrice}</span>
//                 </div>
//                 <div className="flex justify-between font-body text-gray-600">
//                   <span>Delivery</span>
//                   <span className={delivery === 0 ? 'text-green-600 font-semibold' : ''}>
//                     {delivery === 0 ? 'FREE' : `₹${delivery}`}
//                   </span>
//                 </div>
//                 {delivery === 0 && (
//                   <p className="text-xs text-green-600 font-body">🎉 You qualify for free delivery!</p>
//                 )}
//                 {delivery > 0 && (
//                   <p className="text-xs text-gray-400 font-body">
//                     Add ₹{999 - totalPrice} more for free delivery
//                   </p>
//                 )}
//                 {discount > 0 && (
//                   <div className="flex justify-between font-body text-green-600 font-semibold">
//                     <span className="flex items-center gap-1">
//                       <Tag size={13} /> Discount ({appliedCoupon})
//                     </span>
//                     <span>− ₹{discount}</span>
//                   </div>
//                 )}
//               </div>

//               <div className="border-t-2 border-gold-100 pt-4 mb-6">
//                 <div
//                   className="flex justify-between font-bold text-xl text-gray-900"
//                   style={{ fontFamily: "'Playfair Display',serif" }}
//                 >
//                   <span>Total</span>
//                   <span className="text-gold-700">₹{total}</span>
//                 </div>
//                 {discount > 0 && (
//                   <p className="text-xs text-green-600 font-body mt-1 text-right">
//                     You save ₹{discount} 🎉
//                   </p>
//                 )}
//               </div>

//               {/* ── Coupon Section ── */}
//               {appliedCoupon ? (
//                 <div className="mb-5 rounded-xl border-2 border-green-200 bg-green-50 px-4 py-3 flex items-center justify-between">
//                   <div className="flex items-center gap-2">
//                     <CheckCircle2 size={16} className="text-green-600 shrink-0" />
//                     <div>
//                       <p className="font-body font-semibold text-green-700 text-sm">{appliedCoupon}</p>
//                       <p className="font-body text-xs text-green-600">{couponSuccess}</p>
//                     </div>
//                   </div>
//                   <button
//                     onClick={removeCoupon}
//                     className="text-gray-400 hover:text-red-500 transition-colors"
//                     aria-label="Remove coupon"
//                   >
//                     <X size={16} />
//                   </button>
//                 </div>
//               ) : (
//                 <div className="mb-5">
//                   <button
//                     onClick={openCouponModal}
//                     className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl border-2 border-dashed border-gold-200 hover:border-gold-400 hover:bg-gold-50 transition-colors mb-2"
//                   >
//                     <span className="flex items-center gap-2 font-body text-sm text-gold-700 font-semibold">
//                       <Tag size={14} /> View available coupons
//                     </span>
//                     <ChevronRight size={14} className="text-gold-500" />
//                   </button>

//                   <div className="flex gap-2">
//                     <input
//                       type="text"
//                       value={couponInput}
//                       onChange={e => { setCouponInput(e.target.value); setCouponError('') }}
//                       placeholder="Enter promo code"
//                       className="input-field flex-1 text-sm py-2.5 uppercase placeholder:normal-case"
//                       onKeyDown={e => e.key === 'Enter' && validateCoupon(couponInput)}
//                     />
//                     <button
//                       onClick={() => validateCoupon(couponInput)}
//                       disabled={validating || !couponInput.trim()}
//                       className="px-4 py-2.5 rounded-xl bg-gold-100 text-gold-700 font-body font-semibold text-sm hover:bg-gold-200 transition-colors disabled:opacity-50"
//                     >
//                       {validating ? '...' : 'Apply'}
//                     </button>
//                   </div>

//                   {couponError && (
//                     <div className="flex items-center gap-1.5 mt-2">
//                       <AlertCircle size={13} className="text-red-500 shrink-0" />
//                       <p className="text-xs text-red-500 font-body">{couponError}</p>
//                     </div>
//                   )}
//                 </div>
//               )}

//               <Link to="/checkout" className="btn-primary w-full py-4 text-base">
//                 Proceed to Checkout <ArrowRight size={18} />
//               </Link>

//               <Link to="/shop" className="mt-3 block text-center font-body text-sm text-gold-600 hover:text-gold-800">
//                 ← Continue Shopping
//               </Link>

//               <div className="mt-5 pt-4 border-t border-gray-100 flex justify-center gap-4">
//                 <span className="font-body text-xs text-gray-400">🔒 Secure Checkout</span>
//                 <span className="font-body text-xs text-gray-400">🚚 Fast Delivery</span>
//               </div>
//             </div>
//           </div>

//         </div>
//       </div>

//       {/* ── Coupons Modal ── */}
//       {showModal && (
//         <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-sm px-4">
//           <div className="bg-white rounded-2xl w-full max-w-md max-h-[80vh] flex flex-col shadow-2xl">

//             {/* Header */}
//             <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
//               <h3 style={{ fontFamily: "'Playfair Display',serif" }} className="text-lg font-bold text-gray-900">
//                 Available Coupons
//               </h3>
//               <button
//                 onClick={() => setShowModal(false)}
//                 className="text-gray-400 hover:text-gray-600 transition-colors"
//               >
//                 <X size={20} />
//               </button>
//             </div>

//             {/* List */}
//             <div className="overflow-y-auto flex-1 px-4 py-3 space-y-3">
//               {loadingCoupons ? (
//                 <div className="flex items-center justify-center py-12 text-gray-400 font-body text-sm">
//                   Loading coupons…
//                 </div>
//               ) : coupons.filter(c => c.status === 'ACTIVE').length === 0 ? (
//                 <p className="text-center text-gray-400 font-body text-sm py-12">No coupons available</p>
//               ) : (
//                 coupons
//                   .filter(c => c.status === 'ACTIVE')
//                   .map(c => {
//                     const applicable = totalPrice >= c.minOrderValue
//                     const shortfall = c.minOrderValue - totalPrice
//                     const progress = Math.min((totalPrice / c.minOrderValue) * 100, 100)

//                     return (
//                       <div
//                         key={c.id}
//                         className={`rounded-xl border-2 p-4 bg-white transition-all ${
//                           applicable ? 'border-gold-200' : 'border-gray-100'
//                         }`}
//                       >
//                         <div className="flex items-start justify-between gap-3">

//                           {/* Left */}
//                           <div className="flex-1 min-w-0">
//                             <div className="flex items-center gap-2 mb-1.5">
//                               <span className="font-mono font-bold text-gold-700 text-sm tracking-wider bg-gold-50 px-2 py-0.5 rounded-md border border-dashed border-gold-300">
//                                 {c.code}
//                               </span>
//                             </div>
//                             <p className={`font-body text-sm ${applicable ? 'text-gray-700' : 'text-gray-400'}`}>
//                               {c.description}
//                             </p>

//                             {/* Progress bar when not applicable */}
//                             {!applicable && (
//                               <div className="mt-2">
//                                 <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
//                                   <div
//                                     className="h-full bg-amber-400 rounded-full transition-all"
//                                     style={{ width: `${progress}%` }}
//                                   />
//                                 </div>
//                                 <p className="font-body text-xs text-amber-500 mt-1">
//                                   Add ₹{shortfall} more to unlock
//                                 </p>
//                               </div>
//                             )}

//                             {applicable && (
//                               <p className="font-body text-xs text-gray-400 mt-1">
//                                 Min. order ₹{c.minOrderValue}
//                               </p>
//                             )}
//                           </div>

//                           {/* Right */}
//                           <div className="flex flex-col items-end gap-2 shrink-0">
//                             <span className={`font-body font-bold text-sm ${applicable ? 'text-green-600' : 'text-gray-400'}`}>
//                               {c.type === 'PERCENTAGE'
//                                 ? `${c.value}% off${c.maxDiscount ? ` (max ₹${c.maxDiscount})` : ''}`
//                                 : `₹${c.value} off`}
//                             </span>
//                             <button
//                               onClick={() => applicable && validateCoupon(c.code)}
//                               disabled={!applicable || validating}
//                               className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-body font-semibold transition-all ${
//                                 applicable
//                                   ? 'bg-gold-500 text-white hover:bg-gold-600 shadow-sm cursor-pointer'
//                                   : 'bg-gray-50 text-gray-300 border border-gray-200 cursor-not-allowed'
//                               }`}
//                             >
//                               {!applicable && (
//                                 <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 24 24" fill="currentColor">
//                                   <path fillRule="evenodd" d="M12 1a5 5 0 00-5 5v2H6a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V10a2 2 0 00-2-2h-1V6a5 5 0 00-5-5zm3 7V6a3 3 0 10-6 0v2h6z" clipRule="evenodd" />
//                                 </svg>
//                               )}
//                               {validating ? '...' : 'Apply'}
//                             </button>
//                           </div>

//                         </div>
//                       </div>
//                     )
//                   })
//               )}
//             </div>

//             {/* Footer */}
//             <div className="px-6 py-3 border-t border-gray-100">
//               <p className="font-body text-xs text-gray-400 text-center">
//                 🔒 Apply is unlocked once your order meets the minimum
//               </p>
//             </div>

//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

// export default CartPage







import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag, X, ChevronRight, CheckCircle2, AlertCircle } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { getCouponsAPI, getValidateAPI } from '../service'

const formatSize = (size: string) => size.replace('SIZE_', '').toUpperCase()

interface Coupon {
  id: number
  code: string
  description: string
  type: 'PERCENTAGE' | 'FLAT'
  value: number
  minOrderValue: number
  maxDiscount: number | null
  status: 'ACTIVE' | 'EXPIRED'
  expiresAt: string
}

const CartPage: React.FC = () => {
  const {
    items, removeFromCart, updateQty, totalItems, totalPrice,
    discount, appliedCoupon, setDiscount, setAppliedCoupon, clearCoupon,
  } = useCart()

  const navigate = useNavigate()

  const [couponInput, setCouponInput] = useState('')
  const [couponError, setCouponError] = useState('')
  const [couponSuccess, setCouponSuccess] = useState('')
  const [validating, setValidating] = useState(false)

  const [showModal, setShowModal] = useState(false)
  const [coupons, setCoupons] = useState<Coupon[]>([])
  const [loadingCoupons, setLoadingCoupons] = useState(false)

  const delivery = totalPrice >= 999 ? 0 : 50
  const total = totalPrice + delivery - discount

  // ── Fetch coupons for modal ───────────────────────────────────────────────
  const openCouponModal = async () => {
    setShowModal(true)
    if (coupons.length > 0) return
    setLoadingCoupons(true)
    try {
      const res = await getCouponsAPI()
      setCoupons(res.data)
    } catch {
      // fail silently
    } finally {
      setLoadingCoupons(false)
    }
  }

  // ── Validate coupon ───────────────────────────────────────────────────────
  const validateCoupon = async (code: string) => {
    const trimmed = code.trim().toUpperCase()
    if (!trimmed) return

    setCouponError('')
    setCouponSuccess('')
    setValidating(true)

    try {
      const res = await getValidateAPI({ code: trimmed, orderAmount: totalPrice })
      const { success, message, data } = res.data

      if (success) {
        setDiscount(data)           // save to context
        setAppliedCoupon(trimmed)   // save to context
        setCouponInput(trimmed)
        setCouponSuccess(message)
        setShowModal(false)
      } else {
        setCouponError(message)
        setDiscount(0)
        setAppliedCoupon(null)
      }
    } catch (err: any) {
      const msg = err?.response?.data?.message || 'Invalid or expired coupon'
      setCouponError(msg)
      setDiscount(0)
      setAppliedCoupon(null)
    } finally {
      setValidating(false)
    }
  }

  // ── Remove coupon ─────────────────────────────────────────────────────────
  const removeCoupon = () => {
    clearCoupon()
    setCouponInput('')
    setCouponSuccess('')
    setCouponError('')
  }

  // ── Proceed to checkout — pass discount in route state ────────────────────
  const handleCheckout = () => {
    navigate('/checkout', {
      state: {
        discount,
        appliedCoupon,
        subtotal: totalPrice,
        delivery,
        total,
      },
    })
  }

  if (items.length === 0) return (
    <div className="pt-36 min-h-screen bg-cream flex items-center justify-center px-4">
      <div className="text-center">
        <div className="text-7xl mb-6">🛒</div>
        <h2 style={{ fontFamily: "'Playfair Display',serif" }} className="text-3xl font-bold text-gray-900 mb-3">
          Your cart is empty
        </h2>
        <p className="font-body text-gray-500 mb-8">
          Discover our premium cooking oils and add them to your cart
        </p>
        <Link to="/shop" className="btn-primary text-base px-8 py-4">
          <ShoppingBag size={18} /> Start Shopping
        </Link>
      </div>
    </div>
  )

  return (
    <div className="pt-24 md:pt-36 min-h-screen bg-cream">
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        <h1
          style={{ fontFamily: "'Playfair Display',serif" }}
          className="text-3xl md:text-4xl font-black text-gray-900 mb-8"
        >
          My Cart <span className="text-gold-600">({totalItems} {totalItems === 1 ? 'item' : 'items'})</span>
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">

          {/* ── Cart Items ── */}
          <div className="lg:col-span-2 space-y-4">
            {items.map(item => (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-gold-100 flex gap-4 md:gap-6"
              >
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-xl bg-gold-50 flex items-center justify-center shrink-0 text-4xl md:text-5xl">
                  {item.productEmoji}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between gap-2">
                    <div>
                      <span
                        style={{ fontFamily: "'Playfair Display',serif" }}
                        className="font-bold text-gray-900 text-sm md:text-base line-clamp-2 block"
                      >
                        {item.productName}
                      </span>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="px-2 py-0.5 rounded-full bg-gold-100 text-gold-700 text-xs font-body font-semibold">
                          {formatSize(item.size)}
                        </span>
                        <span className="text-xs text-gray-400 font-body">
                          ₹{item.price} / unit
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors p-1 shrink-0"
                      aria-label={`Remove ${item.productName}`}
                    >
                      <Trash2 size={17} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center border-2 border-gold-200 rounded-xl overflow-hidden">
                      <button
                        onClick={() => updateQty(item.id, item.quantity - 1)}
                        className="px-3 py-2 hover:bg-gold-50 text-gray-700 disabled:opacity-40"
                        disabled={item.quantity <= 1}
                        aria-label="Decrease quantity"
                      >
                        <Minus size={13} />
                      </button>
                      <span
                        style={{ fontFamily: "'Playfair Display',serif" }}
                        className="px-3 py-2 font-bold text-gray-900 text-sm min-w-[2rem] text-center"
                      >
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQty(item.id, item.quantity + 1)}
                        className="px-3 py-2 hover:bg-gold-50 text-gray-700"
                        aria-label="Increase quantity"
                      >
                        <Plus size={13} />
                      </button>
                    </div>
                    <span
                      style={{ fontFamily: "'Playfair Display',serif" }}
                      className="font-bold text-lg text-gray-900"
                    >
                      ₹{item.totalPrice}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ── Order Summary ── */}
          <div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gold-100 sticky top-28">
              <h2
                style={{ fontFamily: "'Playfair Display',serif" }}
                className="text-xl font-bold text-gray-900 mb-6"
              >
                Order Summary
              </h2>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between font-body text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{totalPrice}</span>
                </div>
                <div className="flex justify-between font-body text-gray-600">
                  <span>Delivery</span>
                  <span className={delivery === 0 ? 'text-green-600 font-semibold' : ''}>
                    {delivery === 0 ? 'FREE' : `₹${delivery}`}
                  </span>
                </div>
                {delivery === 0 && (
                  <p className="text-xs text-green-600 font-body">🎉 You qualify for free delivery!</p>
                )}
                {delivery > 0 && (
                  <p className="text-xs text-gray-400 font-body">
                    Add ₹{999 - totalPrice} more for free delivery
                  </p>
                )}
                {discount > 0 && (
                  <div className="flex justify-between font-body text-green-600 font-semibold">
                    <span className="flex items-center gap-1">
                      <Tag size={13} /> Discount ({appliedCoupon})
                    </span>
                    <span>− ₹{discount}</span>
                  </div>
                )}
              </div>

              <div className="border-t-2 border-gold-100 pt-4 mb-6">
                <div
                  className="flex justify-between font-bold text-xl text-gray-900"
                  style={{ fontFamily: "'Playfair Display',serif" }}
                >
                  <span>Total</span>
                  <span className="text-gold-700">₹{total}</span>
                </div>
                {discount > 0 && (
                  <p className="text-xs text-green-600 font-body mt-1 text-right">
                    You save ₹{discount} 🎉
                  </p>
                )}
              </div>

              {/* ── Coupon Section ── */}
              {appliedCoupon ? (
                <div className="mb-5 rounded-xl border-2 border-green-200 bg-green-50 px-4 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-green-600 shrink-0" />
                    <div>
                      <p className="font-body font-semibold text-green-700 text-sm">{appliedCoupon}</p>
                      <p className="font-body text-xs text-green-600">{couponSuccess}</p>
                    </div>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                    aria-label="Remove coupon"
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <div className="mb-5">
                  <button
                    onClick={openCouponModal}
                    className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl border-2 border-dashed border-gold-200 hover:border-gold-400 hover:bg-gold-50 transition-colors mb-2"
                  >
                    <span className="flex items-center gap-2 font-body text-sm text-gold-700 font-semibold">
                      <Tag size={14} /> View available coupons
                    </span>
                    <ChevronRight size={14} className="text-gold-500" />
                  </button>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={couponInput}
                      onChange={e => { setCouponInput(e.target.value); setCouponError('') }}
                      placeholder="Enter promo code"
                      className="input-field flex-1 text-sm py-2.5 uppercase placeholder:normal-case"
                      onKeyDown={e => e.key === 'Enter' && validateCoupon(couponInput)}
                    />
                    <button
                      onClick={() => validateCoupon(couponInput)}
                      disabled={validating || !couponInput.trim()}
                      className="px-4 py-2.5 rounded-xl bg-gold-100 text-gold-700 font-body font-semibold text-sm hover:bg-gold-200 transition-colors disabled:opacity-50"
                    >
                      {validating ? '...' : 'Apply'}
                    </button>
                  </div>

                  {couponError && (
                    <div className="flex items-center gap-1.5 mt-2">
                      <AlertCircle size={13} className="text-red-500 shrink-0" />
                      <p className="text-xs text-red-500 font-body">{couponError}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Checkout button — now uses navigate with state */}
              <button onClick={handleCheckout} className="btn-primary w-full py-4 text-base">
                Proceed to Checkout <ArrowRight size={18} />
              </button>

              <Link to="/shop" className="mt-3 block text-center font-body text-sm text-gold-600 hover:text-gold-800">
                ← Continue Shopping
              </Link>

              <div className="mt-5 pt-4 border-t border-gray-100 flex justify-center gap-4">
                <span className="font-body text-xs text-gray-400">🔒 Secure Checkout</span>
                <span className="font-body text-xs text-gray-400">🚚 Fast Delivery</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ── Coupons Modal ── */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-sm px-4">
          <div className="bg-white rounded-2xl w-full max-w-md max-h-[80vh] flex flex-col shadow-2xl">

            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h3 style={{ fontFamily: "'Playfair Display',serif" }} className="text-lg font-bold text-gray-900">
                Available Coupons
              </h3>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="overflow-y-auto flex-1 px-4 py-3 space-y-3">
              {loadingCoupons ? (
                <div className="flex items-center justify-center py-12 text-gray-400 font-body text-sm">
                  Loading coupons…
                </div>
              ) : coupons.filter(c => c.status === 'ACTIVE').length === 0 ? (
                <p className="text-center text-gray-400 font-body text-sm py-12">No coupons available</p>
              ) : (
                coupons
                  .filter(c => c.status === 'ACTIVE')
                  .map(c => {
                    const applicable = totalPrice >= c.minOrderValue
                    const shortfall = c.minOrderValue - totalPrice
                    const progress = Math.min((totalPrice / c.minOrderValue) * 100, 100)

                    return (
                      <div
                        key={c.id}
                        className={`rounded-xl border-2 p-4 bg-white transition-all ${applicable ? 'border-gold-200' : 'border-gray-100'}`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1.5">
                              <span className="font-mono font-bold text-gold-700 text-sm tracking-wider bg-gold-50 px-2 py-0.5 rounded-md border border-dashed border-gold-300">
                                {c.code}
                              </span>
                            </div>
                            <p className={`font-body text-sm ${applicable ? 'text-gray-700' : 'text-gray-400'}`}>
                              {c.description}
                            </p>
                            {!applicable && (
                              <div className="mt-2">
                                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-amber-400 rounded-full transition-all"
                                    style={{ width: `${progress}%` }}
                                  />
                                </div>
                                <p className="font-body text-xs text-amber-500 mt-1">
                                  Add ₹{shortfall} more to unlock
                                </p>
                              </div>
                            )}
                            {applicable && (
                              <p className="font-body text-xs text-gray-400 mt-1">
                                Min. order ₹{c.minOrderValue}
                              </p>
                            )}
                          </div>

                          <div className="flex flex-col items-end gap-2 shrink-0">
                            <span className={`font-body font-bold text-sm ${applicable ? 'text-green-600' : 'text-gray-400'}`}>
                              {c.type === 'PERCENTAGE'
                                ? `${c.value}% off${c.maxDiscount ? ` (max ₹${c.maxDiscount})` : ''}`
                                : `₹${c.value} off`}
                            </span>
                            <button
                              onClick={() => applicable && validateCoupon(c.code)}
                              disabled={!applicable || validating}
                              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-body font-semibold transition-all ${applicable
                                ? 'bg-gold-500 text-white hover:bg-gold-600 shadow-sm cursor-pointer'
                                : 'bg-gray-50 text-gray-300 border border-gray-200 cursor-not-allowed'
                                }`}
                            >
                              {!applicable && (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 24 24" fill="currentColor">
                                  <path fillRule="evenodd" d="M12 1a5 5 0 00-5 5v2H6a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V10a2 2 0 00-2-2h-1V6a5 5 0 00-5-5zm3 7V6a3 3 0 10-6 0v2h6z" clipRule="evenodd" />
                                </svg>
                              )}
                              {validating ? '...' : 'Apply'}
                            </button>
                          </div>
                        </div>
                      </div>
                    )
                  })
              )}
            </div>
            {couponError && (
              <div className="px-6 py-3 border-t border-gray-100 flex items-center justify-center">
                <AlertCircle size={13} className="text-red-500 shrink-0 mr-2" />
                <p className="text-xs text-red-500 font-body">
                  {couponError}
                </p>
              </div>
            )}
            <div className="px-6 py-3 border-t border-gray-100">
              <p className="font-body text-xs text-gray-400 text-center">
                🔒 Apply is unlocked once your order meets the minimum
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CartPage