import React, { createContext, useContext, useState, useCallback } from 'react'
import { CartItem, Product } from '../types'
interface CartCtx {
  items: CartItem[]
  addToCart: (p:Product, size:'1L'|'5L'|'15L') => void
  removeFromCart: (id:number, size:string) => void
  updateQty: (id:number, size:string, qty:number) => void
  clearCart: () => void
  totalItems: number
  totalPrice: number
}
const Ctx = createContext<CartCtx|null>(null)
export const CartProvider: React.FC<{children:React.ReactNode}> = ({children}) => {
  const [items, setItems] = useState<CartItem[]>([])
  const addToCart = useCallback((p:Product, size:'1L'|'5L'|'15L') => {
    setItems(prev => {
      const ex = prev.find(i => i.product.id===p.id && i.size===size)
      if(ex) return prev.map(i => i.product.id===p.id && i.size===size ? {...i,quantity:i.quantity+1} : i)
      return [...prev,{product:p,size,quantity:1}]
    })
  },[])
  const removeFromCart = useCallback((id:number,size:string) => setItems(p=>p.filter(i=>!(i.product.id===id&&i.size===size))),[])
  const updateQty = useCallback((id:number,size:string,qty:number) => {
    if(qty<=0){removeFromCart(id,size);return}
    setItems(p=>p.map(i=>i.product.id===id&&i.size===size?{...i,quantity:qty}:i))
  },[removeFromCart])
  const clearCart = useCallback(()=>setItems([]),[])
  const totalItems = items.reduce((s,i)=>s+i.quantity,0)
  const totalPrice = items.reduce((s,i)=>s+i.product.price[i.size]*i.quantity,0)
  return <Ctx.Provider value={{items,addToCart,removeFromCart,updateQty,clearCart,totalItems,totalPrice}}>{children}</Ctx.Provider>
}
export const useCart = () => { const c=useContext(Ctx); if(!c)throw new Error('no cart'); return c }
