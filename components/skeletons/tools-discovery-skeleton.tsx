import { Skeleton } from "@/components/ui/skeleton"

export default function ToolsDiscoverySkeleton() {
  return (
    <section className="py-16 md:py-20 bg-gray-50">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Skeleton className="w-64 h-5 mx-auto mb-4" />
          <Skeleton className="w-96 h-12 mx-auto mb-2" />
          <Skeleton className="w-80 h-12 mx-auto mb-4" />
          <Skeleton className="w-full max-w-3xl h-6 mx-auto" />
        </div>
        
        {/* Tools Grid */}
        <div className="overflow-x-auto pb-4 mb-12">
          <div className="flex gap-6" style={{ minWidth: '1200px' }}>
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex-1 min-w-[280px]">
                <div className="rounded-2xl border border-gray-200 bg-white p-6 h-full">
                  {/* Icon */}
                  <Skeleton className="w-16 h-16 rounded-2xl mb-4" />
                  
                  {/* Title */}
                  <Skeleton className="w-48 h-6 mb-2" />
                  <Skeleton className="w-32 h-6 mb-4" />
                  
                  {/* Description */}
                  <Skeleton className="w-full h-4 mb-2" />
                  <Skeleton className="w-5/6 h-4 mb-2" />
                  <Skeleton className="w-4/5 h-4 mb-6" />
                  
                  {/* Button */}
                  <Skeleton className="w-full h-10 rounded-lg" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}