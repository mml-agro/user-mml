import React from 'react'
import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin } from 'lucide-react'

const Footer: React.FC = () => {
  const quickLinks = [['/', 'Home'], ['/about', 'About Us'], ['/shop', 'Shop'], ['/bulk-orders', 'Bulk Orders'], ['/blog', 'Blog'], ['/contact', 'Contact Us']]
  const policies = [['/privacy', 'Privacy Policy'], ['/terms', 'Terms & Conditions'], ['/shipping', 'Shipping Policy'], ['/returns', 'Return Policy']]

  return (
    <footer className="bg-gray-900 text-white">
      {/* CTA strip */}
      <div className="gradient-gold py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h3 style={{fontFamily:"'Playfair Display',serif"}} className="text-2xl md:text-4xl font-bold text-white mb-3">Switch to Healthier Cooking with MML</h3>
          <p className="font-body text-white/90 mb-7 text-lg">Join 10,000+ families who trust MML Agro Foods for pure, nutritious cooking oils.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link to="/shop" className="bg-white text-gold-700 font-body font-bold px-8 py-3.5 rounded-full hover:bg-gold-50 transition-colors shadow-lg">Shop Now</Link>
            <Link to="/bulk-orders" className="border-2 border-white text-white font-body font-semibold px-8 py-3.5 rounded-full hover:bg-white/10 transition-colors">Bulk Orders</Link>
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full gradient-gold flex items-center justify-center"><span className="text-xl">🌻</span></div>
              <div>
                <div style={{fontFamily:"'Playfair Display',serif"}} className="text-lg font-bold">MML Agro Foods</div>
                <div style={{fontFamily:"'Cormorant Garamond',serif"}} className="text-xs text-gold-400 italic">Pure. Trusted. Healthy.</div>
              </div>
            </div>
            <p className="font-body text-gray-400 text-sm leading-relaxed mb-5">Delivering premium cooking oils to Indian families with a commitment to purity, nutrition, and quality since 2010.</p>
            <div className="flex gap-2.5">
              {['📸 Instagram','👍 Facebook','▶️ YouTube'].map((s,i)=>(
                <a key={i} href="#" className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-gold-600 text-xs font-body transition-colors">{s.split(' ')[1]}</a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-body text-xs font-bold uppercase tracking-widest text-gold-400 mb-5">Quick Links</h4>
            <ul className="space-y-2.5">
              {quickLinks.map(([to,label])=>(
                <li key={to}><Link to={to} className="font-body text-gray-400 hover:text-gold-400 text-sm transition-colors flex items-center gap-2"><span className="text-gold-600 text-base">›</span>{label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h4 className="font-body text-xs font-bold uppercase tracking-widest text-gold-400 mb-5">Policies</h4>
            <ul className="space-y-2.5">
              {policies.map(([to,label])=>(
                <li key={to}><Link to={to} className="font-body text-gray-400 hover:text-gold-400 text-sm transition-colors flex items-center gap-2"><span className="text-gold-600 text-base">›</span>{label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-body text-xs font-bold uppercase tracking-widest text-gold-400 mb-5">Contact Us</h4>
            <ul className="space-y-4 mb-5">
              <li className="flex items-start gap-3"><Phone size={15} className="text-gold-500 mt-0.5 shrink-0"/><span className="font-body text-gray-400 text-sm">+91-8111068222</span></li>
              <li className="flex items-start gap-3"><Mail size={15} className="text-gold-500 mt-0.5 shrink-0"/><a href="mailto:info@mmlagrofoods.com" className="font-body text-gray-400 hover:text-gold-400 text-sm">info@mmlagrofoods.com</a></li>
              <li className="flex items-start gap-3"><MapPin size={15} className="text-gold-500 mt-0.5 shrink-0"/><span className="font-body text-gray-400 text-sm">Your Business Address, India</span></li>
            </ul>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <p style={{fontFamily:"'Cormorant Garamond',serif"}} className="text-gold-400 italic text-sm leading-relaxed">"MML Agro Foods – Cooking Healthy, Living Better."</p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-gray-500 text-sm">© 2025 MML Agro Foods. All rights reserved.</p>
          <div className="flex items-center gap-2 flex-wrap justify-center">
            <span className="font-body text-gray-500 text-xs">Payments:</span>
            {['UPI','VISA','Mastercard','COD','RuPay'].map(p=>(
              <span key={p} className="px-2.5 py-1 rounded bg-white/10 text-xs font-body text-gray-300">{p}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
export default Footer
