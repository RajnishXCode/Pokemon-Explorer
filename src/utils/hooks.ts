import { useState, useEffect } from 'react'

// This saves us from making API calls on every keystroke
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)
  
  useEffect(() => {
    // Wait until typing stops for 'delay' ms before updating
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)
    
    // Clean up on every new value
    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])
  
  return debouncedValue
}
