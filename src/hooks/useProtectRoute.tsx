'use client'

import { redirect } from 'next/navigation'
import { useEffect } from 'react'
import { useAuthContext } from './useAuthContext'

const useProtectRoute = () => {
  const { user, isLoading, isError, error } = useAuthContext()

  useEffect(() => {
    if (isLoading) return

    if (isError) {
      redirect('/auth/signin')
    }

    if (!user) {
      redirect('/auth/signin')
    }

    if (!user.email_confirmed_at) {
      redirect('/auth/check-email')
    }
  }, [user, isLoading, isError, error])
}

export { useProtectRoute }
