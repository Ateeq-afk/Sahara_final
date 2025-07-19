import { Skeleton } from "@/components/ui/skeleton"

interface FormSkeletonProps {
  fields?: number
}

export default function FormSkeleton({ fields = 4 }: FormSkeletonProps) {
  return (
    <div className="space-y-6">
      {Array.from({ length: fields }).map((_, i) => (
        <div key={i}>
          <Skeleton className="w-24 h-4 mb-2" />
          <Skeleton className="w-full h-10 rounded-lg" />
        </div>
      ))}
      
      {/* Submit Button */}
      <Skeleton className="w-full h-12 rounded-lg" />
    </div>
  )
}