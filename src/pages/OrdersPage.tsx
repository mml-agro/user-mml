import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { mockOrders } from '../data'

const statusColor: Record<string,string> = {
  Delivered:'bg-green-100 text-green-700 border border-green-200',
  Processing:'bg-blue-100 text-blue-700 border border-blue-200',
  Shipped:'bg-purple-100 text-purple-700 border border-purple-200',
  Cancelled:'bg-red-100 text-red-700 border border-red-200',
}

const OrdersPage: React.FC = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  if(!user){ navigate('/login'); return null }

  return (
    <div className="pt-24 md:pt-36 min-h-screen bg-cream">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h1 style={{fontFamily:"'Playfair Display',serif"}} className="text-3xl font-black text-gray-900">My Orders</h1>
          <Link to="/account" className="font-body text-sm text-gold-600 hover:text-gold-800">← My Account</Link>
        </div>
        <div className="space-y-4">
          {mockOrders.map(order=>(
            <div key={order.id} className="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-gold-100 card-hover">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                <div>
                  <h3 style={{fontFamily:"'Playfair Display',serif"}} className="font-bold text-gray-900 text-lg">{order.id}</h3>
                  <p className="font-body text-sm text-gray-400 mt-0.5">{order.date}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-body font-bold ${statusColor[order.status]}`}>{order.status}</span>
              </div>
              <div className="border-t border-gray-100 pt-4 flex flex-wrap justify-between items-end gap-4">
                <div>
                  {order.items.map((item,i)=>(
                    <p key={i} className="font-body text-sm text-gray-700 mb-0.5">• {item}</p>
                  ))}
                </div>
                <div className="text-right">
                  <p className="font-body text-xs text-gray-400">Order Total</p>
                  <p style={{fontFamily:"'Playfair Display',serif"}} className="font-bold text-xl text-gold-700">₹{order.total.toLocaleString()}</p>
                </div>
              </div>
              <div className="flex gap-3 mt-4 pt-4 border-t border-gray-100">
                <button className="px-4 py-2 rounded-xl text-xs font-body font-semibold bg-gold-50 text-gold-700 hover:bg-gold-100 transition-colors">Track Order</button>
                {order.status==='Delivered'&&<button className="px-4 py-2 rounded-xl text-xs font-body font-semibold bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors">Reorder</button>}
                <button className="px-4 py-2 rounded-xl text-xs font-body font-semibold bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors">Invoice</button>
              </div>
            </div>
          ))}
        </div>
        {mockOrders.length===0&&(
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📦</div>
            <h3 style={{fontFamily:"'Playfair Display',serif"}} className="text-xl font-bold text-gray-900 mb-2">No orders yet</h3>
            <p className="font-body text-gray-500 mb-6">Start shopping to see your orders here</p>
            <Link to="/shop" className="btn-primary">Shop Now</Link>
          </div>
        )}
      </div>
    </div>
  )
}
export default OrdersPage
