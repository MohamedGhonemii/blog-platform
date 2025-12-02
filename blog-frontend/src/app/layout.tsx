import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Blog Platform | Modern Tech Blog',
  description: 'Discover amazing articles, tutorials, and insights about modern web development.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50`}>
        {/* Enhanced Header */}
        <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-sm">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">B</span>
                </div>
                <Link href="/" className="text-2xl font-bold text-gray-900 hover:no-underline">
                  Blog<span className="text-blue-600">Platform</span>
                </Link>
              </div>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center space-x-8">
                <Link href="/" className="font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200 relative group">
                  Home
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-200"></span>
                </Link>
                <Link href="/blog" className="font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200 relative group">
                  Blog
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-200"></span>
                </Link>
                <Link href="/about" className="font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200 relative group">
                  About
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-200"></span>
                </Link>
                <button className="rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-2 font-medium text-white hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200">
                  Subscribe
                </button>
              </nav>

              {/* Mobile menu button */}
              <button className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <svg className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </header>

        <main className="min-h-screen">{children}</main>

        {/* Enhanced Footer */}
        <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white pt-12 pb-8">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
              {/* Column 1: Brand */}
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500"></div>
                  <h2 className="text-2xl font-bold">Blog<span className="text-blue-400">Platform</span></h2>
                </div>
                <p className="text-gray-400 mb-4">
                  Sharing knowledge and insights about modern web development since 2024.
                </p>
                <div className="flex space-x-4">
                  <a href="#" className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors">
                    <span className="text-lg">𝕏</span>
                  </a>
                  <a href="#" className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors">
                    <span className="text-lg">G</span>
                  </a>
                  <a href="#" className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors">
                    <span className="text-lg">in</span>
                  </a>
                </div>
              </div>

              {/* Column 2: Quick Links */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                <ul className="space-y-3">
                  <li><Link href="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
                  <li><Link href="/blog" className="text-gray-400 hover:text-white transition-colors">Blog</Link></li>
                  <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors">About</Link></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Tutorials</a></li>
                </ul>
              </div>

              {/* Column 3: Categories */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Categories</h3>
                <ul className="space-y-3">
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Web Development</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Data Science</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">DevOps</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Mobile</a></li>
                </ul>
              </div>

              {/* Column 4: Newsletter */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
                <p className="text-gray-400 mb-4">Subscribe to our newsletter for the latest updates.</p>
                <div className="flex">
                  <input 
                    type="email" 
                    placeholder="Your email" 
                    className="flex-1 px-4 py-2 rounded-l-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-500"
                  />
                  <button className="bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 rounded-r-lg font-medium hover:opacity-90 transition-opacity">
                    Join
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-800 pt-8 mt-8">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <p className="text-gray-500 text-sm mb-4 md:mb-0">
                  © 2024 Blog Platform. All rights reserved.
                </p>
                <div className="flex space-x-6">
                  <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">Privacy Policy</a>
                  <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">Terms of Service</a>
                  <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">Contact</a>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}