import { clsx, type ClassValue } from 'clsx'
import { serializeError } from 'serialize-error'
import serializeJavascript, { SerializeJSOptions } from 'serialize-javascript'
import { twMerge } from 'tailwind-merge'

function serialize(value: unknown): string {
  const options: SerializeJSOptions = {
    unsafe: true, // Disable XSS protection for readability
  }

  if (value instanceof Error) {
    return serializeJavascript(serializeError(value), options)
  }
  return serializeJavascript(value, options)
}

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export { cn, serialize }
