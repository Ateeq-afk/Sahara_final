import { Skeleton } from "@/components/ui/skeleton"

export default function ProjectCardSkeleton() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      {/* Image */}
      <Skeleton className="w-full h-48" />
      
      {/* Content */}
      <div className="p-6">
        {/* Status Badge */}
        <Skeleton className="w-24 h-6 rounded-full mb-3" />
        
        {/* Title */}
        <Skeleton className="w-3/4 h-6 mb-2" />
        
        {/* Client */}
        <Skeleton className="w-1/2 h-4 mb-4" />
        
        {/* Details */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <Skeleton className="w-16 h-4 mb-1" />
            <Skeleton className="w-24 h-5" />
          </div>
          <div>
            <Skeleton className="w-16 h-4 mb-1" />
            <Skeleton className="w-24 h-5" />
          </div>
        </div>
        
        {/* Progress */}
        <div className="mb-4">
          <Skeleton className="w-full h-2 rounded-full" />
          <Skeleton className="w-16 h-4 mt-1" />
        </div>
        
        {/* Action */}
        <Skeleton className="w-full h-10 rounded-lg" />
      </div>
    </div>
  )
}