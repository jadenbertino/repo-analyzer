'use client'

import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'
import { X } from 'lucide-react'
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
      onClose={onClose}
      className='relative z-10'
    >
      <DialogBackdrop
        transition
        className='fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in dark:bg-gray-900/50'
      />

      <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
        <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
          <DialogPanel
            transition
            className='relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg sm:p-6 data-closed:sm:translate-y-0 data-closed:sm:scale-95 dark:bg-gray-800 dark:outline dark:-outline-offset-1 dark:outline-white/10'
          >
            <div className='absolute top-0 right-0 hidden pt-4 pr-4 sm:block'>
              <button
                type='button'
                onClick={() => onClose(false)}
                className='rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-2 focus:outline-offset-2 focus:outline-indigo-600 dark:bg-gray-800 dark:hover:text-gray-300 dark:focus:outline-white'
              >
                <span className='sr-only'>Close</span>
                <X
                  aria-hidden='true'
                  className='size-6'
                />
              </button>
            </div>

            {children}
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}
