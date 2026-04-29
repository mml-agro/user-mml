import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const AccountPage: React.FC = () => {
  const { user, updateUser, logout } = useAuth()
  const navigate = useNavigate()
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState({name:user?.name||'',email:user?.email||'',phone:user?.phone||''})
  const [saved, setSaved] = useState(false)

  if(!user){ navigate('/login'); return null }

  const handleSave = () => { updateUser(form); setEditing(false); setSaved(true); setTimeout(()=>setSaved(false),2000) }

  const sideLinks = [
    {to:'/account',l:'👤 My Profile',active:true},
    {to:'/orders',l:'📦 My Orders',active:false},
    {to:'/wishlist',l:'❤️ Wishlist',active:false},
    {to:'/addresses',l:'📍 Saved Addresses',active:false},
    {to:'/payment-methods',l:'💳 Payment Methods',active:false},
  ]

  return (
    <div className="pt-24 md:pt-36 min-h-screen bg-cream">
      <div className="max-w-5xl mx-auto px-4 py-12">
        <h1 style={{fontFamily:"'Playfair Display',serif"}} className="text-3xl font-black text-gray-900 mb-8">My Account</h1>
        <div className="grid md:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gold-100 text-center mb-4">
              <div className="w-20 h-20 rounded-full gradient-gold flex items-center justify-center mx-auto mb-3 text-3xl font-bold text-white" style={{fontFamily:"'Playfair Display',serif"}}>{user.name[0]}</div>
              <h2 style={{fontFamily:"'Playfair Display',serif"}} className="font-bold text-gray-900">{user.name}</h2>
              <p className="font-body text-sm text-gray-500">{user.email}</p>
              <p className="font-body text-xs text-gold-600 mt-1">MML Member</p>
            </div>
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gold-100">
              {sideLinks.map((item,i)=>(
                <Link key={i} to={item.to} className={`block px-4 py-3 font-body text-sm border-b border-gray-50 transition-colors ${item.active?'text-gold-700 bg-gold-50 font-semibold':'text-gray-700 hover:bg-gold-50 hover:text-gold-700'}`}>{item.l}</Link>
              ))}
              <button onClick={()=>{logout();navigate('/')}} className="w-full text-left px-4 py-3 font-body text-sm text-red-500 hover:bg-red-50 transition-colors">🚪 Sign Out</button>
            </div>
          </div>

          {/* Profile */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gold-100 mb-6">
              <div className="flex justify-between items-center mb-6">
                <h2 style={{fontFamily:"'Playfair Display',serif"}} className="text-2xl font-bold text-gray-900">My Profile</h2>
                {saved && <span className="text-green-600 font-body text-sm">✓ Saved!</span>}
                <button onClick={()=>editing?handleSave():setEditing(true)} className={editing?'btn-primary text-sm px-4 py-2':'btn-outline text-sm px-4 py-2'}>{editing?'Save Changes':'Edit Profile'}</button>
              </div>
              <div className="space-y-4">
                {[{k:'name',l:'Full Name',t:'text'},{k:'email',l:'Email Address',t:'email'},{k:'phone',l:'Phone Number',t:'tel'}].map(f=>(
                  <div key={f.k}>
                    <label className="font-body text-sm font-medium text-gray-700 mb-1.5 block">{f.l}</label>
                    <input type={f.t} value={form[f.k as keyof typeof form]} onChange={e=>setForm(p=>({...p,[f.k]:e.target.value}))} disabled={!editing}
                      className={`w-full px-4 py-3 rounded-xl border-2 font-body transition-colors ${editing?'border-gold-300 focus:border-gold-500 outline-none bg-white':'border-gray-100 bg-gray-50 text-gray-700'}`}/>
                  </div>
                ))}
                {editing && <button onClick={()=>setEditing(false)} className="btn-outline text-sm px-4 py-2">Cancel</button>}
              </div>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-4">
              {[{v:'4',l:'Total Orders',i:'📦'},{v:'₹5,920',l:'Total Spent',i:'💰'},{v:'2',l:'Wishlist Items',i:'❤️'}].map((s,i)=>(
                <div key={i} className="bg-white rounded-2xl p-4 text-center shadow-sm border border-gold-100">
                  <div className="text-2xl mb-1">{s.i}</div>
                  <div style={{fontFamily:"'Playfair Display',serif"}} className="text-xl font-bold text-gold-700">{s.v}</div>
                  <div className="font-body text-xs text-gray-500">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default AccountPage
