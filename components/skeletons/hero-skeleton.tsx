import { Skeleton } from "@/components/ui/skeleton"

export default function HeroSkeleton() {
  return (
    <section className="relative flex items-center bg-white pt-16 pb-12 md:pt-20 md:pb-16 lg:min-h-[85vh] overflow-hidden">
      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Content Skeleton */}
          <div className="max-w-xl">
            {/* Badge */}
            <Skeleton className="w-48 h-8 rounded-full mb-6" />
            
            {/* Headline */}
            <Skeleton className="w-full h-12 mb-4" />
            <Skeleton className="w-3/4 h-12 mb-6" />
            
            {/* Description */}
            <Skeleton className="w-full h-6 mb-2" />
            <Skeleton className="w-5/6 h-6 mb-8" />
            
            {/* CTA Buttons */}
            <div className="flex gap-3 mb-10">
              <Skeleton className="w-40 h-12 rounded-full" />
              <Skeleton className="w-40 h-12 rounded-full" />
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-10 border-t border-gray-200">
              {[1, 2, 3].map((i) => (
                <div key={i}>
                  <Skeleton className="w-16 h-8 mb-2" />
                  <Skeleton className="w-20 h-4" />
                </div>
              ))}
            </div>
          </div>
          
          {/* Image Skeleton */}
          <div className="relative max-w-xl mx-auto lg:ml-auto lg:mr-0">
            {/* Main Image */}
            <Skeleton className="w-full h-[300px] lg:h-[350px] rounded-2xl mb-4" />
            
            {/* Small Images Grid */}
            <div className="grid grid-cols-2 gap-3">
              <Skeleton className="h-[140px] lg:h-[160px] rounded-xl" />
              <Skeleton className="h-[140px] lg:h-[160px] rounded-xl" />
            </div>
            
            {/* Floating card skeleton */}
            <Skeleton className="absolute bottom-4 left-4 w-[180px] h-20 rounded-xl" />
          </div>
        </div>
      </div>
    </section>
  )
}