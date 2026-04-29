import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { team, testimonials } from '../data'

const AboutPage: React.FC = () => (
  <div className="pt-24 md:pt-36 min-h-screen">
    <div className="gradient-gold py-16 px-4 text-center">
      <h1 style={{fontFamily:"'Playfair Display',serif"}} className="text-4xl md:text-6xl font-black text-white mb-4">About MML Agro Foods</h1>
      <p className="font-body text-white/90 text-xl max-w-2xl mx-auto">A growing name in the edible oil industry, dedicated to purity and wellness.</p>
    </div>

    <section className="py-16 md:py-24 px-4 bg-cream">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <span style={{fontFamily:"'Cormorant Garamond',serif"}} className="text-gold-600 italic text-xl">Our Story</span>
          <h2 style={{fontFamily:"'Playfair Display',serif"}} className="text-3xl md:text-4xl font-black text-gray-900 mt-2 mb-6">Who We Are</h2>
          <p className="font-body text-gray-600 text-lg leading-relaxed mb-4">MML Agro Foods is a growing name in the edible oil industry, dedicated to providing high-quality, affordable cooking oils to households across India.</p>
          <p className="font-body text-gray-600 leading-relaxed mb-6">With a passion for purity and excellence, we introduced <strong className="text-gold-700">MML Gold</strong> and <strong className="text-gold-700">Sunnova</strong> to bring trusted cooking solutions to modern kitchens. Our journey began with a simple belief: every Indian family deserves the best quality cooking oil.</p>
          <div className="grid grid-cols-2 gap-4 mb-8">
            {[{v:'10K+',l:'Happy Customers'},{v:'4',l:'Premium Brands'},{v:'15+',l:'Years in Market'},{v:'100%',l:'FSSAI Certified'}].map(s=>(
              <div key={s.l} className="p-4 bg-white rounded-2xl border border-gold-100 text-center card-hover">
                <div style={{fontFamily:"'Playfair Display',serif"}} className="text-2xl font-black text-gold-700">{s.v}</div>
                <div className="font-body text-sm text-gray-500">{s.l}</div>
              </div>
            ))}
          </div>
          <Link to="/shop" className="btn-primary text-base px-8 py-4">Shop Our Products <ArrowRight size={18}/></Link>
        </div>
        <div className="bg-gold-100 rounded-3xl p-10 text-center">
          <div className="text-[130px]" style={{animation:'float 3s ease-in-out infinite'}}>🌻</div>
          <p style={{fontFamily:"'Cormorant Garamond',serif"}} className="text-gold-700 italic text-xl mt-4">"Cooking Healthy, Living Better"</p>
        </div>
      </div>
    </section>

    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="p-8 rounded-3xl gradient-gold text-white">
            <div className="text-5xl mb-4">🎯</div>
            <h3 style={{fontFamily:"'Playfair Display',serif"}} className="text-2xl font-bold mb-3">Our Mission</h3>
            <p className="font-body text-white/90 leading-relaxed">To deliver safe, healthy, and premium cooking oils that enhance everyday meals for Indian families across the country.</p>
          </div>
          <div className="p-8 rounded-3xl bg-gradient-to-br from-gray-800 to-gray-900 text-white">
            <div className="text-5xl mb-4">🔭</div>
            <h3 style={{fontFamily:"'Playfair Display',serif"}} className="text-2xl font-bold mb-3">Our Vision</h3>
            <p className="font-body text-white/90 leading-relaxed">To become a household name known for purity, trust, and innovation in edible oils across India and beyond.</p>
          </div>
        </div>
      </div>
    </section>

    <section className="py-16 px-4 bg-warmgray">
      <div className="max-w-7xl mx-auto text-center">
        <h2 style={{fontFamily:"'Playfair Display',serif"}} className="text-3xl md:text-4xl font-black text-gray-900 mb-12">Core Values</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[{i:'⭐',t:'Quality First',d:'Every product meets the highest standards'},{i:'🤝',t:'Customer Trust',d:'Building lasting relationships'},{i:'💡',t:'Innovation',d:'Continuously improving our processes'},{i:'🔄',t:'Consistency',d:'Same great quality every time'}].map((v,i)=>(
            <div key={i} className="p-6 bg-white rounded-2xl shadow-sm border border-gold-100 card-hover">
              <div className="text-4xl mb-3">{v.i}</div>
              <h3 style={{fontFamily:"'Playfair Display',serif"}} className="font-bold text-gray-900 mb-2">{v.t}</h3>
              <p className="font-body text-sm text-gray-500">{v.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto text-center">
        <h2 style={{fontFamily:"'Playfair Display',serif"}} className="text-3xl md:text-4xl font-black text-gray-900 mb-12">Our Team</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {team.map((m,i)=>(
            <div key={i} className="p-6 bg-gold-50 rounded-2xl border border-gold-100 card-hover">
              <div className="text-5xl mb-3">{m.emoji}</div>
              <h3 style={{fontFamily:"'Playfair Display',serif"}} className="font-bold text-gray-900 text-base">{m.name}</h3>
              <p className="font-body text-sm text-gold-600 mt-1">{m.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  </div>
)
export default AboutPage
