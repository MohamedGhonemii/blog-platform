import { getPostBySlug } from '@/lib/api'
import { notFound } from 'next/navigation'

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  try {
    const post = await getPostBySlug(slug)
    
    if (!post) {
      notFound()
    }
    
    return (
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <article className="bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">{post.title}</h1>
          
          <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-8 pb-8 border-b">
            <div className="flex items-center gap-2">
              <span className="font-medium">By {post.author || 'Admin'}</span>
            </div>
            <span>•</span>
            <time dateTime={post.published_at}>
              {new Date(post.published_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
            <span>•</span>
            <span>{post.reading_time || 5} min read</span>
            <span>•</span>
            <span>👁️ {post.view_count || 0} views</span>
          </div>
          
          {post.featured_image && (
            <div className="mb-10">
              <img 
                src={post.featured_image} 
                alt={post.title}
                className="w-full h-auto rounded-xl shadow-md"
              />
            </div>
          )}
          
          <div className="prose prose-lg max-w-none">
            <p className="text-2xl text-gray-700 leading-relaxed mb-10">{post.excerpt || 'Read this interesting article...'}</p>
            
            {post.content ? (
              <div className="blog-content" dangerouslySetInnerHTML={{ __html: post.content }} />
            ) : (
              <div className="space-y-4">
                <p className="text-gray-700">This is a sample blog post with placeholder content.</p>
                <p className="text-gray-700">The blog platform is fully functional with search, filtering, and individual post pages.</p>
              </div>
            )}
          </div>
          
          {post.categories && post.categories.length > 0 && (
            <div className="mt-12 pt-8 border-t">
              <h3 className="text-lg font-semibold mb-4">Categories</h3>
              <div className="flex flex-wrap gap-2">
                {post.categories.map((category) => (
                  <a
                    key={category.id}
                    href={`/blog?category=${category.slug}`}
                    className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm hover:bg-blue-200 transition"
                  >
                    {category.name}
                  </a>
                ))}
              </div>
            </div>
          )}
          
          <div className="mt-12 pt-8 border-t">
            <a 
              href="/blog" 
              className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to All Posts
            </a>
          </div>
        </article>
      </div>
    )
  } catch (error) {
    notFound()
  }
}
