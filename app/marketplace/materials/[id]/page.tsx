'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { 
  ShoppingCart, Heart, Share2, ChevronLeft, Star, TruckIcon, 
  ShieldCheck, Package, Clock, ArrowRight, Check 
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { toast } from 'sonner'
import type { Material } from '@/src/types/marketplace'

export default function MaterialDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [material, setMaterial] = useState<Material | null>(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [isWishlisted, setIsWishlisted] = useState(false)
  
  useEffect(() => {
    fetchMaterial()
  }, [params.id]) // eslint-disable-line react-hooks/exhaustive-deps
  
  const fetchMaterial = async () => {
    try {
      const response = await fetch(`/api/marketplace/materials/${params.id}`)
      const data = await response.json()
      
      if (response.ok) {
        setMaterial(data.material)
        setQuantity(data.material.availability.minOrder || 1)
      } else {
        toast.error('Material not found')
        router.push('/marketplace')
      }
    } catch (error) {
      toast.error('Error loading material')
    } finally {
      setLoading(false)
    }
  }
  
  const handleAddToCart = () => {
    toast.success(`${material?.name} added to cart`)
  }
  
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: material?.name,
        text: material?.description,
        url: window.location.href
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      toast.success('Link copied to clipboard')
    }
  }
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="container mx-auto px-4 py-8">
          <Skeleton className="h-8 w-32 mb-6" />
          <div className="grid lg:grid-cols-2 gap-8">
            <Skeleton className="aspect-square" />
            <div className="space-y-4">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  if (!material) return null
  
  const pricing = material.pricing
  const totalPrice = pricing.basePrice * quantity
  const gstAmount = totalPrice * (pricing.gst / 100)
  const finalPrice = totalPrice + gstAmount
  
  const applicableBulkPrice = pricing.bulkPricing?.find(
    bulk => quantity >= bulk.minQuantity && (!bulk.maxQuantity || quantity <= bulk.maxQuantity)
  )
  
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="mb-6"
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Back to Marketplace
        </Button>
        
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Images Section */}
          <div className="space-y-4">
            <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
              {material.images[selectedImage] ? (
                <Image
                  src={material.images[selectedImage].url}
                  alt={material.images[selectedImage].alt}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-gray-400">No image</span>
                </div>
              )}
            </div>
            
            {material.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {material.images.map((image, index) => (
                  <button
                    key={image.id}
                    onClick={() => setSelectedImage(index)}
                    className={`relative aspect-square overflow-hidden rounded-md border-2 ${
                      selectedImage === index ? 'border-primary' : 'border-transparent'
                    }`}
                  >
                    <Image
                      src={image.url}
                      alt={image.alt}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Details Section */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">{material.name}</h1>
              <div className="flex items-center gap-4 mb-4">
                <p className="text-lg text-muted-foreground">{material.brand}</p>
                {material.model && (
                  <>
                    <Separator orientation="vertical" className="h-5" />
                    <p className="text-lg text-muted-foreground">Model: {material.model}</p>
                  </>
                )}
              </div>
              
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="text-lg font-medium ml-1">{material.ratings.average.toFixed(1)}</span>
                </div>
                <span className="text-muted-foreground">({material.ratings.count} reviews)</span>
                
                {material.supplier.verified && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" />
                    Verified Supplier
                  </Badge>
                )}
              </div>
              
              <p className="text-muted-foreground">{material.description}</p>
            </div>
            
            <Separator />
            
            {/* Pricing */}
            <div className="space-y-4">
              <div>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-3xl font-bold">
                    ₹{applicableBulkPrice ? applicableBulkPrice.pricePerUnit : pricing.basePrice}
                  </span>
                  <span className="text-lg text-muted-foreground">/{pricing.unit}</span>
                  {applicableBulkPrice && (
                    <Badge variant="secondary" className="ml-2">Bulk Price</Badge>
                  )}
                </div>
                
                {pricing.bulkPricing && pricing.bulkPricing.length > 0 && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3 mt-2">
                    <p className="text-sm font-medium text-green-800 mb-2">Bulk Pricing Available:</p>
                    <div className="space-y-1">
                      {pricing.bulkPricing.map((bulk, index) => (
                        <p key={index} className="text-sm text-green-700">
                          {bulk.minQuantity}+ units: ₹{bulk.pricePerUnit}/{pricing.unit}
                        </p>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              {/* Quantity Selector */}
              <div>
                <label className="text-sm font-medium mb-2 block">Quantity</label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => setQuantity(Math.max(material.availability.minOrder, quantity - 1))}
                      disabled={quantity <= material.availability.minOrder}
                    >
                      -
                    </Button>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(material.availability.minOrder, parseInt(e.target.value) || 1))}
                      className="w-20 text-center border rounded-md px-2 py-1"
                    />
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => setQuantity(quantity + 1)}
                      disabled={material.availability.maxOrder ? quantity >= material.availability.maxOrder : false}
                    >
                      +
                    </Button>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    Min: {material.availability.minOrder} {pricing.unit}
                  </span>
                </div>
              </div>
              
              {/* Price Summary */}
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>₹{totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>GST ({pricing.gst}%)</span>
                      <span>₹{gstAmount.toFixed(2)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>₹{finalPrice.toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Actions */}
              <div className="flex gap-3">
                <Button 
                  size="lg" 
                  className="flex-1"
                  onClick={handleAddToCart}
                  disabled={!material.availability.inStock}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => setIsWishlisted(!isWishlisted)}
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current text-red-500' : ''}`} />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={handleShare}
                >
                  <Share2 className="w-5 h-5" />
                </Button>
              </div>
              
              {/* Availability Info */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Package className="w-5 h-5 text-muted-foreground" />
                  <span className={material.availability.inStock ? 'text-green-600' : 'text-red-600'}>
                    {material.availability.inStock 
                      ? `${material.availability.quantity} ${pricing.unit} in stock`
                      : 'Out of stock'
                    }
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <TruckIcon className="w-5 h-5 text-muted-foreground" />
                  <span>
                    Delivery in {material.availability.leadTime || 2-3} days
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-muted-foreground" />
                  <span>Sold by {material.supplier.name}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Tabs Section */}
        <Tabs defaultValue="specifications" className="mt-12">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="supplier">Supplier Info</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="certifications">Certifications</TabsTrigger>
          </TabsList>
          
          <TabsContent value="specifications" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Technical Specifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {material.specifications.map((spec, index) => (
                    <div key={index} className="flex justify-between py-2 border-b last:border-0">
                      <span className="font-medium">{spec.name}</span>
                      <span className="text-muted-foreground">
                        {spec.value} {spec.unit}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="supplier" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {material.supplier.name}
                  {material.supplier.verified && (
                    <Badge variant="secondary">
                      <ShieldCheck className="w-3 h-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>{material.supplier.description}</p>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">Contact Information</h4>
                    <div className="space-y-1 text-sm">
                      <p>Email: {material.supplier.contact.email}</p>
                      <p>Phone: {material.supplier.contact.phone}</p>
                      {material.supplier.contact.website && (
                        <p>Website: {material.supplier.contact.website}</p>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Business Details</h4>
                    <div className="space-y-1 text-sm">
                      <p>Established: {material.supplier.establishedYear}</p>
                      <p>Rating: {material.supplier.rating}/5 ({material.supplier.totalReviews} reviews)</p>
                      <p>Payment Terms: {material.supplier.paymentTerms.join(', ')}</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Delivery Areas</h4>
                  <div className="flex flex-wrap gap-2">
                    {material.supplier.deliveryAreas.map((area, index) => (
                      <Badge key={index} variant="outline">{area}</Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="reviews" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Customer Reviews</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-8 mb-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold">{material.ratings.average.toFixed(1)}</div>
                    <div className="flex items-center justify-center mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < Math.round(material.ratings.average)
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {material.ratings.count} reviews
                    </p>
                  </div>
                  
                  <div className="flex-1 space-y-2">
                    {[5, 4, 3, 2, 1].map(rating => {
                      const count = material.ratings.distribution[rating as keyof typeof material.ratings.distribution]
                      const percentage = (count / material.ratings.count) * 100
                      
                      return (
                        <div key={rating} className="flex items-center gap-2">
                          <span className="text-sm w-3">{rating}</span>
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-yellow-400 h-2 rounded-full"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                          <span className="text-sm text-muted-foreground w-12 text-right">
                            {count}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </div>
                
                {material.ratings?.reviews && material.ratings.reviews.length > 0 ? (
                  <div className="space-y-4 mt-6">
                    {material.ratings.reviews.map(review => (
                      <div key={review.id} className="border-b pb-4 last:border-0">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <span className="font-medium">{review.userName}</span>
                            {review.verified && (
                              <Badge variant="secondary" className="ml-2 text-xs">
                                Verified Purchase
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < review.rating
                                    ? 'fill-yellow-400 text-yellow-400'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <h4 className="font-medium mb-1">{review.title}</h4>
                        <p className="text-sm text-muted-foreground">{review.comment}</p>
                        <p className="text-xs text-muted-foreground mt-2">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground py-8">
                    No reviews yet. Be the first to review this product!
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="certifications" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Certifications & Standards</CardTitle>
              </CardHeader>
              <CardContent>
                {material.certifications && material.certifications.length > 0 ? (
                  <div className="grid md:grid-cols-2 gap-4">
                    {material.certifications.map((cert, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Check className="w-5 h-5 text-green-600" />
                        <span>{cert}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">No certifications listed</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}