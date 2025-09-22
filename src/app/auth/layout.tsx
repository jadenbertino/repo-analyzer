'use client'

import { useAuthContext } from '@/hooks/useAuthContext'
import { redirect } from 'next/navigation'
import { ReactNode, useEffect } from 'react'

const AuthLayout = ({ children }: { children: ReactNode }) => {
  const { user } = useAuthContext()
  useEffect(() => {
    if (user) {
      if (user.email_confirmed_at) {
        redirect('/dash')
      } else {
        redirect('/auth/check-email')
      }
    }
  }, [user])

  return <div>{children}</div>
}

export default AuthLayout
