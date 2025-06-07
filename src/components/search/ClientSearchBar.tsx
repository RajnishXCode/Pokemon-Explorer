'use client'

import { useState, useEffect } from 'react'
import { useDebounce } from '@/utils/hooks'

interface ClientSearchBarProps {
  placeholder?: string
  defaultQuery?: string
  onSearch?: (query: string) => void
}

export function ClientSearchBar({ 
  placeholder = 'Search for a Pokémon...', 
  defaultQuery = '', 
  onSearch 
}: ClientSearchBarProps) {
  const [value, setValue] = useState(defaultQuery)
  const [isSearching, setIsSearching] = useState(false)
  
  // Don't want to hammer the search on every keystroke
  const debouncedValue = useDebounce(value, 300)

  // Handle the actual search after debounce
  useEffect(() => {
    if (onSearch) {
      // Only show loading state if we're actually typing something
      if (debouncedValue !== defaultQuery) {
        setIsSearching(true)
      }
      
      // This feels a bit hacky but it makes the UI feel more responsive
      // by showing the loading state for at least a moment
      setTimeout(() => {
        onSearch(debouncedValue)
        setIsSearching(false)
      }, 200)
    }
  }, [debouncedValue, onSearch, defaultQuery])
  
  return (
    <div className="relative">
      <input
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {isSearching && (
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          {/* Spinner icon would go here */}
          <div className="animate-spin h-5 w-5 border-2 border-blue-500 rounded-full border-t-transparent"></div>
        </div>
      )}
    </div>
  )
}
