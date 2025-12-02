'use client'

import { BlogPost } from '@/lib/api'
import Link from 'next/link'
import { useState } from 'react'

interface BlogCardProps {
  post: BlogPost
}

export default function BlogCard({ post }: BlogCardProps) {
  const [imageError, setImageError] = useState(false)
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const getCategoryColor = (categoryName: string) => {
    const colors: Record<string, string> = {
      'Technology': 'bg-blue-100 text-blue-700',
      'Web Development': 'bg-purple-100 text-purple-700',
      'Python': 'bg-green-100 text-green-700',
      'React': 'bg-cyan-100 text-cyan-700',
      'NextJS': 'bg-gray-100 text-gray-700',
      'JavaScript': 'bg-yellow-100 text-yellow-700',
      'Django': 'bg-emerald-100 text-emerald-700',
      'Design': 'bg-pink-100 text-pink-700',
    }
    return colors[categoryName] || 'bg-gray-100 text-gray-700'
  }

  return (
    <Link 
      href={`/blog/post/${post.slug}`}  // Changed from /blog/${post.slug}
      className="group block card-hover"
    >
      <article className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg transition-all hover:shadow-2xl hover:-translate-y-1">
        {/* Post Image */}
        <div className="h-56 w-full overflow-hidden bg-gradient-to-r from-blue-400 to-cyan-400">
          {post.featured_image && !imageError ? (
            <img 
              src={post.featured_image} 
              alt={post.title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-r from-blue-400 to-cyan-400 flex items-center justify-center">
              <div className="text-white text-center">
                <div className="text-3xl font-bold">
                  {post.categories[0]?.name?.charAt(0) || 'B'}
                </div>
                <div className="text-sm mt-2">
                  {post.categories[0]?.name || 'Blog'}
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="p-6">
          {/* Meta */}
          <div className="mb-4 flex items-center justify-between">
            <span className={`rounded-full px-3 py-1 text-xs font-semibold ${getCategoryColor(post.categories[0]?.name || '')}`}>
              {post.categories[0]?.name || 'Uncategorized'}
            </span>
            <span className="text-sm text-gray-500">
              {post.reading_time || 5} min read
            </span>
          </div>
          
          {/* Title */}
          <h3 className="mb-3 text-xl font-bold text-gray-900 group-hover:text-blue-600 line-clamp-2">
            {post.title}
          </h3>
          
          {/* Excerpt */}
          <p className="mb-6 text-gray-600 line-clamp-3">
            {post.excerpt || 'No excerpt available...'}
          </p>
          
          {/* Author & Date */}
          <div className="flex items-center justify-between border-t pt-4">
            <div className="flex items-center">
              <div className="mr-3 h-10 w-10 rounded-full bg-gradient-to-r from-gray-300 to-gray-400 flex items-center justify-center">
                <span className="text-sm font-medium text-gray-700">
                  {post.author?.charAt(0) || 'A'}
                </span>
              </div>
              <div>
                <span className="block text-sm font-medium text-gray-700">
                  {post.author || 'Anonymous'}
                </span>
                <span className="text-xs text-gray-500">
                  {post.published_at ? formatDate(post.published_at) : 'Recently'}
                </span>
              </div>
            </div>
            <div className="text-xs text-gray-400">
              {post.view_count} views
            </div>
          </div>
        </div>
      </article>
    </Link>
  )
}
