import Link from 'next/link'

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">About Our Platform</h1>
        <p className="mx-auto max-w-3xl text-lg text-gray-600">
          We're dedicated to providing high-quality content and resources for developers and tech enthusiasts worldwide.
        </p>
      </div>

      {/* Mission Card */}
      <div className="mb-12 overflow-hidden rounded-2xl bg-gradient-to-r from-blue-50 to-purple-50 p-8 md:p-12">
        <div className="grid items-center gap-8 md:grid-cols-2">
          <div>
            <h2 className="mb-4 text-3xl font-bold text-gray-900">Our Mission</h2>
            <p className="mb-6 text-gray-700">
              To simplify complex topics and make learning accessible to everyone. We believe knowledge should be free, open, and community-driven.
            </p>
            <Link href="/blog" className="inline-block rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-3 font-medium text-white hover:shadow-lg transition-shadow">
              Start Reading
            </Link>
          </div>
          <div className="h-64 rounded-xl bg-gradient-to-r from-blue-400 to-cyan-400 flex items-center justify-center">
            <div className="text-white text-center">
              <div className="text-4xl font-bold mb-2">100%</div>
              <div className="text-lg">Free & Open Source</div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Values */}
      <div className="mb-12">
        <h2 className="mb-8 text-center text-3xl font-bold text-gray-900">Our Values</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-xl border border-gray-200 bg-white p-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
              <svg className="h-8 w-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="mb-3 text-xl font-semibold text-gray-900">Open Source</h3>
            <p className="text-gray-600">We believe in transparency and community collaboration.</p>
          </div>
          
          <div className="rounded-xl border border-gray-200 bg-white p-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="mb-3 text-xl font-semibold text-gray-900">Quality First</h3>
            <p className="text-gray-600">Every article is thoroughly researched and reviewed for accuracy.</p>
          </div>
          
          <div className="rounded-xl border border-gray-200 bg-white p-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-100">
              <svg className="h-8 w-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="mb-3 text-xl font-semibold text-gray-900">Community</h3>
            <p className="text-gray-600">We grow together through feedback and shared knowledge.</p>
          </div>
        </div>
      </div>
    </div>
  )
}