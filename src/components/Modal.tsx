'use client'

import { Dialog, DialogContent } from '@/components/ui/dialog'
import { ReactNode } from 'react'

interface ModalProps {
  open: boolean
  onClose: (open: boolean) => void
  children: ReactNode
}

export default function Modal({ open, onClose, children }: ModalProps) {
  return (
    <Dialog
      open={open}
      onOpenChange={onClose}
    >
      <DialogContent className='sm:max-w-lg'>{children}</DialogContent>
    </Dialog>
  )
}
