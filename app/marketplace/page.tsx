'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Search, SlidersHorizontal } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import { MaterialCard } from '@/components/marketplace/material-card'
import { MaterialFilters } from '@/components/marketplace/material-filters'
import { ComparisonBar, MaterialComparisonDialog } from '@/components/marketplace/material-comparison'
import { toast } from 'sonner'
import type { Material, MaterialFilter, MaterialComparison } from '@/src/types/marketplace'

export default function MarketplacePage() {
  const searchParams = useSearchParams()
  const [materials, setMaterials] = useState<Material[]>([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState<MaterialFilter>({})
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('createdAt')
  const [sortOrder, setSortOrder] = useState('desc')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [comparisonMaterials, setComparisonMaterials] = useState<Material[]>([])
  const [comparison, setComparison] = useState<MaterialComparison | null>(null)
  const [showComparison, setShowComparison] = useState(false)
  
  useEffect(() => {
    fetchMaterials()
  }, [filters, sortBy, sortOrder, page]) // eslint-disable-line react-hooks/exhaustive-deps
  
  const fetchMaterials = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        ...(searchQuery && { query: searchQuery }),
        ...(filters.categories?.length && { category: filters.categories.join(',') }),
        ...(filters.brands?.length && { brand: filters.brands.join(',') }),
        ...(filters.priceRange?.min && { minPrice: filters.priceRange.min.toString() }),
        ...(filters.priceRange?.max && { maxPrice: filters.priceRange.max.toString() }),
        ...(filters.ratings && { rating: filters.ratings.toString() }),
        ...(filters.availability && { availability: 'true' }),
        sort: sortBy,
        order: sortOrder,
        page: page.toString(),
        limit: '12'
      })
      
      const response = await fetch(`/api/marketplace/materials?${params}`)
      const data = await response.json()
      
      if (response.ok) {
        setMaterials(data.materials)
        setTotalPages(data.pagination.pages)
      } else {
        toast.error('Failed to fetch materials')
      }
    } catch (error) {
      toast.error('Error loading materials')
    } finally {
      setLoading(false)
    }
  }
  
  const handleSearch = () => {
    setPage(1)
    fetchMaterials()
  }
  
  const handleAddToCart = (material: Material) => {
    console.log('Add to cart:', material)
  }
  
  const handleAddToWishlist = (material: Material) => {
    console.log('Add to wishlist:', material)
  }
  
  const handleCompare = (material: Material) => {
    if (comparisonMaterials.find(m => m.id === material.id)) {
      setComparisonMaterials(prev => prev.filter(m => m.id !== material.id))
    } else if (comparisonMaterials.length < 5) {
      setComparisonMaterials(prev => [...prev, material])
    } else {
      toast.error('You can compare up to 5 materials')
    }
  }
  
  const handleStartComparison = async () => {
    if (comparisonMaterials.length < 2) {
      toast.error('Select at least 2 materials to compare')
      return
    }
    
    try {
      const response = await fetch('/api/marketplace/materials/compare', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ materialIds: comparisonMaterials.map(m => m.id) })
      })
      
      const data = await response.json()
      
      if (response.ok) {
        setComparison(data.comparison)
        setShowComparison(true)
      } else {
        toast.error(data.error || 'Failed to compare materials')
      }
    } catch (error) {
      toast.error('Error comparing materials')
    }
  }
  
  const categories = [
    { id: 'cement', name: 'Cement & Concrete', count: 125 },
    { id: 'steel', name: 'Steel & Iron', count: 89 },
    { id: 'bricks', name: 'Bricks & Blocks', count: 156 },
    { id: 'sand', name: 'Sand & Aggregates', count: 43 },
    { id: 'tiles', name: 'Tiles & Flooring', count: 234 },
    { id: 'paint', name: 'Paints & Finishes', count: 178 },
    { id: 'electrical', name: 'Electrical', count: 312 },
    { id: 'plumbing', name: 'Plumbing', count: 198 }
  ]
  
  const brands = [
    { name: 'UltraTech', count: 45 },
    { name: 'ACC', count: 38 },
    { name: 'Ambuja', count: 42 },
    { name: 'JSW', count: 31 },
    { name: 'TATA Steel', count: 28 },
    { name: 'Asian Paints', count: 56 },
    { name: 'Berger', count: 47 },
    { name: 'Kajaria', count: 62 }
  ]
  
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-3">Construction Materials Marketplace</h1>
          <p className="text-lg text-muted-foreground">Find quality materials from verified suppliers at competitive prices</p>
        </div>
        
        <div className="flex gap-4 mb-6">
          <div className="flex-1 flex gap-2">
            <Input
              placeholder="Search materials..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="flex-1"
            />
            <Button onClick={handleSearch}>
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
          </div>
          
          <Select value={`${sortBy}-${sortOrder}`} onValueChange={(value) => {
            const [sort, order] = value.split('-')
            setSortBy(sort)
            setSortOrder(order)
          }}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="createdAt-desc">Newest First</SelectItem>
              <SelectItem value="createdAt-asc">Oldest First</SelectItem>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
              <SelectItem value="rating-desc">Highest Rated</SelectItem>
              <SelectItem value="name-asc">Name: A to Z</SelectItem>
            </SelectContent>
          </Select>
          
          <div className="lg:hidden">
            <MaterialFilters
              filters={filters}
              onFiltersChange={setFilters}
              categories={categories}
              brands={brands}
              maxPrice={100000}
              isMobile={true}
            />
          </div>
        </div>
        
        <div className="flex gap-6">
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <MaterialFilters
                filters={filters}
                onFiltersChange={setFilters}
                categories={categories}
                brands={brands}
                maxPrice={100000}
              />
            </div>
          </aside>
          
          <main className="flex-1">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <Skeleton key={i} className="h-96" />
                ))}
              </div>
            ) : materials.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {materials.map(material => (
                    <MaterialCard
                      key={material.id}
                      material={material}
                      onAddToCart={handleAddToCart}
                      onAddToWishlist={handleAddToWishlist}
                      onCompare={handleCompare}
                      isInComparison={comparisonMaterials.some(m => m.id === material.id)}
                    />
                  ))}
                </div>
                
                {totalPages > 1 && (
                  <div className="flex justify-center gap-2 mt-8">
                    <Button
                      variant="outline"
                      onClick={() => setPage(p => Math.max(1, p - 1))}
                      disabled={page === 1}
                    >
                      Previous
                    </Button>
                    <span className="flex items-center px-4">
                      Page {page} of {totalPages}
                    </span>
                    <Button
                      variant="outline"
                      onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                      disabled={page === totalPages}
                    >
                      Next
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No materials found</p>
              </div>
            )}
          </main>
        </div>
      </div>
      
      <ComparisonBar
        materials={comparisonMaterials.map(m => ({
          id: m.id,
          name: m.name,
          image: m.images.find(img => img.isPrimary)?.url || m.images[0]?.url
        }))}
        onRemove={(id) => setComparisonMaterials(prev => prev.filter(m => m.id !== id))}
        onCompare={handleStartComparison}
        onClear={() => setComparisonMaterials([])}
      />
      
      {comparison && (
        <MaterialComparisonDialog
          comparison={comparison}
          onRemoveMaterial={(id) => {
            setComparisonMaterials(prev => prev.filter(m => m.id !== id))
            if (comparisonMaterials.length <= 2) {
              setShowComparison(false)
            }
          }}
          onClearComparison={() => {
            setComparisonMaterials([])
            setShowComparison(false)
          }}
          open={showComparison}
          onOpenChange={setShowComparison}
        />
      )}
    </div>
  )
}