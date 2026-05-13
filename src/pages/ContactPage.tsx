import React, { useState } from 'react'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'

const ContactPage: React.FC = () => {
  const [form, setForm] = useState({name:'',phone:'',email:'',message:''})
  const [done, setDone] = useState(false)
  const handle = (e: React.FormEvent) => { e.preventDefault(); setDone(true) }

  return (
    <div className="pt-24 md:pt-36 min-h-screen">
      <div className="gradient-gold py-16 px-4 text-center">
        <h1 style={{fontFamily:"'Playfair Display',serif"}} className="text-4xl md:text-6xl font-black text-white mb-4">Contact Us</h1>
        <p className="font-body text-white/90 text-xl">We're here to help. Reach out anytime!</p>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <h2 style={{fontFamily:"'Playfair Display',serif"}} className="text-3xl font-black text-gray-900 mb-8">Get In Touch</h2>
            <div className="space-y-4 mb-10">
              {[{I:Phone,l:'Phone',v:'+91-8111068222',h:'tel:+91XXXXXXXXXX'},{I:Mail,l:'Email',v:'info@mmlagrofoods.com',h:'mailto:info@mmlagrofoods.com'},{I:MapPin,l:'Address',v:'Your Business Address, India',h:'#'},{I:Clock,l:'Working Hours',v:'Mon–Sat: 9 AM – 6 PM',h:'#'}].map(({I,l,v,h},i)=>(
                <a key={i} href={h} className="flex items-start gap-4 p-5 bg-white rounded-2xl border-2 border-gold-100 hover:border-gold-400 transition-all group card-hover">
                  <div className="w-12 h-12 rounded-xl gradient-gold flex items-center justify-center shrink-0"><I size={19} className="text-white"/></div>
                  <div><div className="font-body text-xs text-gray-400 mb-0.5">{l}</div><div className="font-body font-semibold text-gray-900 group-hover:text-gold-700 transition-colors">{v}</div></div>
                </a>
              ))}
            </div>
            <div className="p-6 bg-gold-50 rounded-2xl border border-gold-200">
              <h3 style={{fontFamily:"'Playfair Display',serif"}} className="font-bold text-gray-900 mb-3">Quick Help Topics</h3>
              <div className="space-y-2">
                {['Bulk order inquiries','Product quality concerns','Delivery tracking & issues','Partnership opportunities','Franchise enquiries'].map((t,i)=>(
                  <div key={i} className="flex items-center gap-2 font-body text-sm text-gray-600"><span className="text-gold-500">→</span>{t}</div>
                ))}
              </div>
            </div>
          </div>

          <div>
            {done ? (
              <div className="h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="text-7xl mb-4">✅</div>
                  <h3 style={{fontFamily:"'Playfair Display',serif"}} className="text-2xl font-bold text-gray-900 mb-3">Message Sent!</h3>
                  <p className="font-body text-gray-600">We'll get back to you within 24 hours.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handle} className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gold-100 space-y-5">
                <h2 style={{fontFamily:"'Playfair Display',serif"}} className="text-2xl font-bold text-gray-900 mb-2">Send a Message</h2>
                {[{k:'name',l:'Full Name',t:'text',ph:'Your name'},{k:'phone',l:'Phone Number',t:'tel',ph:'+91-XXXXXXXXXX'},{k:'email',l:'Email Address',t:'email',ph:'your@email.com'}].map(f=>(
                  <div key={f.k}>
                    <label className="font-body text-sm font-medium text-gray-700 mb-1.5 block">{f.l}</label>
                    <input type={f.t} value={form[f.k as keyof typeof form]} onChange={e=>setForm(p=>({...p,[f.k]:e.target.value}))} placeholder={f.ph} required className="input-field"/>
                  </div>
                ))}
                <div>
                  <label className="font-body text-sm font-medium text-gray-700 mb-1.5 block">Message</label>
                  <textarea value={form.message} onChange={e=>setForm(p=>({...p,message:e.target.value}))} placeholder="How can we help you?" rows={5} required className="input-field resize-none"/>
                </div>
                <button type="submit" className="btn-primary w-full py-4 text-base">Send Message</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
export default ContactPage
