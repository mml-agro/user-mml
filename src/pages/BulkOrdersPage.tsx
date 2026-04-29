import React, { useState } from 'react'

const BulkOrdersPage: React.FC = () => {
  const [form, setForm] = useState({name:'',company:'',phone:'',email:'',product:'',quantity:'',message:''})
  const [done, setDone] = useState(false)

  const handle = (e: React.FormEvent) => { e.preventDefault(); setDone(true) }

  return (
    <div className="pt-24 md:pt-36 min-h-screen">
      <div className="gradient-gold py-16 px-4 text-center">
        <h1 style={{fontFamily:"'Playfair Display',serif"}} className="text-4xl md:text-6xl font-black text-white mb-4">Partner With Us</h1>
        <p className="font-body text-white/90 text-xl max-w-2xl mx-auto">Bulk supply solutions for retailers, wholesalers, restaurants, and distributors.</p>
      </div>

      <section className="py-16 px-4 bg-cream">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 style={{fontFamily:"'Playfair Display',serif"}} className="text-3xl md:text-4xl font-black text-gray-900">We Supply To</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[{i:'🏪',l:'Retailers',d:'Small & large retail stores'},{i:'🏬',l:'Wholesalers',d:'Bulk distribution partners'},{i:'🍽️',l:'Restaurants',d:'Hotels, dhabas & cloud kitchens'},{i:'🚚',l:'Distributors',d:'Pan-India distribution network'}].map((s,i)=>(
              <div key={i} className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gold-100 card-hover">
                <div className="text-5xl mb-4">{s.i}</div>
                <h3 style={{fontFamily:"'Playfair Display',serif"}} className="font-bold text-gray-900 text-lg mb-2">{s.l}</h3>
                <p className="font-body text-sm text-gray-500">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 style={{fontFamily:"'Playfair Display',serif"}} className="text-3xl font-black text-gray-900">Benefits of Partnering</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[{i:'💰',t:'Competitive Pricing',d:'Best bulk rates with attractive margins for your business and consistent cost savings.'},{i:'🔄',t:'Consistent Supply',d:'Reliable delivery schedule ensuring your shelves are never empty with guaranteed stock.'},{i:'✅',t:'Trusted Quality',d:'All products quality tested and FSSAI certified, meeting all regulatory standards.'}].map((b,i)=>(
              <div key={i} className="p-8 rounded-2xl bg-gold-50 border-2 border-gold-200 text-center card-hover">
                <div className="text-5xl mb-4">{b.i}</div>
                <h3 style={{fontFamily:"'Playfair Display',serif"}} className="text-xl font-bold text-gray-900 mb-3">{b.t}</h3>
                <p className="font-body text-gray-600 leading-relaxed">{b.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-warmgray">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h2 style={{fontFamily:"'Playfair Display',serif"}} className="text-3xl font-black text-gray-900 mb-3">Request a Quote</h2>
            <p className="font-body text-gray-600">Fill in the form and our team will contact you within 24 hours.</p>
          </div>
          {done ? (
            <div className="bg-white rounded-3xl p-10 text-center shadow-sm border border-gold-100">
              <div className="text-6xl mb-4">✅</div>
              <h3 style={{fontFamily:"'Playfair Display',serif"}} className="text-2xl font-bold text-gray-900 mb-3">Request Received!</h3>
              <p className="font-body text-gray-600">Our bulk orders team will contact you within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handle} className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gold-100 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                {[{k:'name',l:'Your Name',t:'text',ph:'Full name'},{k:'company',l:'Company/Business',t:'text',ph:'Business name'},{k:'phone',l:'Phone Number',t:'tel',ph:'+91-XXXXXXXXXX'},{k:'email',l:'Email Address',t:'email',ph:'your@email.com'}].map(f=>(
                  <div key={f.k}>
                    <label className="font-body text-sm font-medium text-gray-700 mb-1.5 block">{f.l}</label>
                    <input type={f.t} value={form[f.k as keyof typeof form]} onChange={e=>setForm(p=>({...p,[f.k]:e.target.value}))} placeholder={f.ph} required className="input-field"/>
                  </div>
                ))}
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="font-body text-sm font-medium text-gray-700 mb-1.5 block">Product Required</label>
                  <select value={form.product} onChange={e=>setForm(p=>({...p,product:e.target.value}))} required className="input-field">
                    <option value="">Select product</option>
                    {['MML Gold Sunflower Oil','Sunnova Premium Sunflower Oil','MML Gold Refined Oil','Karthigai Jothi Deepam Oil','MML Cold Press Groundnut Oil','Mixed Products'].map(o=><option key={o}>{o}</option>)}
                  </select>
                </div>
                <div>
                  <label className="font-body text-sm font-medium text-gray-700 mb-1.5 block">Quantity Required</label>
                  <input type="text" value={form.quantity} onChange={e=>setForm(p=>({...p,quantity:e.target.value}))} placeholder="e.g. 100 litres/month" className="input-field"/>
                </div>
              </div>
              <div>
                <label className="font-body text-sm font-medium text-gray-700 mb-1.5 block">Additional Message</label>
                <textarea value={form.message} onChange={e=>setForm(p=>({...p,message:e.target.value}))} placeholder="Tell us more about your requirements..." rows={4} className="input-field resize-none"/>
              </div>
              <button type="submit" className="btn-primary w-full py-4 text-base">Submit Bulk Order Request</button>
            </form>
          )}
        </div>
      </section>
    </div>
  )
}
export default BulkOrdersPage
