import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const LoginPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [showPw, setShowPw] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' })
  const [error, setError] = useState('')
  const { login, signup } = useAuth()
  const navigate = useNavigate()

  const handle = async (e: React.FormEvent) => {
    e.preventDefault(); setError('')
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(form.email)) { setError('Please enter a valid email address.'); return }
    // const phoneRegex = /^\+91-\d{10}$/
    // if (!isLogin && !phoneRegex.test(form.phone)) { setError('Please enter a valid phone number in the format +91-XXXXXXXXXX.'); return }
    const email = form?.email.toLowerCase().trim() || ''
    if (isLogin) {
      const ok = await login(email, form.password)

      if (ok === true) navigate('/account'); else setError('Invalid credentials. Please try again.')
    } else {
      if (!form.name || !email || !form.phone || !form.password) { setError('Please fill all fields.'); return }
      const ok = await signup(form.name, email, form.phone, form.password)
      if (ok === true) navigate('/account')
    }
  }

  return (
    <div className="pt-24 min-h-screen bg-cream flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-xl border border-gold-100 overflow-hidden">
          <div className="gradient-gold p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-3"><span className="text-3xl">🌻</span></div>
            <h1 style={{ fontFamily: "'Playfair Display',serif" }} className="text-2xl font-black text-white">{isLogin ? 'Welcome Back!' : 'Create Account'}</h1>
            <p className="font-body text-white/80 text-sm mt-1">{isLogin ? 'Sign in to your MML account' : 'Join the MML Agro Foods family'}</p>
          </div>

          <div className="flex border-b border-gray-100">
            {['Sign In', 'Register'].map((t, i) => (
              <button key={t} onClick={() => setIsLogin(i === 0)} className={`flex-1 py-3 font-body font-semibold text-sm transition-colors ${(i === 0 ? isLogin : !isLogin) ? 'text-gold-700 border-b-2 border-gold-600' : 'text-gray-500 hover:text-gray-700'}`}>{t}</button>
            ))}
          </div>

          <form onSubmit={handle} className="p-6 md:p-8 space-y-4">
            {!isLogin && <div><label className="font-body text-sm font-medium text-gray-700 mb-1.5 block">Full Name</label><input type="text" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Your full name" className="input-field" /></div>}
            <div><label className="font-body text-sm font-medium text-gray-700 mb-1.5 block">Email Address</label><input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="your@email.com" required className="input-field" /></div>
            {!isLogin && <div><label className="font-body text-sm font-medium text-gray-700 mb-1.5 block">Phone Number</label><input type="tel" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} placeholder="9876543210" className="input-field" /></div>}
            <div>
              <label className="font-body text-sm font-medium text-gray-700 mb-1.5 block">Password</label>
              <div className="relative">
                <input type={showPw ? 'text' : 'password'} value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} placeholder="Your password" required className="input-field pr-12" />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">{showPw ? <EyeOff size={17} /> : <Eye size={17} />}</button>
              </div>
            </div>
            {error && <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm font-body">{error}</div>}
            {isLogin && <div className="text-right"><Link to="#" className="font-body text-sm text-gold-600 hover:text-gold-800">Forgot password?</Link></div>}
            <button type="submit" className="btn-primary w-full py-4 text-base">{isLogin ? 'Sign In' : 'Create Account'}</button>
            <div className="text-center font-body text-sm text-gray-500">
              {isLogin ? <>Don't have an account? <button type="button" onClick={() => setIsLogin(false)} className="text-gold-600 font-semibold">Register</button></> : <>Already have an account? <button type="button" onClick={() => setIsLogin(true)} className="text-gold-600 font-semibold">Sign In</button></>}
            </div>
          </form>
        </div>
        <p className="text-center font-body text-xs text-gray-400 mt-4">By continuing you agree to our <Link to="/terms" className="text-gold-600">Terms</Link> & <Link to="/privacy" className="text-gold-600">Privacy Policy</Link></p>
      </div>
    </div>
  )
}
export default LoginPage
