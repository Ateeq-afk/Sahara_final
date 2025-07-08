export interface Material {
  id: string;
  name: string;
  description: string;
  category: MaterialCategory;
  subcategory: string;
  brand: string;
  model?: string;
  specifications: MaterialSpecification[];
  images: MaterialImage[];
  pricing: MaterialPricing;
  availability: MaterialAvailability;
  supplier: Supplier;
  ratings: MaterialRating;
  tags: string[];
  certifications: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface MaterialCategory {
  id: string;
  name: string;
  parentId?: string;
  icon?: string;
  description?: string;
}

export interface MaterialSpecification {
  name: string;
  value: string;
  unit?: string;
}

export interface MaterialImage {
  id: string;
  url: string;
  alt: string;
  isPrimary: boolean;
  type: 'product' | 'technical' | 'installation';
}

export interface MaterialPricing {
  basePrice: number;
  unit: 'piece' | 'sqft' | 'sqm' | 'kg' | 'ton' | 'liter' | 'cum';
  currency: string;
  bulkPricing: BulkPricing[];
  gst: number;
  discounts?: Discount[];
}

export interface BulkPricing {
  minQuantity: number;
  maxQuantity?: number;
  pricePerUnit: number;
}

export interface Discount {
  type: 'percentage' | 'fixed';
  value: number;
  validFrom: Date;
  validTo: Date;
  code?: string;
}

export interface MaterialAvailability {
  inStock: boolean;
  quantity: number;
  leadTime?: number; // in days
  minOrder: number;
  maxOrder?: number;
  warehouse: string[];
}

export interface Supplier {
  id: string;
  name: string;
  logo?: string;
  description: string;
  verified: boolean;
  rating: number;
  totalReviews: number;
  contact: SupplierContact;
  categories: string[];
  certifications: string[];
  establishedYear: number;
  deliveryAreas: string[];
  paymentTerms: string[];
}

export interface SupplierContact {
  email: string;
  phone: string;
  whatsapp?: string;
  address: Address;
  website?: string;
}

export interface Address {
  street: string;
  area: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}

export interface MaterialRating {
  average: number;
  count: number;
  distribution: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
  reviews: Review[];
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  title: string;
  comment: string;
  verified: boolean;
  helpful: number;
  images?: string[];
  createdAt: Date;
}

export interface MaterialOrder {
  id: string;
  orderId: string;
  materialId: string;
  material: Material;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  status: OrderStatus;
  deliveryDate?: Date;
  notes?: string;
}

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  items: MaterialOrder[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod?: string;
  shippingAddress: Address;
  billingAddress?: Address;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type OrderStatus = 
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'refunded';

export type PaymentStatus = 
  | 'pending'
  | 'processing'
  | 'completed'
  | 'failed'
  | 'refunded';

export interface MaterialFilter {
  categories?: string[];
  subcategories?: string[];
  brands?: string[];
  priceRange?: {
    min: number;
    max: number;
  };
  ratings?: number;
  availability?: boolean;
  suppliers?: string[];
  certifications?: string[];
  tags?: string[];
}

export interface MaterialSearchParams {
  query?: string;
  filters?: MaterialFilter;
  sort?: {
    field: 'price' | 'rating' | 'name' | 'createdAt';
    order: 'asc' | 'desc';
  };
  pagination?: {
    page: number;
    limit: number;
  };
}

export interface MaterialComparison {
  materials: Material[];
  attributes: ComparisonAttribute[];
  specifications?: any[];
}

export interface ComparisonAttribute {
  name: string;
  values: { [materialId: string]: string | number };
  unit?: string;
  highlight?: 'lowest' | 'highest';
}

export interface Cart {
  id: string;
  userId: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CartItem {
  materialId: string;
  material: Material;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  notes?: string;
}

export interface Wishlist {
  id: string;
  userId: string;
  items: WishlistItem[];
  createdAt: Date;
  updatedAt: Date;
}

export interface WishlistItem {
  materialId: string;
  material: Material;
  addedAt: Date;
  notes?: string;
}