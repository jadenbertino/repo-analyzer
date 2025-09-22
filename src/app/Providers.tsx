'use client'

import { AuthProvider } from '@/context/Auth'
import { ReactNode } from 'react'

const Providers = ({ children }: { children: ReactNode }) => {
  return <AuthProvider>{children}</AuthProvider>
}

export { Providers }
