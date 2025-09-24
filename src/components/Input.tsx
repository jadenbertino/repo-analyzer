import { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  id: string
}

export default function Input({
  label,
  id,
  className = '',
  ...props
}: InputProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className='block text-sm/6 font-medium text-gray-900 dark:text-white'
      >
        {label}
      </label>
      <div className='mt-2'>
        <input
          id={id}
          className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500 ${className}`}
          {...props}
        />
      </div>
    </div>
  )
}
