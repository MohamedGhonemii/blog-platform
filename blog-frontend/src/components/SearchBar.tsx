'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import debounce from 'lodash/debounce'

export default function SearchBar() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '')
  const [isTyping, setIsTyping] = useState(false)

  // Create debounced search function
  const debouncedSearch = useCallback(
    debounce((query: string) => {
      const params = new URLSearchParams(searchParams.toString())
      
      if (query) {
        params.set('q', query)
      } else {
        params.delete('q')
      }
      
      // Update URL without page reload
      router.push(`/blog?${params.toString()}`, { scroll: false })
      setIsTyping(false)
    }, 500), // 500ms delay
    [router, searchParams]
  )

  // Handle input change
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchQuery(value)
    setIsTyping(true)
    debouncedSearch(value)
  }

  // Clear search
  const handleClear = () => {
    setSearchQuery('')
    setIsTyping(false)
    const params = new URLSearchParams(searchParams.toString())
    params.delete('q')
    router.push(`/blog?${params.toString()}`, { scroll: false })
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      debouncedSearch.cancel()
    }
  }, [debouncedSearch])

  return (
    <div className="relative w-full">
      <div className="relative">
        <svg 
          className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
          />
        </svg>
        
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search articles, tutorials, guides..."
          className="w-full rounded-lg border border-gray-300 py-3 pl-12 pr-12 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 input-glow"
        />
        
        {/* Clear button */}
        {searchQuery && (
          <button
            onClick={handleClear}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
        
        {/* Typing indicator */}
        {isTyping && (
          <div className="absolute right-12 top-1/2 -translate-y-1/2">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-blue-500"></div>
          </div>
        )}
      </div>
      
      {/* Search info */}
      {searchQuery && (
        <div className="mt-2 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Searching for: <span className="font-medium">"{searchQuery}"</span>
          </p>
          <button
            onClick={handleClear}
            className="text-sm text-blue-600 hover:text-blue-700"
          >
            Clear search
          </button>
        </div>
      )}
    </div>
  )
}
