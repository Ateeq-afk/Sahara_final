import { Skeleton } from "@/components/ui/skeleton"

export default function ProcessTimelineSkeleton() {
  return (
    <section className="py-16 md:py-20 bg-gray-50">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <Skeleton className="w-48 h-6 mx-auto mb-4" />
          <Skeleton className="w-96 h-10 mx-auto mb-4" />
          <Skeleton className="w-full max-w-2xl h-6 mx-auto" />
        </div>
        
        {/* Timeline */}
        <div className="max-w-4xl mx-auto">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="relative pb-12 last:pb-0">
              {/* Timeline line */}
              {i !== 5 && (
                <div className="absolute left-8 top-16 bottom-0 w-0.5 bg-gray-200" />
              )}
              
              <div className="flex gap-6">
                {/* Step number */}
                <div className="relative">
                  <Skeleton className="w-16 h-16 rounded-full" />
                </div>
                
                {/* Content */}
                <div className="flex-1 pb-8">
                  <Skeleton className="w-48 h-7 mb-3" />
                  <Skeleton className="w-full h-4 mb-2" />
                  <Skeleton className="w-5/6 h-4 mb-4" />
                  
                  {/* Features */}
                  <div className="grid sm:grid-cols-2 gap-3 mt-4">
                    <Skeleton className="h-12 rounded-lg" />
                    <Skeleton className="h-12 rounded-lg" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}