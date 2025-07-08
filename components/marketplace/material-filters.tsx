'use client'

import { useState } from 'react'
import { Slider } from '@/components/ui/slider'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { X, Filter } from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import type { MaterialFilter } from '@/src/types/marketplace'

interface MaterialFiltersProps {
  filters: MaterialFilter
  onFiltersChange: (filters: MaterialFilter) => void
  categories?: Array<{ id: string; name: string; count: number }>
  brands?: Array<{ name: string; count: number }>
  maxPrice?: number
  isMobile?: boolean
}

export function MaterialFilters({
  filters,
  onFiltersChange,
  categories = [],
  brands = [],
  maxPrice = 100000,
  isMobile = false
}: MaterialFiltersProps) {
  const [localFilters, setLocalFilters] = useState<MaterialFilter>(filters)
  const [priceRange, setPriceRange] = useState([
    filters.priceRange?.min || 0,
    filters.priceRange?.max || maxPrice
  ])
  
  const updateFilter = (key: keyof MaterialFilter, value: any) => {
    const newFilters = { ...localFilters, [key]: value }
    setLocalFilters(newFilters)
    if (!isMobile) {
      onFiltersChange(newFilters)
    }
  }
  
  const handlePriceChange = (value: number[]) => {
    setPriceRange(value)
    updateFilter('priceRange', { min: value[0], max: value[1] })
  }
  
  const toggleCategory = (categoryId: string) => {
    const currentCategories = localFilters.categories || []
    const newCategories = currentCategories.includes(categoryId)
      ? currentCategories.filter(id => id !== categoryId)
      : [...currentCategories, categoryId]
    updateFilter('categories', newCategories)
  }
  
  const toggleBrand = (brandName: string) => {
    const currentBrands = localFilters.brands || []
    const newBrands = currentBrands.includes(brandName)
      ? currentBrands.filter(name => name !== brandName)
      : [...currentBrands, brandName]
    updateFilter('brands', newBrands)
  }
  
  const clearFilters = () => {
    setLocalFilters({})
    setPriceRange([0, maxPrice])
    onFiltersChange({})
  }
  
  const applyFilters = () => {
    onFiltersChange(localFilters)
  }
  
  const activeFiltersCount = Object.values(localFilters).filter(v => 
    v !== undefined && v !== null && (Array.isArray(v) ? v.length > 0 : true)
  ).length
  
  const FilterContent = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Filters</h3>
        {activeFiltersCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
          >
            Clear all
          </Button>
        )}
      </div>
      
      <Separator />
      
      <Accordion type="multiple" defaultValue={["price", "categories", "brands"]} className="w-full">
        <AccordionItem value="price">
          <AccordionTrigger>Price Range</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <Slider
                min={0}
                max={maxPrice}
                step={100}
                value={priceRange}
                onValueChange={handlePriceChange}
                className="w-full"
              />
              <div className="flex justify-between text-sm">
                <span>₹{priceRange[0].toLocaleString('en-IN')}</span>
                <span>₹{priceRange[1].toLocaleString('en-IN')}</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="categories">
          <AccordionTrigger>Categories</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3">
              {categories.map(category => (
                <div key={category.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={category.id}
                    checked={localFilters.categories?.includes(category.id) || false}
                    onCheckedChange={() => toggleCategory(category.id)}
                  />
                  <Label
                    htmlFor={category.id}
                    className="text-sm font-normal cursor-pointer flex-1"
                  >
                    {category.name}
                  </Label>
                  <span className="text-xs text-muted-foreground">
                    ({category.count})
                  </span>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="brands">
          <AccordionTrigger>Brands</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3">
              {brands.map(brand => (
                <div key={brand.name} className="flex items-center space-x-2">
                  <Checkbox
                    id={brand.name}
                    checked={localFilters.brands?.includes(brand.name) || false}
                    onCheckedChange={() => toggleBrand(brand.name)}
                  />
                  <Label
                    htmlFor={brand.name}
                    className="text-sm font-normal cursor-pointer flex-1"
                  >
                    {brand.name}
                  </Label>
                  <span className="text-xs text-muted-foreground">
                    ({brand.count})
                  </span>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="availability">
          <AccordionTrigger>Availability</AccordionTrigger>
          <AccordionContent>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="in-stock"
                checked={localFilters.availability || false}
                onCheckedChange={(checked) => updateFilter('availability', checked)}
              />
              <Label
                htmlFor="in-stock"
                className="text-sm font-normal cursor-pointer"
              >
                In Stock Only
              </Label>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="rating">
          <AccordionTrigger>Rating</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3">
              {[4, 3, 2, 1].map(rating => (
                <div key={rating} className="flex items-center space-x-2">
                  <Checkbox
                    id={`rating-${rating}`}
                    checked={localFilters.ratings === rating}
                    onCheckedChange={(checked) => 
                      updateFilter('ratings', checked ? rating : undefined)
                    }
                  />
                  <Label
                    htmlFor={`rating-${rating}`}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {rating}+ Stars & Up
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      
      {isMobile && (
        <Button onClick={applyFilters} className="w-full">
          Apply Filters
        </Button>
      )}
    </div>
  )
  
  if (isMobile) {
    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filters
            {activeFiltersCount > 0 && (
              <Badge variant="secondary" className="ml-2">
                {activeFiltersCount}
              </Badge>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-80">
          <SheetHeader>
            <SheetTitle>Filter Materials</SheetTitle>
            <SheetDescription>
              Narrow down your search results
            </SheetDescription>
          </SheetHeader>
          <div className="mt-6">
            <FilterContent />
          </div>
        </SheetContent>
      </Sheet>
    )
  }
  
  return <FilterContent />
}