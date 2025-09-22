'use client'

import {
  useAsyncOperation,
  UseAsyncOperationState,
} from '@/hooks/useAsyncOperation'
import { supabase } from '@/lib/clients/browser'
import { AuthError, Session, User } from '@supabase/supabase-js'
import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react'

type AuthContextType = {
  user: User | null
  signOut: () => Promise<void>
} & UseAsyncOperationState

const defaultAuthContext: AuthContextType = {
  user: null,
  isLoading: true,
  isError: false,
  error: null,
  signOut: async () => {},
}

const AuthContext = createContext<AuthContextType>(defaultAuthContext)

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { isLoading, isError, error, setIsLoading, setError } =
    useAsyncOperation({ initialLoading: true })
  const [user, setUser] = useState<AuthContextType['user']>(
    defaultAuthContext.user,
  )

  const handleSessionChange = useCallback(
    (session: Session | null, error?: AuthError | null) => {
      if (error) {
        setError(error)
        setUser(null)
        setIsLoading(false)
        console.error('Error getting session:', error)
        return
      }

      setUser(session?.user ?? null)
      setIsLoading(false)
      setError(null)
    },
    [setUser, setIsLoading, setError],
  )

  useEffect(() => {
    // Get initial auth state
    supabase.auth.getSession().then(({ data, error }) => {
      handleSessionChange(data.session, error)
    })

    // Listen for auth state changes (e.g., sign in, sign out)
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_eventName, session) => {
        handleSessionChange(session)
      },
    )

    // Clean up the subscription on unmount
    return () => {
      authListener.subscription?.unsubscribe()
    }
  }, [setError, setIsLoading, handleSessionChange])

  const signOut = useCallback(async () => {
    await supabase.auth.signOut()
  }, [])

  const value: AuthContextType = {
    user,
    isLoading,
    isError,
    error,
    signOut,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
