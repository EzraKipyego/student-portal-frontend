import React, { createContext, useContext, useEffect, useState } from 'react'
import { api, clearTokens, setTokens } from '../lib/api'

const AuthContext = createContext(null)

function persistUser(user) {
  if (user) {
    localStorage.setItem('user', JSON.stringify(user))
  } else {
    localStorage.removeItem('user')
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('access_token')
    if (!token) {
      setLoading(false)
      return
    }
    api
      .get('/api/auth/me/')
      .then((user) => {
        setUser(user)
        persistUser(user)
      })
      .catch(() => {
        clearTokens()
        setUser(null)
      })
      .finally(() => setLoading(false))
  }, [])

  async function login(email, password) {
    try {
      const data = await api.post('/api/auth/login/', { email, password })
      setTokens({ access: data.access, refresh: data.refresh })
      setUser(data.user)
      persistUser(data.user)
      return { success: true }
    } catch (err) {
      return { success: false, error: err.message }
    }
  }

  async function register(payload) {
    try {
      await api.post('/api/auth/register/', payload)
      return { success: true }
    } catch (err) {
      return { success: false, error: err.message }
    }
  }

  function logout() {
    clearTokens()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}