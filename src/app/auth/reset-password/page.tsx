'use client'

// wip page

import { supabase } from '@/lib/clients/browser'
import { useEffect } from 'react'
import { toast } from 'sonner'

function ResetPasswordPage() {
  useEffect(() => {
    supabase.auth.onAuthStateChange(async (event, session) => {
      if (event == 'PASSWORD_RECOVERY') {
        const newPassword = prompt(
          'What would you like your new password to be?',
        )
        if (!newPassword) {
          toast.error('No password provided')
          return
        }
        const { data, error } = await supabase.auth.updateUser({
          password: newPassword,
        })
        if (data) toast.success('Password updated successfully!')
        if (error) toast.error('There was an error updating your password.')
      }
    })
  }, [])
  return <div></div>
}
