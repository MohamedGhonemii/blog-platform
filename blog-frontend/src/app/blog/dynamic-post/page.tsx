import { notFound } from 'next/navigation'

// This will catch all routes under /blog/*
export default function BlogPostPage({ params }: { params: { slug: string[] } }) {
  // Get the slug from the params
  const slug = params.slug?.[0] || ''
  
  if (!slug) {
    notFound()
  }
  
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold">Post: {slug}</h1>
      <p className="mt-4 text-green-600">✓ Dynamic route working!</p>
      <a href="/blog" className="text-blue-600 mt-4 inline-block">
        ← Back to blog
      </a>
    </div>
  )
}
