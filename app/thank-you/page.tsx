import { Suspense } from 'react'
import ThankYouContent from './thank-you-content'

export default function ThankYouPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center px-4">
        <div className="max-w-2xl w-full text-center animate-pulse">
          <div className="flex justify-center mb-8">
            <div className="bg-gray-200 rounded-full w-24 h-24"></div>
          </div>
          <div className="h-10 bg-gray-200 rounded w-3/4 mx-auto mb-4"></div>
          <div className="h-6 bg-gray-200 rounded w-full mx-auto mb-8"></div>
          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="h-8 bg-gray-200 rounded w-1/2 mx-auto mb-6"></div>
            <div className="grid md:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <div className="h-12 bg-gray-200 rounded-full w-12 mx-auto mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
                  <div className="h-3 bg-gray-200 rounded w-full"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    }>
      <ThankYouContent />
    </Suspense>
  )
}