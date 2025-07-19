import { Skeleton } from "@/components/ui/skeleton"

interface PageSkeletonProps {
  showBreadcrumb?: boolean
  showTitle?: boolean
  showActions?: boolean
}

export default function PageSkeleton({ 
  showBreadcrumb = true, 
  showTitle = true,
  showActions = true 
}: PageSkeletonProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      {showBreadcrumb && (
        <div className="bg-white border-b border-gray-200 py-4">
          <div className="container mx-auto px-6">
            <Skeleton className="w-64 h-4" />
          </div>
        </div>
      )}
      
      {/* Page Content */}
      <div className="container mx-auto px-6 py-8">
        {showTitle && (
          <div className="mb-8">
            <div className="flex justify-between items-center">
              <Skeleton className="w-64 h-10" />
              {showActions && <Skeleton className="w-32 h-10 rounded-lg" />}
            </div>
            <Skeleton className="w-96 h-6 mt-2" />
          </div>
        )}
        
        {/* Content Area */}
        <div className="space-y-6">
          {/* Stats or Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-32 rounded-lg" />
            ))}
          </div>
          
          {/* Main Content */}
          <div className="bg-white rounded-lg p-6">
            <Skeleton className="w-48 h-6 mb-4" />
            <div className="space-y-3">
              <Skeleton className="w-full h-4" />
              <Skeleton className="w-5/6 h-4" />
              <Skeleton className="w-4/6 h-4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}