'use client'

import { useState } from 'react'
import Image from 'next/image'
import { X, Check, Star, TruckIcon, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import type { MaterialComparison } from '@/src/types/marketplace'

interface MaterialComparisonProps {
  comparison: MaterialComparison
  onRemoveMaterial: (materialId: string) => void
  onClearComparison: () => void
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function MaterialComparisonDialog({
  comparison,
  onRemoveMaterial,
  onClearComparison,
  open,
  onOpenChange
}: MaterialComparisonProps) {
  const materials = comparison.materials
  
  if (materials.length < 2) {
    return null
  }
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-auto p-0 sm:p-6">
        <DialogHeader className="p-6 pb-0 sm:p-0">
          <DialogTitle>Compare Materials</DialogTitle>
          <DialogDescription>
            Side-by-side comparison of selected materials
          </DialogDescription>
        </DialogHeader>
        
        {/* Mobile View */}
        <div className="block sm:hidden mt-6">
          <div className="space-y-4 px-6">
            {materials.map((material, materialIndex) => (
              <div key={material.id} className="border rounded-lg p-4 space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative w-16 h-16 flex-shrink-0">
                      {material.images?.[0]?.url ? (
                        <Image
                          src={material.images[0].url}
                          alt={material.name}
                          fill
                          className="object-cover rounded"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 rounded" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-medium">{material.name}</h4>
                      <p className="text-sm text-muted-foreground">{material.brand}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm">{material.supplier?.name}</span>
                        {material.supplier?.verified && (
                          <ShieldCheck className="w-4 h-4 text-blue-500" />
                        )}
                      </div>
                    </div>
                  </div>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => onRemoveMaterial(material.id)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="space-y-2">
                  {comparison.attributes.map((attr, index) => {
                    const value = attr.values[material.id]
                    const isHighlighted = attr.highlight === material.id
                    
                    return (
                      <div key={index} className="flex justify-between items-center py-1">
                        <span className="text-sm font-medium">{attr.name}</span>
                        <div className={`flex items-center gap-1 ${isHighlighted ? 'text-primary font-medium' : ''}`}>
                          {attr.name === 'Rating' && value ? (
                            <>
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              <span className="text-sm">{value}</span>
                            </>
                          ) : (
                            <span className="text-sm">{value || '-'}</span>
                          )}
                          {attr.unit && value && <span className="text-xs text-muted-foreground">{attr.unit}</span>}
                          {isHighlighted && <Check className="w-4 h-4 text-green-500 ml-1" />}
                        </div>
                      </div>
                    )
                  })}
                  
                  {comparison.specifications?.map((spec, index) => (
                    <div key={`spec-${index}`} className="flex justify-between items-center py-1">
                      <span className="text-sm font-medium">{spec.name}</span>
                      <div className="flex items-center gap-1">
                        <span className="text-sm">{spec.values[material.id] || '-'}</span>
                        {spec.unit && spec.values[material.id] && (
                          <span className="text-xs text-muted-foreground">
                            {spec.unit}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Desktop View */}
        <div className="hidden sm:block mt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px] sticky left-0 bg-background z-10">
                  Feature
                </TableHead>
                {materials.map(material => (
                  <TableHead key={material.id} className="text-center min-w-[200px]">
                    <div className="space-y-2">
                      <div className="relative w-24 h-24 mx-auto">
                        {material.images?.[0]?.url ? (
                          <Image
                            src={material.images[0].url}
                            alt={material.name}
                            fill
                            className="object-cover rounded"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-200 rounded" />
                        )}
                      </div>
                      <h4 className="font-medium line-clamp-2">{material.name}</h4>
                      <p className="text-sm text-muted-foreground">{material.brand}</p>
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-sm">{material.supplier?.name}</span>
                        {material.supplier?.verified && (
                          <ShieldCheck className="w-4 h-4 text-blue-500" />
                        )}
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => onRemoveMaterial(material.id)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {comparison.attributes.map((attr, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium sticky left-0 bg-background z-10">
                    {attr.name}
                  </TableCell>
                  {materials.map(material => {
                    const value = attr.values[material.id]
                    const isHighlighted = attr.highlight === material.id
                    
                    return (
                      <TableCell 
                        key={material.id} 
                        className={`text-center ${isHighlighted ? 'bg-primary/10' : ''}`}
                      >
                        <div className="flex items-center justify-center gap-1">
                          {attr.name === 'Rating' && value ? (
                            <>
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              <span>{value}</span>
                            </>
                          ) : (
                            <span>{value || '-'}</span>
                          )}
                          {attr.unit && value && <span className="text-sm text-muted-foreground">{attr.unit}</span>}
                          {isHighlighted && <Check className="w-4 h-4 text-green-500 ml-1" />}
                        </div>
                      </TableCell>
                    )
                  })}
                </TableRow>
              ))}
              
              {comparison.specifications?.map((spec, index) => (
                <TableRow key={`spec-${index}`}>
                  <TableCell className="font-medium sticky left-0 bg-background z-10">
                    {spec.name}
                  </TableCell>
                  {materials.map(material => (
                    <TableCell key={material.id} className="text-center">
                      {spec.values[material.id] || '-'}
                      {spec.unit && spec.values[material.id] && (
                        <span className="text-sm text-muted-foreground ml-1">
                          {spec.unit}
                        </span>
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        <div className="flex justify-between mt-6 p-6 sm:p-0">
          <Button variant="outline" onClick={onClearComparison}>
            Clear Comparison
          </Button>
          <Button onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

interface ComparisonBarProps {
  materials: Array<{ id: string; name: string; image?: string }>
  onRemove: (id: string) => void
  onCompare: () => void
  onClear: () => void
}

export function ComparisonBar({ materials, onRemove, onCompare, onClear }: ComparisonBarProps) {
  if (materials.length === 0) return null
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t shadow-lg z-40">
      <div className="container mx-auto px-4 py-3 sm:py-4">
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:justify-between">
          <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto">
            <span className="font-medium text-sm sm:text-base">Compare ({materials.length}/5)</span>
            <div className="flex gap-1 sm:gap-2 flex-1 justify-center sm:justify-start">
              {materials.map(material => (
                <div key={material.id} className="relative">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 relative">
                    {material.image ? (
                      <Image
                        src={material.image}
                        alt={material.name}
                        fill
                        className="object-cover rounded"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 rounded" />
                    )}
                  </div>
                  <Button
                    size="icon"
                    variant="secondary"
                    className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 h-5 w-5 sm:h-6 sm:w-6"
                    onClick={() => onRemove(material.id)}
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </div>
              ))}
              {[...Array(5 - materials.length)].map((_, i) => (
                <div key={`empty-${i}`} className="w-12 h-12 sm:w-16 sm:h-16 border-2 border-dashed rounded" />
              ))}
            </div>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <Button variant="outline" onClick={onClear} className="flex-1 sm:flex-initial text-sm sm:text-base">
              Clear All
            </Button>
            <Button onClick={onCompare} disabled={materials.length < 2} className="flex-1 sm:flex-initial text-sm sm:text-base">
              Compare Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}