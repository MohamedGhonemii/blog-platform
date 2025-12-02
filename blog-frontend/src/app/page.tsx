import Link from 'next/link'

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20 md:py-28">
        <div className="container relative mx-auto px-4">
          <div className="max-w-3xl">
            {/* Badge */}
            <div className="mb-6 inline-flex items-center rounded-full bg-blue-100 px-4 py-2">
              <span className="text-sm font-medium text-blue-700">✨ New: React 19 Guide Available</span>
            </div>
            
            {/* Main Heading */}
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-gray-900 md:text-6xl">
              Discover Amazing 
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Tech Insights
              </span>
            </h1>
            
            {/* Description */}
            <p className="mb-8 text-lg text-gray-600 md:text-xl">
              Join our community of developers learning about React, Next.js, TypeScript, and modern web development.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link href="/blog" className="inline-block rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-3 font-semibold text-white shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5 text-center">
                Explore Articles
              </Link>
              <button className="rounded-lg border border-gray-300 bg-white px-8 py-3 font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
                Join Community
              </button>
            </div>
            
            {/* Stats */}
            <div className="mt-12 grid grid-cols-2 gap-6 md:grid-cols-4">
              <div className="rounded-xl bg-white p-6 shadow-sm">
                <div className="text-3xl font-bold text-gray-900">250+</div>
                <div className="text-gray-600">Articles</div>
              </div>
              <div className="rounded-xl bg-white p-6 shadow-sm">
                <div className="text-3xl font-bold text-gray-900">50+</div>
                <div className="text-gray-600">Authors</div>
              </div>
              <div className="rounded-xl bg-white p-6 shadow-sm">
                <div className="text-3xl font-bold text-gray-900">10K+</div>
                <div className="text-gray-600">Readers</div>
              </div>
              <div className="rounded-xl bg-white p-6 shadow-sm">
                <div className="text-3xl font-bold text-gray-900">24/7</div>
                <div className="text-gray-600">Support</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">Why Choose Our Platform</h2>
            <p className="mx-auto max-w-2xl text-gray-600">Everything you need to level up your development skills</p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-3">
            {/* Feature 1 */}
            <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm hover:shadow-xl transition-shadow">
              <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-blue-100">
                <svg className="h-7 w-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="mb-3 text-xl font-bold text-gray-900">Latest Articles</h3>
              <p className="text-gray-600">Stay updated with our most recent publications and industry insights.</p>
            </div>
            
            {/* Feature 2 */}
            <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm hover:shadow-xl transition-shadow">
              <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-purple-100">
                <svg className="h-7 w-7 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="mb-3 text-xl font-bold text-gray-900">Expert Writers</h3>
              <p className="text-gray-600">Learn from industry professionals and experienced developers.</p>
            </div>
            
            {/* Feature 3 */}
            <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm hover:shadow-xl transition-shadow">
              <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-green-100">
                <svg className="h-7 w-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="mb-3 text-xl font-bold text-gray-900">Community Driven</h3>
              <p className="text-gray-600">Join discussions and share your thoughts with our growing community.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}