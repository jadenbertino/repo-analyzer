'use client'

import { useProtectRoute } from '@/hooks/useProtectRoute'
import { ReactNode } from 'react'

const ProtectedLayout = ({ children }: { children: ReactNode }) => {
  useProtectRoute()
  return <div>{children}</div>
}

export default ProtectedLayout
