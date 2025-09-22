'use client'

import { Button } from '@/components/ui/button'
import { useAuthContext } from '@/hooks/useAuthContext'

const SignoutButton = () => {
  const { signOut, isLoading } = useAuthContext()
  return (
    <Button
      loading={isLoading}
      onClick={signOut}
    >
      Sign out
    </Button>
  )
}

export { SignoutButton }
