import React, { createContext, useContext, useEffect, useState } from 'react'
import { User } from '../types'
import { loginAPI, registerAPI, logoutAPI } from '../service'

interface AuthCtx {
  user: User | null
  isLoading: boolean
  login: (e: string, p: string) => Promise<boolean>
  signup: (n: string, e: string, ph: string, p: string) => Promise<boolean>
  logout: () => Promise<void>
  updateUser: (d: Partial<User>) => void
}

const Ctx = createContext<AuthCtx | null>(null)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const storedUser = sessionStorage.getItem('user');
    const token = sessionStorage.getItem('token');

    if (storedUser && token) {
      try {
        const parsedUser = JSON.parse(storedUser);

        setUser({
          name: parsedUser.name,
          email: parsedUser.email,
          phone: parsedUser.phone,
        });
      } catch (error) {
        console.error('Failed to parse stored user', error);
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('token');
      }
    }

    setIsLoading(false)
  }, []);

  // LOGIN API
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const reqData = {
        email,
        password,
      }

      const response = await loginAPI(reqData)

      if (response?.data) {
        const userData = response.data?.user || response.data;
        const token = response.data.accessToken || response.data.token;

        setUser({
          name: userData.name,
          email: userData.email,
          phone: userData.phone,
        })

        if (token) {
          sessionStorage.setItem('token', token)
          sessionStorage.setItem('user', JSON.stringify(userData))
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
        role: 'CUSTOMER'
      }

      const response = await registerAPI(reqData)

      if (response?.data) {
        const userData = response.data?.user || response.data;
        const token = response.data.accessToken || response.data.token;

        setUser({
          name: userData.name,
          email: userData.email,
          phone: userData.phone,
        })

        if (token) {
          sessionStorage.setItem('token', token)
          sessionStorage.setItem('user', JSON.stringify(userData))
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
      sessionStorage.removeItem('user')
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
        isLoading,
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