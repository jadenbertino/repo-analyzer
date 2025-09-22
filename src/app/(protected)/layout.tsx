'use client'

import { useProtectRoute } from '@/hooks/useProtectRoute'
import { ReactNode } from 'react'

const ProtectedLayout = ({ children }: { children: ReactNode }) => {
  useProtectRoute()

  return (
    <div>
      <div className='container m-auto py-8'>{children}</div>
    </div>
  )
}

export default ProtectedLayout
