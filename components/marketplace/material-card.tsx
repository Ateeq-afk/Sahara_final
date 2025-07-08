'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ShoppingCart, Heart, Star, TruckIcon, ShieldCheck } from 'lucide-react'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import type { Material } from '@/src/types/marketplace'

interface MaterialCardProps {
  material: Material
  onAddToCart?: (material: Material) => void
  onAddToWishlist?: (material: Material) => void
  onCompare?: (material: Material) => void
  isInComparison?: boolean
}

export function MaterialCard({ 
  material, 
  onAddToCart, 
  onAddToWishlist,
  onCompare,
  isInComparison = false
}: MaterialCardProps) {
  const [quantity, setQuantity] = useState(material.availability.minOrder || 1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  
  const primaryImage = material.images.find(img => img.isPrimary) || material.images[0]
  const pricing = material.pricing
  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: pricing.currency
  }).format(pricing.basePrice)
  
  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart({ ...material, quantity } as any)
      toast.success(`${material.name} added to cart`)
    }
  }
  
  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted)
    if (onAddToWishlist) {
      onAddToWishlist(material)
      toast.success(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist')
    }
  }
  
  const handleCompare = () => {
    if (onCompare) {
      onCompare(material)
    }
  }
  
  return (
    <Card className="h-full hover:shadow-lg transition-all duration-300 group">
      <div className="relative aspect-square overflow-hidden rounded-t-lg bg-gray-100">
        {primaryImage ? (
          <Image
            src={primaryImage.url}
            alt={primaryImage.alt}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400">No image</span>
          </div>
        )}
        
        {material.availability.inStock ? (
          <Badge className="absolute top-2 left-2 bg-green-500">In Stock</Badge>
        ) : (
          <Badge className="absolute top-2 left-2 bg-red-500">Out of Stock</Badge>
        )}
        
        {material.supplier.verified && (
          <Badge className="absolute top-2 right-2 bg-blue-500">
            <ShieldCheck className="w-3 h-3 mr-1" />
            Verified
          </Badge>
        )}
        
        <Button
          size="icon"
          variant="secondary"
          className={`absolute bottom-2 right-2 ${isWishlisted ? 'text-red-500' : ''}`}
          onClick={handleWishlist}
        >
          <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </Button>
      </div>
      
      <CardContent className="p-4">
        <Link href={`/marketplace/materials/${material.id}`}>
          <h3 className="font-semibold text-lg hover:text-primary transition-colors line-clamp-2">
            {material.name}
          </h3>
        </Link>
        
        <p className="text-sm text-muted-foreground mt-1">{material.brand}</p>
        
        <div className="flex items-center gap-2 mt-2">
          <div className="flex items-center">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium ml-1">{material.ratings.average.toFixed(1)}</span>
          </div>
          <span className="text-sm text-muted-foreground">({material.ratings.count} reviews)</span>
        </div>
        
        <div className="mt-3">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold">{formattedPrice}</span>
            <span className="text-sm text-muted-foreground">/{pricing.unit}</span>
          </div>
          
          {pricing.bulkPricing?.length > 0 && (
            <p className="text-sm text-green-600 mt-1">
              Bulk discounts available
            </p>
          )}
        </div>
        
        <div className="flex items-center gap-2 mt-3 text-sm text-muted-foreground">
          <TruckIcon className="w-4 h-4" />
          <span>
            {material.availability.leadTime 
              ? `Delivery in ${material.availability.leadTime} days`
              : 'Standard delivery'
            }
          </span>
        </div>
        
        <p className="text-sm text-muted-foreground mt-2">
          Supplied by {material.supplier.name}
        </p>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 gap-2">
        <div className="flex items-center gap-2 flex-1">
          <Button
            size="sm"
            variant="outline"
            onClick={() => setQuantity(Math.max(material.availability.minOrder, quantity - 1))}
            disabled={quantity <= material.availability.minOrder}
          >
            -
          </Button>
          <span className="w-12 text-center">{quantity}</span>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setQuantity(quantity + 1)}
            disabled={material.availability.maxOrder ? quantity >= material.availability.maxOrder : false}
          >
            +
          </Button>
        </div>
        
        <Button 
          size="sm" 
          onClick={handleAddToCart}
          disabled={!material.availability.inStock}
          className="flex-1"
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          Add to Cart
        </Button>
        
        {onCompare && (
          <Button
            size="sm"
            variant={isInComparison ? "secondary" : "outline"}
            onClick={handleCompare}
          >
            {isInComparison ? "In Compare" : "Compare"}
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}