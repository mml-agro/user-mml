import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const CheckoutPage: React.FC = () => {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({name:'',phone:'',address:'',city:'',state:'Tamil Nadu',pincode:'',payment:'upi'})
  const { totalPrice, clearCart } = useCart()
  const delivery = totalPrice>=999?0:50
  const total = totalPrice+delivery
  const orderId = `#MML${Math.floor(Math.random()*90000+10000)}`

  const confirmOrder = () => { clearCart(); setStep(3) }

  return (
    <div className="pt-24 md:pt-36 min-h-screen bg-cream">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <h1 style={{fontFamily:"'Playfair Display',serif"}} className="text-3xl font-black text-gray-900 mb-8">Checkout</h1>
        {/* Steps */}
        <div className="flex items-center gap-2 mb-10">
          {['Address','Payment','Confirm'].map((s,i)=>(
            <React.Fragment key={s}>
              <div className={`flex items-center gap-2 ${i+1<=step?'text-gold-700':'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${i+1<=step?'gradient-gold text-white':'bg-gray-200 text-gray-500'}`}>{i+1}</div>
                <span className="font-body text-sm font-medium hidden sm:block">{s}</span>
              </div>
              {i<2&&<div className={`flex-1 h-0.5 transition-colors ${i+1<step?'bg-gold-600':'bg-gray-200'}`}/>}
            </React.Fragment>
          ))}
        </div>

        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gold-100">
          {step===1&&(
            <div className="space-y-4">
              <h2 style={{fontFamily:"'Playfair Display',serif"}} className="text-xl font-bold text-gray-900 mb-6">Delivery Address</h2>
              {[{k:'name',l:'Full Name',t:'text',ph:'Your full name'},{k:'phone',l:'Phone Number',t:'tel',ph:'+91-XXXXXXXXXX'},{k:'address',l:'Street Address',t:'text',ph:'Street, Area, Landmark'},{k:'city',l:'City',t:'text',ph:'City'},{k:'pincode',l:'Pincode',t:'text',ph:'600001'}].map(f=>(
                <div key={f.k}><label className="font-body text-sm font-medium text-gray-700 mb-1.5 block">{f.l}</label><input type={f.t} value={form[f.k as keyof typeof form]} onChange={e=>setForm(p=>({...p,[f.k]:e.target.value}))} placeholder={f.ph} className="input-field"/></div>
              ))}
              <div><label className="font-body text-sm font-medium text-gray-700 mb-1.5 block">State</label><select value={form.state} onChange={e=>setForm(p=>({...p,state:e.target.value}))} className="input-field">{['Tamil Nadu','Kerala','Karnataka','Andhra Pradesh','Telangana','Maharashtra','Delhi'].map(s=><option key={s}>{s}</option>)}</select></div>
              <button onClick={()=>setStep(2)} className="btn-primary w-full py-4 mt-4">Continue to Payment</button>
            </div>
          )}
          {step===2&&(
            <div>
              <h2 style={{fontFamily:"'Playfair Display',serif"}} className="text-xl font-bold text-gray-900 mb-6">Payment Method</h2>
              <div className="space-y-3 mb-6">
                {[{k:'upi',l:'UPI / GPay / PhonePe / Paytm',i:'📱'},{k:'card',l:'Debit / Credit Card',i:'💳'},{k:'netbanking',l:'Net Banking',i:'🏦'},{k:'cod',l:'Cash on Delivery',i:'💵'}].map(p=>(
                  <label key={p.k} className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${form.payment===p.k?'border-gold-500 bg-gold-50':'border-gray-200 hover:border-gold-300'}`}>
                    <input type="radio" name="payment" value={p.k} checked={form.payment===p.k} onChange={()=>setForm(f=>({...f,payment:p.k}))} className="accent-amber-600"/>
                    <span className="text-2xl">{p.i}</span><span className="font-body font-medium text-gray-900">{p.l}</span>
                  </label>
                ))}
              </div>
              <div className="p-4 bg-gold-50 rounded-xl border border-gold-200 mb-6">
                <div className="flex justify-between font-body text-gray-600 mb-1"><span>Subtotal</span><span>₹{totalPrice}</span></div>
                <div className="flex justify-between font-body text-gray-600 mb-2"><span>Delivery</span><span className={delivery===0?'text-green-600 font-semibold':''}>{delivery===0?'FREE':`₹${delivery}`}</span></div>
                <div className="flex justify-between font-bold text-lg border-t border-gold-200 pt-2" style={{fontFamily:"'Playfair Display',serif"}}><span>Total</span><span className="text-gold-700">₹{total}</span></div>
              </div>
              <div className="flex gap-3">
                <button onClick={()=>setStep(1)} className="btn-outline flex-1 py-3">Back</button>
                <button onClick={confirmOrder} className="btn-primary flex-1 py-3">Confirm Order ₹{total}</button>
              </div>
            </div>
          )}
          {step===3&&(
            <div className="text-center py-8">
              <div className="text-7xl mb-4">🎉</div>
              <h2 style={{fontFamily:"'Playfair Display',serif"}} className="text-2xl font-bold text-gray-900 mb-3">Order Confirmed!</h2>
              <p className="font-body text-gray-600 mb-6">Thank you! You'll receive a confirmation SMS shortly.</p>
              <div className="p-4 bg-gold-50 rounded-xl inline-block mb-6 border border-gold-200">
                <p className="font-body text-sm text-gray-600">Order ID: <span style={{fontFamily:"'Playfair Display',serif"}} className="font-bold text-gold-700">{orderId}</span></p>
                <p className="font-body text-xs text-gray-400 mt-1">Expected delivery: 3-5 business days</p>
              </div>
              <div className="flex gap-3 justify-center flex-wrap">
                <Link to="/orders" className="btn-outline px-6 py-3">View Orders</Link>
                <Link to="/shop" className="btn-primary px-6 py-3">Continue Shopping</Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
export default CheckoutPage
