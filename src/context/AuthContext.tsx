import React, { createContext, useContext, useState } from 'react'
import { User } from '../types'
interface AuthCtx { user:User|null; login:(e:string,p:string)=>boolean; signup:(n:string,e:string,ph:string,p:string)=>void; logout:()=>void; updateUser:(d:Partial<User>)=>void }
const Ctx = createContext<AuthCtx|null>(null)
export const AuthProvider: React.FC<{children:React.ReactNode}> = ({children}) => {
  const [user,setUser] = useState<User|null>(null)
  const login = (email:string,_p:string) => { if(email){setUser({name:'Demo User',email,phone:'+91-9876543210'});return true} return false }
  const signup = (name:string,email:string,phone:string,_p:string) => setUser({name,email,phone})
  const logout = () => setUser(null)
  const updateUser = (d:Partial<User>) => setUser(p=>p?{...p,...d}:null)
  return <Ctx.Provider value={{user,login,signup,logout,updateUser}}>{children}</Ctx.Provider>
}
export const useAuth = () => { const c=useContext(Ctx); if(!c)throw new Error('no auth'); return c }
