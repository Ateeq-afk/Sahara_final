import { Skeleton } from "@/components/ui/skeleton"

export default function DashboardStatsSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <Skeleton className="w-24 h-4 mb-2" />
              <Skeleton className="w-16 h-8 mb-1" />
              <Skeleton className="w-20 h-3" />
            </div>
            <Skeleton className="w-12 h-12 rounded-lg" />
          </div>
        </div>
      ))}
    </div>
  )
}