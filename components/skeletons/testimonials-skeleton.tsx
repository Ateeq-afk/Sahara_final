import { Skeleton } from "@/components/ui/skeleton"

export default function TestimonialsSkeleton() {
  return (
    <section className="py-16 md:py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <Skeleton className="w-48 h-6 mx-auto mb-4" />
          <Skeleton className="w-96 h-10 mx-auto mb-4" />
          <Skeleton className="w-full max-w-2xl h-6 mx-auto" />
        </div>
        
        {/* Testimonials Carousel */}
        <div className="relative">
          <div className="flex gap-6 overflow-hidden">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3">
                <div className="bg-gray-50 rounded-2xl p-6 h-full">
                  {/* Rating */}
                  <div className="flex gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map((j) => (
                      <Skeleton key={j} className="w-5 h-5" />
                    ))}
                  </div>
                  
                  {/* Content */}
                  <Skeleton className="w-full h-4 mb-2" />
                  <Skeleton className="w-full h-4 mb-2" />
                  <Skeleton className="w-5/6 h-4 mb-6" />
                  
                  {/* Author */}
                  <div className="flex items-center gap-3">
                    <Skeleton className="w-12 h-12 rounded-full" />
                    <div>
                      <Skeleton className="w-32 h-5 mb-1" />
                      <Skeleton className="w-24 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Navigation */}
          <div className="flex justify-center gap-2 mt-8">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="w-2 h-2 rounded-full" />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}