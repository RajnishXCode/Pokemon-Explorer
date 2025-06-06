'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Check initial scroll position

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header 
      className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${
        isScrolled 
          ? 'border-gray-200 bg-white/95 backdrop-blur-md shadow-sm' 
          : 'border-transparent bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2 group">
          <div className="relative w-8 h-8 overflow-hidden transform group-hover:rotate-12 transition-transform duration-300">
            <div className="absolute inset-0 bg-red-500 rounded-full top-0"></div>
            <div className="absolute inset-0 bg-white rounded-full top-1/2"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-2.5 h-2.5 bg-white rounded-full border-2 border-gray-800"></div>
            </div>
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500 bg-clip-text text-transparent">
            PokéExplorer
          </span>
        </Link>
      </div>
    </header>
  )
}