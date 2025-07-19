import { Skeleton } from "@/components/ui/skeleton"

export default function ServicesSkeleton() {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <Skeleton className="w-48 h-6 mx-auto mb-4" />
          <Skeleton className="w-96 h-10 mx-auto mb-4" />
          <Skeleton className="w-full max-w-2xl h-6 mx-auto mb-2" />
          <Skeleton className="w-5/6 max-w-2xl h-6 mx-auto" />
        </div>
        
        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="group rounded-2xl border border-gray-200 p-6">
              {/* Icon */}
              <Skeleton className="w-16 h-16 rounded-xl mb-4" />
              
              {/* Title */}
              <Skeleton className="w-48 h-6 mb-3" />
              
              {/* Description */}
              <Skeleton className="w-full h-4 mb-2" />
              <Skeleton className="w-5/6 h-4 mb-4" />
              
              {/* Features */}
              <div className="space-y-2 mb-4">
                <Skeleton className="w-full h-3" />
                <Skeleton className="w-4/5 h-3" />
                <Skeleton className="w-5/6 h-3" />
              </div>
              
              {/* Link */}
              <Skeleton className="w-32 h-6" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}