import { Skeleton } from "@/components/ui/skeleton"

export default function GallerySkeleton() {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <Skeleton className="w-48 h-6 mx-auto mb-4" />
          <Skeleton className="w-96 h-10 mx-auto mb-4" />
          <Skeleton className="w-full max-w-2xl h-6 mx-auto" />
        </div>
        
        {/* Filter Tabs */}
        <div className="flex justify-center gap-2 mb-8">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="w-24 h-10 rounded-full" />
          ))}
        </div>
        
        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="group relative overflow-hidden rounded-2xl">
              <Skeleton className="aspect-[4/3] w-full" />
              
              {/* Overlay content */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <Skeleton className="w-32 h-4 mb-2 bg-gray-300" />
                <Skeleton className="w-48 h-6 bg-gray-300" />
              </div>
            </div>
          ))}
        </div>
        
        {/* View All Button */}
        <div className="text-center mt-10">
          <Skeleton className="w-48 h-12 mx-auto rounded-full" />
        </div>
      </div>
    </section>
  )
}