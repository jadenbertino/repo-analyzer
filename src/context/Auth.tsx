'use client'

import { supabase } from '@/lib/clients/public'
import { User } from '@supabase/supabase-js'
import { createContext, ReactNode, useEffect, useState } from 'react'

type AuthContextType = {
  user: User | null
}

const defaultAuthContext: AuthContextType = {
  user: null,
}

const AuthContext = createContext<AuthContextType>(defaultAuthContext)

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthContextType['user']>(
    defaultAuthContext.user,
  )

  useEffect(() => {
    // Check the current session when the component mounts
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
    })

    // Listen for changes on the auth state (e.g., sign in, sign out)
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null)
      },
    )

    // Clean up the subscription on unmount
    return () => {
      authListener.subscription?.unsubscribe()
    }
  }, [])
  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }
