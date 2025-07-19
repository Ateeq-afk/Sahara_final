import { Skeleton } from "@/components/ui/skeleton"

export default function NavbarSkeleton() {
  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-lg border-b border-gray-200 z-50">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Skeleton className="w-32 h-8" />
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="w-16 h-4" />
            ))}
          </div>
          
          {/* CTA Button */}
          <div className="hidden lg:block">
            <Skeleton className="w-28 h-10 rounded-full" />
          </div>
          
          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <Skeleton className="w-10 h-10 rounded-lg" />
          </div>
        </div>
      </div>
    </nav>
  )
}