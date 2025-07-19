import { Skeleton } from "@/components/ui/skeleton"

export default function FooterSkeleton() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-1">
            <Skeleton className="w-32 h-8 mb-4 bg-gray-700" />
            <Skeleton className="w-full h-4 mb-2 bg-gray-700" />
            <Skeleton className="w-5/6 h-4 mb-4 bg-gray-700" />
            <div className="flex gap-3">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="w-8 h-8 rounded-full bg-gray-700" />
              ))}
            </div>
          </div>
          
          {/* Quick Links */}
          {[1, 2, 3].map((section) => (
            <div key={section}>
              <Skeleton className="w-24 h-6 mb-4 bg-gray-700" />
              <div className="space-y-2">
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} className="w-32 h-4 bg-gray-700" />
                ))}
              </div>
            </div>
          ))}
        </div>
        
        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <Skeleton className="w-64 h-4 mb-4 md:mb-0 bg-gray-700" />
            <div className="flex gap-4">
              <Skeleton className="w-20 h-4 bg-gray-700" />
              <Skeleton className="w-20 h-4 bg-gray-700" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}