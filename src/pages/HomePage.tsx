import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ChevronDown, ChevronUp } from 'lucide-react'
import { products, blogs, faqs, whyChoose, testimonials } from '../data'
import ProductCard from '../components/ProductCard'

const HomePage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number|null>(null)

  return (
    <div className="overflow-x-hidden">
      {/* HERO */}
      <section className="relative min-h-screen flex items-center pt-28 pb-16 px-4 bg-cream">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 -left-32 w-80 h-80 rounded-full bg-gold-200/30 blur-3xl"/>
          <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-saffron/10 blur-3xl"/>
          <div className="absolute top-20 right-8 md:right-24 grid grid-cols-5 gap-3 opacity-[0.12]">
            {Array.from({length:25}).map((_,i)=><div key={i} className="w-2.5 h-2.5 rounded-full bg-gold-500"/>)}
          </div>
          <div className="absolute bottom-20 left-8 grid grid-cols-4 gap-3 opacity-[0.12]">
            {Array.from({length:16}).map((_,i)=><div key={i} className="w-2 h-2 rounded-full bg-gold-600"/>)}
          </div>
        </div>

        <div className="max-w-7xl mx-auto w-full relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-100 text-gold-800 text-sm font-body font-semibold mb-6">
                <span>🌻</span> Trusted by 10,000+ Families Across India
              </div>
              <h1 style={{fontFamily:"'Playfair Display',serif"}} className="text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 leading-tight mb-5">
                Pure <span className="text-gradient">Cooking.</span><br/>Trusted <span className="text-gradient">Quality.</span>
              </h1>
              <p className="font-body text-gray-600 text-lg md:text-xl leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
                From the house of MML Agro Foods – delivering premium oils for healthier, tastier meals every day.
              </p>
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start mb-12">
                <Link to="/shop" className="btn-primary text-base px-8 py-4 shadow-lg">Shop Now <ArrowRight size={18}/></Link>
                <Link to="/about" className="btn-outline text-base px-8 py-4">Explore Products</Link>
              </div>
              <div className="grid grid-cols-3 gap-4 max-w-xs mx-auto lg:mx-0 border-t border-gold-200 pt-8">
                {[{v:'10K+',l:'Families'},{v:'4',l:'Premium Brands'},{v:'100%',l:'FSSAI Certified'}].map(s=>(
                  <div key={s.l} className="text-center">
                    <div style={{fontFamily:"'Playfair Display',serif"}} className="text-2xl font-black text-gold-700">{s.v}</div>
                    <div className="font-body text-xs text-gray-500 mt-0.5">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="hidden lg:flex items-center justify-center">
              <div className="relative w-[420px] h-[420px]">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gold-100 to-amber-50 border-2 border-gold-200"/>
                <div className="absolute inset-8 rounded-full bg-white/60 border border-gold-100 backdrop-blur-sm"/>
                <div className="absolute inset-0 flex items-center justify-center" style={{animation:'float 3s ease-in-out infinite'}}>
                  <span className="text-[130px]">🌻</span>
                </div>
                {[{e:'✨',l:'MML Gold',a:-30,d:170},{e:'☀️',l:'Sunnova',a:90,d:175},{e:'🪔',l:'Karthigai',a:210,d:170}].map((item,i)=>{
                  const rad=(item.a*Math.PI)/180
                  return (
                    <div key={i} className="absolute bg-white rounded-2xl shadow-xl px-3 py-2 flex items-center gap-2 border border-gold-100"
                      style={{left:`calc(50% + ${Math.cos(rad)*item.d}px)`,top:`calc(50% + ${Math.sin(rad)*item.d}px)`,transform:'translate(-50%,-50%)'}}>
                      <span className="text-2xl">{item.e}</span>
                      <span className="font-body text-xs font-semibold text-gray-700">{item.l}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE STRIP */}
      <div className="bg-gold-700 py-3 overflow-hidden">
        <div className="flex gap-8 animate-[shimmer_20s_linear_infinite] whitespace-nowrap">
          {Array.from({length:4}).flatMap(()=>['✅ Premium Quality Seeds','⚡ Advanced Refining Technology','💊 Rich in Vitamin E','🧴 Hygienically Packed','❤️ Heart Healthy','🚚 Free Delivery Above ₹999','🔒 FSSAI Certified','👨‍👩‍👧‍👦 10,000+ Happy Families']).map((t,i)=>(
            <span key={i} className="font-body text-white/90 font-medium text-sm">{t}</span>
          ))}
        </div>
      </div>

      {/* FEATURED PRODUCTS */}
      <section className="py-16 md:py-24 px-4 bg-cream">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span style={{fontFamily:"'Cormorant Garamond',serif"}} className="text-gold-600 italic text-xl">Our Products</span>
            <h2 className="section-title mt-2">Featured Oils</h2>
            <p className="font-body text-gray-600 mt-4 max-w-xl mx-auto text-lg">Handpicked for quality and nutrition – trusted by families across India.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {products.slice(0,3).map(p=><ProductCard key={p.id} product={p}/>)}
          </div>
          <div className="text-center mt-10">
            <Link to="/shop" className="btn-outline text-base px-8 py-4">View All Products <ArrowRight size={18}/></Link>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE */}
      <section className="py-16 md:py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span style={{fontFamily:"'Cormorant Garamond',serif"}} className="text-gold-600 italic text-xl">Why MML?</span>
            <h2 className="section-title mt-2">Why Choose MML Agro Foods</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-8">
            {whyChoose.map((item,i)=>(
              <div key={i} className="group p-5 md:p-6 rounded-2xl border-2 border-gold-100 hover:border-gold-400 hover:bg-gold-50 transition-all duration-300 card-hover text-center">
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform inline-block">{item.icon}</div>
                <h3 style={{fontFamily:"'Playfair Display',serif"}} className="text-base font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="font-body text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HEALTH SECTION */}
      <section className="py-16 md:py-24 px-4 bg-warmgray">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span style={{fontFamily:"'Cormorant Garamond',serif"}} className="text-gold-600 italic text-xl">Health Benefits</span>
              <h2 className="section-title mt-2 mb-6">Cook Smart.<br/>Live Healthy.</h2>
              <p className="font-body text-gray-600 text-lg mb-8">Our oils are designed to support heart health while enhancing taste. Every drop is crafted for your wellbeing.</p>
              <ul className="space-y-3 mb-8">
                {[{i:'💧',t:'Light & easy to digest for everyday cooking'},{i:'💊',t:'Rich in Vitamin E for immunity & skin health'},{i:'🍛',t:'Ideal for all daily Indian cooking styles'},{i:'❤️',t:'Cholesterol-free formula for heart health'}].map((item,j)=>(
                  <li key={j} className="flex items-center gap-4 p-4 rounded-xl bg-white shadow-sm border border-gold-100">
                    <span className="text-2xl">{item.i}</span>
                    <span className="font-body text-gray-700">{item.t}</span>
                  </li>
                ))}
              </ul>
              <Link to="/shop" className="btn-primary text-base px-8 py-4">Shop Healthy Oils <ArrowRight size={18}/></Link>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative">
                <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-gold-100 flex items-center justify-center">
                  <span className="text-[130px] md:text-[160px]" style={{animation:'float 3s ease-in-out infinite'}}>🫒</span>
                </div>
                <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3 border border-gold-100">
                  <span className="text-2xl">💪</span>
                  <div><div style={{fontFamily:"'Playfair Display',serif"}} className="font-bold text-gray-900 text-sm">Heart Healthy</div><div className="font-body text-xs text-gray-500">Zero trans fat</div></div>
                </div>
                <div className="absolute -bottom-4 -left-4 bg-gold-700 text-white rounded-2xl shadow-xl p-4">
                  <div style={{fontFamily:"'Playfair Display',serif"}} className="font-bold text-lg">Vitamin E</div>
                  <div className="font-body text-xs opacity-80">Rich source</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-16 md:py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span style={{fontFamily:"'Cormorant Garamond',serif"}} className="text-gold-600 italic text-xl">Testimonials</span>
            <h2 className="section-title mt-2">What Our Customers Say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map(t=>(
              <div key={t.id} className="bg-gold-50 rounded-2xl p-6 border border-gold-100 card-hover">
                <div className="flex gap-1 mb-3">{Array.from({length:t.rating}).map((_,i)=><span key={i} className="text-gold-500 text-base">★</span>)}</div>
                <p style={{fontFamily:"'Cormorant Garamond',serif"}} className="italic text-gray-700 text-lg leading-relaxed mb-4">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full gradient-gold flex items-center justify-center text-white font-bold">{t.name[0]}</div>
                  <div>
                    <div className="font-body font-semibold text-gray-900 text-sm">{t.name}</div>
                    <div className="font-body text-gray-400 text-xs">{t.city} · {t.product}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BLOG PREVIEW */}
      <section className="py-16 md:py-24 px-4 bg-warmgray">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span style={{fontFamily:"'Cormorant Garamond',serif"}} className="text-gold-600 italic text-xl">Our Blog</span>
            <h2 className="section-title mt-2">Health & Cooking Tips</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {blogs.slice(0,3).map(b=>(
              <article key={b.id} className="bg-white rounded-2xl overflow-hidden shadow-sm card-hover">
                <div className="h-36 bg-gold-50 flex items-center justify-center text-6xl">{b.emoji}</div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-0.5 rounded-full bg-gold-100 text-gold-700 text-xs font-body font-medium">{b.category}</span>
                    <span className="text-xs text-gold-600 font-body">{b.readTime}</span>
                  </div>
                  <h3 style={{fontFamily:"'Playfair Display',serif"}} className="text-lg font-bold text-gray-900 mb-2 leading-snug">{b.title}</h3>
                  <p className="font-body text-gray-500 text-sm line-clamp-2 mb-4">{b.excerpt}</p>
                  <Link to={`/blog/${b.id}`} className="text-gold-600 text-sm font-body font-semibold flex items-center gap-1 hover:gap-2 transition-all">Read More <ArrowRight size={14}/></Link>
                </div>
              </article>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/blog" className="btn-outline px-8 py-3.5">View All Articles <ArrowRight size={18}/></Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span style={{fontFamily:"'Cormorant Garamond',serif"}} className="text-gold-600 italic text-xl">FAQs</span>
            <h2 className="section-title mt-2">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-3">
            {faqs.map((f,i)=>(
              <div key={i} className="border-2 border-gold-100 rounded-2xl overflow-hidden">
                <button onClick={()=>setOpenFaq(openFaq===i?null:i)} className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gold-50 transition-colors">
                  <span className="font-body font-semibold text-gray-900">{f.q}</span>
                  {openFaq===i?<ChevronUp size={19} className="text-gold-600 shrink-0"/>:<ChevronDown size={19} className="text-gold-600 shrink-0"/>}
                </button>
                {openFaq===i && <div className="px-5 pb-4 font-body text-gray-600 border-t border-gold-100 pt-4 leading-relaxed">{f.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
export default HomePage
