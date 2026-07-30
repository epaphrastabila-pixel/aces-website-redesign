'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

export type AcesUser = {
  name: string
  email: string
  phone?: string
  program?: string
  year?: string
}

type AcesAuthContextValue = {
  user: AcesUser | null
  isAuthenticated: boolean
  register: (data: { name: string; email: string; password: string; phone?: string; program?: string; year?: string }) => { ok: true } | { ok: false; error: string }
  login: (data: { email: string; password: string }) => { ok: true } | { ok: false; error: string }
  logout: () => void
  updateProfile: (data: { name?: string; phone?: string; program?: string; year?: string }) => void
}

const AcesAuthContext = createContext<AcesAuthContextValue | null>(null)

type StoredUser = AcesUser & { password: string; registeredAt: string }

function getStoredAccounts(): Record<string, StoredUser> {
  if (typeof window === 'undefined') return {}
  try {
    const raw = localStorage.getItem('aces_accounts')
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

function getSession(): AcesUser | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem('aces_session')
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function setSession(user: AcesUser) {
  localStorage.setItem('aces_session', JSON.stringify(user))
}

function clearSession() {
  localStorage.removeItem('aces_session')
}

export function AcesAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AcesUser | null>(null)

  useEffect(() => {
    const session = getSession()
    if (session) setUser(session)
  }, [])

  const register = useCallback(
    (data: { name: string; email: string; password: string; phone?: string; program?: string; year?: string }): { ok: true } | { ok: false; error: string } => {
      const email = data.email.toLowerCase().trim()
      const accounts = getStoredAccounts()

      if (accounts[email]) {
        return { ok: false, error: 'An account with this email already exists.' }
      }
      if (!data.name.trim() || !email || !data.password.trim()) {
        return { ok: false, error: 'All fields are required.' }
      }
      if (data.password.length < 6) {
        return { ok: false, error: 'Password must be at least 6 characters.' }
      }

      const record: StoredUser = {
        name: data.name.trim(),
        email,
        phone: data.phone?.trim() || undefined,
        program: data.program?.trim() || undefined,
        year: data.year || undefined,
        password: data.password,
        registeredAt: new Date().toISOString(),
      }
      accounts[email] = record
      localStorage.setItem('aces_accounts', JSON.stringify(accounts))

      const sessionUser: AcesUser = {
        name: record.name,
        email: record.email,
        phone: record.phone,
        program: record.program,
        year: record.year,
      }
      setSession(sessionUser)
      setUser(sessionUser)
      return { ok: true }
    },
    [],
  )

  const login = useCallback(
    (data: { email: string; password: string }): { ok: true } | { ok: false; error: string } => {
      const email = data.email.toLowerCase().trim()
      const accounts = getStoredAccounts()
      const record = accounts[email]

      if (!record) {
        return { ok: false, error: 'No account found with this email.' }
      }
      if (record.password !== data.password) {
        return { ok: false, error: 'Incorrect password.' }
      }

      const sessionUser: AcesUser = {
        name: record.name,
        email: record.email,
        phone: record.phone,
        program: record.program,
        year: record.year,
      }
      setSession(sessionUser)
      setUser(sessionUser)
      return { ok: true }
    },
    [],
  )

  const logout = useCallback(() => {
    clearSession()
    setUser(null)
  }, [])

  const updateProfile = useCallback(
    (data: { name?: string; phone?: string; program?: string; year?: string }) => {
      if (!user) return
      const accounts = getStoredAccounts()
      const key = user.email.toLowerCase().trim()
      const record = accounts[key]
      if (!record) return

      const updated: StoredUser = {
        ...record,
        name: data.name?.trim() || record.name,
        phone: data.phone !== undefined ? (data.phone.trim() || undefined) : record.phone,
        program: data.program !== undefined ? (data.program.trim() || undefined) : record.program,
        year: data.year !== undefined ? (data.year || undefined) : record.year,
      }
      accounts[key] = updated
      localStorage.setItem('aces_accounts', JSON.stringify(accounts))

      const sessionUser: AcesUser = {
        name: updated.name,
        email: updated.email,
        phone: updated.phone,
        program: updated.program,
        year: updated.year,
      }
      setSession(sessionUser)
      setUser(sessionUser)
    },
    [user],
  )

  const value = useMemo(
    () => ({ user, isAuthenticated: user !== null, register, login, logout, updateProfile }),
    [user, register, login, logout, updateProfile],
  )

  return <AcesAuthContext.Provider value={value}>{children}</AcesAuthContext.Provider>
}

export function useAcesAuth() {
  const ctx = useContext(AcesAuthContext)
  if (!ctx) throw new Error('useAcesAuth must be used within AcesAuthProvider')
  return ctx
}
