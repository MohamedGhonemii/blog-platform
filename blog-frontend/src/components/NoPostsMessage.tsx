'use client'

interface NoPostsMessageProps {
  query?: string;
  category?: string;
}

export default function NoPostsMessage({ query, category }: NoPostsMessageProps) {
  const handleRefresh = () => {
    window.location.reload()
  }

  // Determine message based on props
  const getMessage = () => {
    if (query) {
      return {
        title: `No articles found for "${query}"`,
        description: 'Try adjusting your search terms or browse all articles.',
        showAdminLink: false
      }
    }
    
    if (category) {
      return {
        title: `No articles found in "${category}"`,
        description: 'Check back soon for articles in this category.',
        showAdminLink: false
      }
    }
    
    return {
      title: 'No Published Articles Yet',
      description: 'Articles will appear here once published from the admin panel.',
      showAdminLink: true
    }
  }

  const message = getMessage()

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-12 text-center glass">
      <div className="mx-auto mb-6 h-24 w-24 rounded-full bg-gray-100 flex items-center justify-center">
        <svg className="h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </div>
      <h3 className="mb-2 text-2xl font-bold text-gray-900">{message.title}</h3>
      <p className="mb-6 text-gray-600">
        {message.description}
      </p>
      <div className="flex justify-center gap-4">
        {message.showAdminLink && (
          <a 
            href="http://localhost:8000/admin" 
            target="_blank" 
            rel="noopener noreferrer"
            className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700 btn-gradient"
          >
            Go to Admin Panel
          </a>
        )}
        {(query || category) && (
          <a 
            href="/blog"
            className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700 btn-gradient"
          >
            View All Articles
          </a>
        )}
        <button 
          onClick={handleRefresh}
          className="rounded-lg border border-gray-300 px-6 py-3 font-medium text-gray-700 hover:bg-gray-50"
        >
          Refresh Page
        </button>
      </div>
    </div>
  )
}