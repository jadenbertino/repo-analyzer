'use client'

import { redirect } from 'next/navigation'
import { useEffect } from 'react'
import { toast } from 'sonner'
import { useAuthContext } from './useAuthContext'

const useProtectRoute = () => {
  const { user, isLoading, isError } = useAuthContext()

  useEffect(() => {
    if (isLoading) return

    if (isError) {
      toast.error('Something went wrong when signing in')
      redirect('/auth/signin')
    }

    if (!user) {
      redirect('/auth/signin')
    }

    if (!user.email_confirmed_at) {
      redirect('/auth/check-email')
    }
  }, [user, isLoading, isError])
}

export { useProtectRoute }
