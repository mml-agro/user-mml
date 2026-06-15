import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ShoppingCart, User, Menu, X, Search, ChevronDown, Phone } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [userDropdown, setUserDropdown] = useState(false)
  const { totalItems } = useCart()
  const { user, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => { setMenuOpen(false); setUserDropdown(false) }, [location])

  const links = [
    {to:'/',label:'Home'},{to:'/shop',label:'Shop'},{to:'/about',label:'About'},
    {to:'/bulk-orders',label:'Bulk Orders'},{to:'/blog',label:'Blog'},{to:'/contact',label:'Contact'},
  ]

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if(searchQuery.trim()){ navigate(`/shop?q=${encodeURIComponent(searchQuery)}`); setSearchOpen(false); setSearchQuery('') }
  }

  return (
    <>
      {/* Top bar */}
      <div className="hidden md:block bg-gold-800 text-white text-xs py-2 text-center font-body">
        🌻 Free Delivery on Orders Above ₹999 &nbsp;|&nbsp;
        <Phone size={11} className="inline mr-1"/>+91-8111068222 &nbsp;|&nbsp;
        info@mmlagrofoods.com
      </div>

      <nav className={`fixed ${scrolled?'top-0':'md:top-8 top-0'} left-0 right-0 z-50 transition-all duration-300 ${scrolled?'bg-cream/95 backdrop-blur-md shadow-md':'bg-cream'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-11 h-11 rounded-full gradient-gold flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                <span className="text-2xl">🌻</span>
              </div>
              <div className="leading-tight">
                <div style={{fontFamily:"'Playfair Display',serif"}} className="text-lg md:text-xl font-bold text-gray-900">MML Agro</div>
                <div style={{fontFamily:"'Cormorant Garamond',serif"}} className="text-xs text-gold-600 italic tracking-wider">Foods</div>
              </div>
            </Link>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center gap-0.5">
              {links.map(l => (
                <Link key={l.to} to={l.to} className={`px-3.5 py-2 rounded-lg font-body text-sm font-medium transition-all ${location.pathname===l.to?'text-gold-700 bg-gold-50':'text-gray-700 hover:text-gold-700 hover:bg-gold-50'}`}>{l.label}</Link>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1.5 md:gap-2">
              <button onClick={()=>setSearchOpen(true)} className="p-2 rounded-full hover:bg-gold-50 text-gray-600 hover:text-gold-700 transition-colors"><Search size={19}/></button>

              <Link to="/cart" className="relative p-2 rounded-full hover:bg-gold-50 text-gray-600 hover:text-gold-700 transition-colors">
                <ShoppingCart size={19}/>
                {totalItems>0 && <span className="absolute -top-1 -right-1 w-5 h-5 bg-saffron text-white text-xs rounded-full flex items-center justify-center font-bold animate-bounce">{totalItems>9?'9+':totalItems}</span>}
              </Link>

              {user ? (
                <div className="relative hidden md:block">
                  <button onClick={()=>setUserDropdown(!userDropdown)} className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-gold-50 hover:bg-gold-100 text-gold-700 font-body text-sm font-medium transition-colors">
                    <div className="w-6 h-6 rounded-full gradient-gold flex items-center justify-center text-white text-xs font-bold">{user.name[0]}</div>
                    <span className="max-w-[80px] truncate">{user.name.split(' ')[0]}</span>
                    <ChevronDown size={13} className={`transition-transform ${userDropdown?'rotate-180':''}`}/>
                  </button>
                  {userDropdown && (
                    <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-2xl shadow-xl border border-gold-100 py-2 z-50">
                      <Link to="/account" className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gold-50 hover:text-gold-700 transition-colors font-body">👤 My Profile</Link>
                      <Link to="/orders" className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gold-50 hover:text-gold-700 transition-colors font-body">📦 My Orders</Link>
                      <Link to="/wishlist" className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gold-50 hover:text-gold-700 transition-colors font-body">❤️ Wishlist</Link>
                      <div className="my-1 border-t border-gray-100"/>
                      <button onClick={()=>{logout();setUserDropdown(false)}} className="w-full text-left flex items-center gap-2 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors font-body">🚪 Sign Out</button>
                    </div>
                  )}
                </div>
              ) : (
                <Link to="/login" className="hidden md:flex btn-primary text-sm px-4 py-2"><User size={14}/>Sign In</Link>
              )}

              <button onClick={()=>setMenuOpen(!menuOpen)} className="lg:hidden p-2 rounded-full hover:bg-gold-50 text-gray-700 transition-colors">
                {menuOpen?<X size={22}/>:<Menu size={22}/>}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="lg:hidden bg-white border-t border-gold-100 shadow-xl animate-fade-up">
            <div className="px-4 py-4 space-y-1">
              {links.map(l => (
                <Link key={l.to} to={l.to} className={`block px-4 py-3 rounded-xl font-body font-medium transition-colors ${location.pathname===l.to?'bg-gold-50 text-gold-700':'text-gray-700 hover:bg-gold-50 hover:text-gold-700'}`}>{l.label}</Link>
              ))}
              <div className="border-t border-gray-100 pt-3 mt-3 space-y-1">
                {user ? (
                  <>
                    <Link to="/account" className="block px-4 py-3 rounded-xl text-gray-700 hover:bg-gold-50 font-body">👤 My Profile</Link>
                    <Link to="/orders" className="block px-4 py-3 rounded-xl text-gray-700 hover:bg-gold-50 font-body">📦 My Orders</Link>
                    <button onClick={logout} className="w-full text-left px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 font-body">🚪 Sign Out</button>
                  </>
                ) : (
                  <Link to="/login" className="block btn-primary text-center w-full">Sign In / Register</Link>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Search overlay */}
      {searchOpen && (
        <div className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-start justify-center pt-24 px-4" onClick={()=>setSearchOpen(false)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl p-6 animate-fade-up" onClick={e=>e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 style={{fontFamily:"'Playfair Display',serif"}} className="text-xl font-bold text-gray-900">Search Products</h3>
              <button onClick={()=>setSearchOpen(false)} className="p-2 rounded-full hover:bg-gray-100"><X size={18}/></button>
            </div>
            <form onSubmit={handleSearch} className="flex gap-3">
              <input type="text" value={searchQuery} onChange={e=>setSearchQuery(e.target.value)} placeholder="Search oils, brands..." autoFocus className="input-field flex-1"/>
              <button type="submit" className="btn-primary px-5"><Search size={17}/></button>
            </form>
            <div className="mt-4 flex flex-wrap gap-2">
              {['Sunflower Oil','MML Gold','Sunnova','Deepam Oil','Bulk Order'].map(tag=>(
                <button key={tag} onClick={()=>setSearchQuery(tag)} className="px-3 py-1.5 rounded-full bg-gold-50 text-gold-700 text-sm font-body hover:bg-gold-100 transition-colors">{tag}</button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
export default Navbar
