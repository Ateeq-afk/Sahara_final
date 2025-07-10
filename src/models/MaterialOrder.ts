import mongoose from 'mongoose'

const MaterialOrderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  customerName: {
    type: String,
    required: true
  },
  customerEmail: {
    type: String,
    required: true
  },
  customerPhone: {
    type: String,
    required: true
  },
  items: [{
    materialId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Material',
      required: true
    },
    material: {
      name: String,
      brand: String,
      model: String,
      image: String,
      unit: String
    },
    supplierId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Supplier',
      required: true
    },
    supplierName: String,
    quantity: {
      type: Number,
      required: true
    },
    unitPrice: {
      type: Number,
      required: true
    },
    totalPrice: {
      type: Number,
      required: true
    },
    tax: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded'],
      default: 'pending'
    },
    deliveryDate: Date,
    trackingNumber: String,
    notes: String
  }],
  pricing: {
    subtotal: {
      type: Number,
      required: true
    },
    tax: {
      type: Number,
      required: true
    },
    shipping: {
      type: Number,
      default: 0
    },
    discount: {
      type: Number,
      default: 0
    },
    total: {
      type: Number,
      required: true
    }
  },
  payment: {
    method: {
      type: String,
      enum: ['online', 'cod', 'bank_transfer', 'cheque', 'cash'],
      required: true
    },
    status: {
      type: String,
      enum: ['pending', 'processing', 'completed', 'failed', 'refunded'],
      default: 'pending'
    },
    transactionId: String,
    paidAt: Date,
    refundedAt: Date,
    refundAmount: Number
  },
  addresses: {
    shipping: {
      street: {
        type: String,
        required: true
      },
      area: {
        type: String,
        required: true
      },
      city: {
        type: String,
        required: true
      },
      state: {
        type: String,
        required: true
      },
      pincode: {
        type: String,
        required: true
      },
      country: {
        type: String,
        default: 'India'
      },
      landmark: String
    },
    billing: {
      street: String,
      area: String,
      city: String,
      state: String,
      pincode: String,
      country: String,
      landmark: String
    }
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded'],
    default: 'pending'
  },
  timeline: [{
    status: String,
    timestamp: Date,
    note: String,
    updatedBy: String
  }],
  delivery: {
    type: {
      type: String,
      enum: ['standard', 'express', 'scheduled'],
      default: 'standard'
    },
    estimatedDate: Date,
    actualDate: Date,
    slot: String,
    instructions: String
  },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project'
  },
  estimateId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Estimate'
  },
  invoice: {
    number: String,
    url: String,
    generatedAt: Date
  },
  notes: String,
  internalNotes: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
})

MaterialOrderSchema.index({ customerId: 1, createdAt: -1 })
MaterialOrderSchema.index({ status: 1 })
MaterialOrderSchema.index({ 'items.supplierId': 1 })
MaterialOrderSchema.index({ 'payment.status': 1 })

MaterialOrderSchema.pre('save', function(next) {
  this.updatedAt = new Date()
  
  if (this.isNew) {
    this.timeline.push({
      status: 'pending',
      timestamp: new Date(),
      note: 'Order created'
    })
    
    const year = new Date().getFullYear()
    const month = String(new Date().getMonth() + 1).padStart(2, '0')
    const random = Math.random().toString(36).substring(2, 8).toUpperCase()
    this.orderId = `ORD-${year}${month}-${random}`
  }
  
  if (this.isModified('status')) {
    this.timeline.push({
      status: this.status,
      timestamp: new Date()
    })
  }
  
  next()
})

MaterialOrderSchema.methods.calculateTotals = function() {
  let subtotal = 0
  let tax = 0
  
  this.items.forEach((item: any) => {
    subtotal += item.quantity * item.unitPrice
    tax += item.tax
  })
  
  const shipping = this.pricing.shipping || 0
  const discount = this.pricing.discount || 0
  const total = subtotal + tax + shipping - discount
  
  this.pricing = {
    subtotal,
    tax,
    shipping,
    discount,
    total
  }
}

MaterialOrderSchema.methods.updateItemStatus = async function(itemId: any, status: any, note?: any) {
  const item = this.items.id(itemId)
  if (item) {
    item.status = status
    if (note) item.notes = note
    
    const allDelivered = this.items.every((item: any) => item.status === 'delivered')
    const anyCancelled = this.items.some((item: any) => item.status === 'cancelled')
    const anyPending = this.items.some((item: any) => ['pending', 'confirmed', 'processing', 'shipped'].includes(item.status))
    
    if (allDelivered) {
      this.status = 'delivered'
      this.delivery.actualDate = new Date()
    } else if (!anyPending && anyCancelled) {
      this.status = 'cancelled'
    }
    
    await this.save()
  }
}

MaterialOrderSchema.methods.generateInvoice = async function() {
  const invoiceNumber = `INV-${this.orderId}`
  
  this.invoice = {
    number: invoiceNumber,
    generatedAt: new Date()
  }
  
  await this.save()
  return invoiceNumber
}

const MaterialOrder = (mongoose.models.MaterialOrder as mongoose.Model<any>) || mongoose.model('MaterialOrder', MaterialOrderSchema);

export default MaterialOrder;