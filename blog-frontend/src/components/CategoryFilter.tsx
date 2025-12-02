'use client'

import { Category } from '@/lib/api'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'

interface CategoryFilterProps {
  categories: Category[]
  activeCategory?: string
}

export default function CategoryFilter({ categories, activeCategory }: CategoryFilterProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [selectedCategory, setSelectedCategory] = useState<string>(activeCategory || '')

  // Handle category selection
  const handleCategoryClick = (categorySlug: string) => {
    const params = new URLSearchParams(searchParams.toString())
    
    if (categorySlug === selectedCategory || categorySlug === '') {
      // Clear category filter
      params.delete('category')
      setSelectedCategory('')
    } else {
      // Set new category filter
      params.set('category', categorySlug)
      setSelectedCategory(categorySlug)
    }
    
    // Remove search when filtering by category
    params.delete('q')
    
    // Update URL
    router.push(`/blog?${params.toString()}`, { scroll: false })
  }

  // Clear all filters
  const handleClearFilters = () => {
    setSelectedCategory('')
    router.push('/blog', { scroll: false })
  }

  // Sync with URL params
  useEffect(() => {
    const category = searchParams.get('category')
    setSelectedCategory(category || '')
  }, [searchParams])

  return (
    <div className="mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Filter by Category</h3>
          <p className="text-sm text-gray-600">Click a category to filter posts</p>
        </div>
        
        {/* Clear filters button */}
        {(selectedCategory || searchParams.get('q')) && (
          <button
            onClick={handleClearFilters}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            Clear all filters
          </button>
        )}
      </div>
      
      <div className="flex flex-wrap gap-3">
        {/* All Categories button */}
        <button
          onClick={() => handleCategoryClick('')}
          className={`px-6 py-3 rounded-lg font-medium transition-colors ${
            !selectedCategory
              ? 'bg-blue-600 text-white hover:bg-blue-700 btn-gradient'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          All Categories
        </button>
        
        {/* Category buttons */}
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategoryClick(category.slug)}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              selectedCategory === category.slug
                ? 'bg-blue-600 text-white hover:bg-blue-700 btn-gradient'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
      
      {/* Active filter info */}
      {selectedCategory && (
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-700">
            📁 Filtering by: <span className="font-medium">{categories.find(c => c.slug === selectedCategory)?.name || selectedCategory}</span>
            <button
              onClick={() => handleCategoryClick('')}
              className="ml-2 text-blue-500 hover:text-blue-700 underline"
            >
              Show all
            </button>
          </p>
        </div>
      )}
    </div>
  )
}
