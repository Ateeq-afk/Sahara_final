import { Skeleton } from "@/components/ui/skeleton"

export default function FAQSkeleton() {
  return (
    <section className="py-16 md:py-20 bg-gray-50">
      <div className="container mx-auto px-6 lg:px-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <Skeleton className="w-48 h-6 mx-auto mb-4" />
          <Skeleton className="w-96 h-10 mx-auto mb-4" />
          <Skeleton className="w-full max-w-2xl h-6 mx-auto" />
        </div>
        
        {/* FAQ Items */}
        <div className="space-y-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex justify-between items-center">
                <Skeleton className="w-3/4 h-6" />
                <Skeleton className="w-6 h-6" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}