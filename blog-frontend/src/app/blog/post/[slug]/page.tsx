import { getPostBySlug } from '@/lib/api'
import { notFound } from 'next/navigation'
import Link from 'next/link'

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  console.log('Fetching post with slug:', params.slug)
  
  try {
    const post = await getPostBySlug(params.slug)
    
    if (!post) {
      console.log('Post not found in API or mock data')
      notFound()
    }

    console.log('Post found:', post.title)

    const formatDate = (dateString: string) => {
      return new Date(dateString).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      })
    }

    return (
      <article className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Back button */}
        <div className="mb-8">
          <Link
            href="/blog"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors"
          >
            <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Articles
          </Link>
        </div>

        {/* Debug info - only show in development */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-yellow-800 text-sm">
              <strong>Development Mode:</strong> Using {post.featured_image.includes('localhost:8000') ? 'Django API' : 'mock data'}
            </p>
          </div>
        )}

        {/* Header */}
        <header className="mb-8">
          {/* Categories */}
          <div className="mb-4 flex flex-wrap gap-2">
            {post.categories.map((category) => (
              <span
                key={category.id}
                className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700"
              >
                {category.name}
              </span>
            ))}
          </div>
          
          {/* Title */}
          <h1 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">
            {post.title}
          </h1>
          
          {/* Meta info */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-gray-600">
            <div className="flex items-center">
              <div className="mr-3 h-12 w-12 rounded-full bg-gradient-to-r from-gray-300 to-gray-400 flex items-center justify-center">
                <span className="text-lg font-medium text-gray-700">
                  {post.author?.charAt(0) || 'A'}
                </span>
              </div>
              <div>
                <div className="font-medium">{post.author || 'Anonymous'}</div>
                <div className="text-sm">
                  {formatDate(post.published_at)} • {post.reading_time || 5} min read
                </div>
              </div>
            </div>
            <div className="text-sm">
              <span className="text-gray-500">{post.view_count} views</span>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        {post.featured_image && (
          <div className="mb-8 overflow-hidden rounded-2xl">
            <img
              src={post.featured_image}
              alt={post.title}
              className="h-auto w-full object-cover rounded-2xl shadow-lg"
            />
          </div>
        )}

        {/* Content */}
        <div className="prose prose-lg max-w-none mb-12">
          {post.content ? (
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          ) : (
            <div className="text-center py-12">
              <div className="mb-4 text-gray-400">
                <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <p className="text-gray-600">Content not available.</p>
              <p className="text-sm text-gray-500 mt-2">
                {process.env.NODE_ENV === 'development' 
                  ? 'Start Django backend to see real content: python manage.py runserver' 
                  : 'Please check the admin panel for content.'}
              </p>
            </div>
          )}
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="mb-8">
            <h3 className="mb-3 text-lg font-semibold text-gray-900">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag.id}
                  className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700 hover:bg-gray-200 transition-colors"
                >
                  #{tag.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="rounded-2xl bg-gradient-to-r from-blue-50 to-purple-50 p-8 text-center glass">
          <h3 className="mb-4 text-2xl font-bold text-gray-900">Enjoyed this article?</h3>
          <p className="mb-6 text-gray-600">Subscribe to our newsletter for more content like this.</p>
          <Link
            href="/"
            className="inline-block rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-3 font-medium text-white hover:shadow-lg btn-gradient"
          >
            Subscribe Now
          </Link>
        </div>
      </article>
    )
  } catch (error) {
    console.error('Error in BlogPostPage:', error)
    notFound()
  }
}
