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

export default function MarketplaceContent() {
  const searchParams = useSearchParams()
  const [materials, setMaterials] = useState<Material[]>([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState<MaterialFilter>({})
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('createdAt')
  const [comparisons, setComparisons] = useState<Material[]>([])
  const [showComparisonDialog, setShowComparisonDialog] = useState(false)

  // Initialize from URL params
  useEffect(() => {
    const category = searchParams.get('category')
    if (category) {
      setFilters(prev => ({ ...prev, categories: [category] }))
    }
  }, [searchParams])

  // Fetch materials
  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        setLoading(true)
        const queryParams = new URLSearchParams()
        
        if (filters.categories?.length) queryParams.append('category', filters.categories[0])
        if (filters.priceRange?.min) queryParams.append('minPrice', filters.priceRange.min.toString())
        if (filters.priceRange?.max) queryParams.append('maxPrice', filters.priceRange.max.toString())
        if (searchQuery) queryParams.append('search', searchQuery)
        queryParams.append('sortBy', sortBy)

        const response = await fetch(`/api/marketplace/materials?${queryParams}`)
        const data = await response.json()
        
        if (data.success) {
          setMaterials(data.materials)
        }
      } catch (error) {
        console.error('Error fetching materials:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchMaterials()
  }, [filters, searchQuery, sortBy])

  const handleAddToComparison = (material: Material) => {
    if (comparisons.length >= 4) {
      toast.error('You can compare up to 4 materials at a time')
      return
    }
    
    if (comparisons.find(m => m.id === material.id)) {
      toast.error('This material is already in comparison')
      return
    }

    setComparisons([...comparisons, material])
    toast.success('Added to comparison')
  }

  const handleRemoveFromComparison = (materialId: string) => {
    setComparisons(comparisons.filter(m => m.id !== materialId))
  }

  const handleClearComparison = () => {
    setComparisons([])
  }

  const handleCompare = () => {
    if (comparisons.length < 2) {
      toast.error('Please select at least 2 materials to compare')
      return
    }
    setShowComparisonDialog(true)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Material Marketplace</h1>
          <p className="text-gray-600">Find quality construction materials at competitive prices</p>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Search materials..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            <div className="flex gap-4">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="createdAt">Newest First</SelectItem>
                  <SelectItem value="price_asc">Price: Low to High</SelectItem>
                  <SelectItem value="price_desc">Price: High to Low</SelectItem>
                  <SelectItem value="name">Name: A to Z</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="outline">
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>
          </div>
        </div>

        {/* Materials Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-sm p-4">
                <Skeleton className="h-48 w-full mb-4" />
                <Skeleton className="h-4 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2 mb-4" />
                <Skeleton className="h-8 w-full" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {materials.map((material) => (
              <MaterialCard
                key={material.id}
                material={material}
                onCompare={() => handleAddToComparison(material)}
                isInComparison={comparisons.some(m => m.id === material.id)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Comparison Bar */}
      {comparisons.length > 0 && (
        <ComparisonBar
          materials={comparisons}
          onRemove={handleRemoveFromComparison}
          onClear={handleClearComparison}
          onCompare={handleCompare}
        />
      )}

      {/* Comparison Dialog */}
      {showComparisonDialog && comparisons.length >= 2 && (
        <MaterialComparisonDialog
          open={showComparisonDialog}
          onOpenChange={setShowComparisonDialog}
          comparison={{ materials: comparisons, attributes: [] }}
          onRemoveMaterial={handleRemoveFromComparison}
          onClearComparison={handleClearComparison}
        />
      )}
    </div>
  )
}