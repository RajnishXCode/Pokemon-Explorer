'use client'

import { useState, useEffect } from 'react'
import { useDebounce } from '../../utils/hooks'

interface ClientSearchBarProps {
  placeholder?: string
  defaultQuery?: string
  onSearch?: (query: string) => void
}

export function ClientSearchBar({ 
  placeholder = 'Search...', 
  defaultQuery = '', 
  onSearch 
}: ClientSearchBarProps) {
  const [value, setValue] = useState(defaultQuery)
  const [isSearching, setIsSearching] = useState(false)
  
  // Debounce search value for better performance
  const debouncedValue = useDebounce(value, 300)

  // Effect for debounced search
  useEffect(() => {
    if (onSearch) {
      setIsSearching(true)
      onSearch(debouncedValue)
      // Simulate a short delay for the loading indicator
      const timer = setTimeout(() => setIsSearching(false), 300)
      return () => clearTimeout(timer)
    }
  }, [debouncedValue, onSearch])

  // Update the input value when defaultQuery changes (e.g., from URL)
  useEffect(() => {
    if (defaultQuery !== value) {
      setValue(defaultQuery)
    }
  }, [defaultQuery])

  const handleSearch = (newValue: string) => {
    setValue(newValue)
  }
  
  return (
    <div className="relative">      <input
        type="search"
        value={value}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-2 rounded-lg text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        aria-label="Search Pokemon"
      />
      {isSearching && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  )
}
