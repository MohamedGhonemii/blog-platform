'use client'

import { useState } from 'react'

export default function SubscribeButton() {
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubscribe = () => {
    // In a real app, you would connect to an API here
    setIsSubscribed(true)
    alert('Thank you for subscribing to our newsletter!')
    
    // Reset after 3 seconds
    setTimeout(() => {
      setIsSubscribed(false)
    }, 3000)
  }

  return (
    <button
      onClick={handleSubscribe}
      disabled={isSubscribed}
      className="rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-2 font-medium text-white hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
    >
      {isSubscribed ? 'Subscribed!' : 'Subscribe'}
    </button>
  )
}
