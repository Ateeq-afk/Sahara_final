import { Skeleton } from "@/components/ui/skeleton"

export default function PartnersSkeleton() {
  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <Skeleton className="w-64 h-8 mx-auto" />
        </div>
        
        {/* Partners Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 items-center">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="flex justify-center">
              <Skeleton className="w-32 h-16" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}