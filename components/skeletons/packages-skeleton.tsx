import { Skeleton } from "@/components/ui/skeleton"

export default function PackagesSkeleton() {
  return (
    <section className="py-16 md:py-20 bg-gray-50">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <Skeleton className="w-48 h-6 mx-auto mb-4" />
          <Skeleton className="w-96 h-10 mx-auto mb-4" />
          <Skeleton className="w-full max-w-2xl h-6 mx-auto" />
        </div>
        
        {/* Packages Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-200 p-6">
              {/* Badge */}
              {i === 2 && <Skeleton className="w-24 h-6 mx-auto mb-4 rounded-full" />}
              
              {/* Package Name */}
              <Skeleton className="w-32 h-8 mx-auto mb-2" />
              
              {/* Price */}
              <div className="text-center mb-6">
                <Skeleton className="w-24 h-5 mx-auto mb-1" />
                <Skeleton className="w-48 h-10 mx-auto mb-1" />
                <Skeleton className="w-32 h-4 mx-auto" />
              </div>
              
              {/* Description */}
              <Skeleton className="w-full h-4 mb-2" />
              <Skeleton className="w-5/6 h-4 mb-6" />
              
              {/* Features */}
              <div className="space-y-3 mb-6">
                {[1, 2, 3, 4, 5].map((j) => (
                  <div key={j} className="flex items-center gap-3">
                    <Skeleton className="w-5 h-5 rounded-full" />
                    <Skeleton className="w-full h-4" />
                  </div>
                ))}
              </div>
              
              {/* Button */}
              <Skeleton className="w-full h-12 rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}