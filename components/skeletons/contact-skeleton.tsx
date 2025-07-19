import { Skeleton } from "@/components/ui/skeleton"

export default function ContactSkeleton() {
  return (
    <section className="bg-gray-50 py-16 md:py-20">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          {/* Header */}
          <Skeleton className="w-48 h-12 mx-auto mb-4" />
          <Skeleton className="w-full max-w-2xl h-6 mx-auto mb-12" />
          
          {/* Contact Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-12">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-2xl bg-white p-6">
                <div className="flex items-start justify-between mb-4">
                  <Skeleton className="w-16 h-16 rounded-xl" />
                  <Skeleton className="w-16 h-4" />
                </div>
                <Skeleton className="w-32 h-5 mb-2" />
                <Skeleton className="w-40 h-7 mb-1" />
                <Skeleton className="w-48 h-4" />
              </div>
            ))}
          </div>
          
          {/* Bottom CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Skeleton className="w-48 h-6" />
            <Skeleton className="w-48 h-12 rounded-full" />
          </div>
        </div>
      </div>
    </section>
  )
}