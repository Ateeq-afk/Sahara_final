'use client'

import { useEffect, useState } from 'react'

export default function ShowcaseDebugPage() {
  const [error, setError] = useState<string | null>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    try {
      // Test if components can be loaded
      setLoaded(true)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Unknown error')
    }
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 pt-24 p-8">
      <h1 className="text-3xl font-bold mb-4">Showcase Debug Page</h1>
      
      <div className="space-y-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="font-semibold mb-2">Status</h2>
          <p>Page loaded: {loaded ? 'Yes' : 'No'}</p>
          <p>Error: {error || 'None'}</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="font-semibold mb-2">Environment</h2>
          <p>Node Environment: {process.env.NODE_ENV}</p>
          <p>Browser: {typeof window !== 'undefined' ? 'Client' : 'Server'}</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="font-semibold mb-2">Routes</h2>
          <ul className="list-disc list-inside">
            <li><a href="/showcase" className="text-blue-600 hover:underline">/showcase - Main showcase page</a></li>
            <li><a href="/showcase-test" className="text-blue-600 hover:underline">/showcase-test - Simple test page</a></li>
            <li><a href="/" className="text-blue-600 hover:underline">/ - Home page</a></li>
          </ul>
        </div>
      </div>
    </div>
  )
}