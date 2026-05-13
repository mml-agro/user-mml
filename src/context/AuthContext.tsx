// import React, { createContext, useContext, useState } from 'react'
// import { User } from '../types'
// interface AuthCtx { user: User | null; login: (e: string, p: string) => boolean; signup: (n: string, e: string, ph: string, p: string) => void; logout: () => void; updateUser: (d: Partial<User>) => void }
// const Ctx = createContext<AuthCtx | null>(null)
// export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [user, setUser] = useState<User | null>(null)
//   const login = (email: string, _p: string) => { if (email) { setUser({ name: 'Demo User', email, phone: '+91-9876543210' }); return true } return false }
//   const signup = (name: string, email: string, phone: string, _p: string) => setUser({ name, email, phone })
//   const logout = () => setUser(null)
//   const updateUser = (d: Partial<User>) => setUser(p => p ? { ...p, ...d } : null)
//   return <Ctx.Provider value={{ user, login, signup, logout, updateUser }}>{children}</Ctx.Provider>
// }
// export const useAuth = () => { const c = useContext(Ctx); if (!c) throw new Error('no auth'); return c }




import React, { createContext, useContext, useState } from 'react'
import { User } from '../types'
import { loginAPI, registerAPI, logoutAPI } from '../service'

interface AuthCtx {
  user: User | null
  login: (e: string, p: string) => Promise<boolean>
  signup: (n: string, e: string, ph: string, p: string) => Promise<boolean>
  logout: () => Promise<void>
  updateUser: (d: Partial<User>) => void
}

const Ctx = createContext<AuthCtx | null>(null)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)

  // LOGIN API
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const reqData = {
        email,
        password,
      }

      const response = await loginAPI(reqData)

      if (response?.data) {
        const userData = response.data?.user || response.data; // Adjust based on actual response structure
        const token = response.data.accessToken || response.data.token; // Adjust based on actual response structure
        setUser({
          name: userData.name,
          email: userData.email,
          phone: userData.phone,
        })
        console.log("userData====>",userData);
        console.log("token====>",token);
        // Optional: store token
        if (token) {
          sessionStorage.setItem('token', token)
        }

        return true
      }

      return false
    } catch (error) {
      console.log('Login Failed:', error)
      return false
    }
  }

  // REGISTER API
  const signup = async (
    name: string,
    email: string,
    phone: string,
    password: string
  ): Promise<boolean> => {
    try {
      const reqData = {
        name,
        email,
        phone,
        password,
      }

      const response = await registerAPI(reqData)

      if (response?.data) {
        const userData = response.data

        setUser({
          name: userData.name,
          email: userData.email,
          phone: userData.phone,
        })

        // Optional: store token
        if (userData.token) {
          sessionStorage.setItem('token', userData.token)
        }

        return true
      }

      return false
    } catch (error) {
      console.log('Signup Failed:', error)
      return false
    }
  }

  // LOGOUT API
  const logout = async () => {
    try {
      await logoutAPI()

      sessionStorage.removeItem('token')
      setUser(null)
    } catch (error) {
      console.log('Logout Failed:', error)
    }
  }

  const updateUser = (d: Partial<User>) =>
    setUser(prev => (prev ? { ...prev, ...d } : null))

  return (
    <Ctx.Provider
      value={{
        user,
        login,
        signup,
        logout,
        updateUser,
      }}
    >
      {children}
    </Ctx.Provider>
  )
}

export const useAuth = () => {
  const c = useContext(Ctx)

  if (!c) {
    throw new Error('no auth')
  }

  return c
}