'use client'

import { Button } from '@/components/ui/button'
import { useAuthContext } from '@/hooks/useAuthContext'
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import { User } from 'lucide-react'

const Nav = ({ title }: { title: string }) => {
  return (
    <div className='md:flex md:items-center md:justify-between'>
      <div className='min-w-0 flex-1'>
        <h2 className='text-2xl/7 font-bold text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight dark:text-white'>
          {title}
        </h2>
      </div>
      <div className='mt-4 flex md:mt-0 md:ml-4'>
        <UserDropdown />
      </div>
    </div>
  )
}

const UserDropdown = () => {
  const { user, signOut } = useAuthContext()

  return (
    <Popover className='relative'>
      <PopoverButton className='flex items-center justify-center w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2'>
        <User className='w-5 h-5 text-gray-600 dark:text-gray-300' />
      </PopoverButton>

      <PopoverPanel
        className='absolute right-0 z-10 mt-4 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-4 transition duration-200 ease-out data-[closed]:opacity-0 data-[closed]:scale-95 data-[closed]:-translate-y-2 data-[enter]:duration-200 data-[leave]:duration-150'
        transition
      >
        <div className='space-y-3'>
          <div className='border-b border-gray-200 dark:border-gray-700 pb-3'>
            <p className='text-sm font-medium text-gray-900 dark:text-white'>
              Signed in as
            </p>
            <p className='text-sm text-gray-600 dark:text-gray-300 truncate'>
              {user?.email}
            </p>
            <p className='text-xs text-gray-500 dark:text-gray-400 truncate mt-1'>
              ID: {user?.id}
            </p>
          </div>

          <Button
            variant='outline'
            size='sm'
            onClick={signOut}
            className='w-full'
          >
            Sign out
          </Button>
        </div>
      </PopoverPanel>
    </Popover>
  )
}

export { Nav }
