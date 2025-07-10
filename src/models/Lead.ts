import mongoose, { Schema, Document } from 'mongoose';

export interface ILead extends Document {
  name: string;
  email: string;
  phone?: string;
  source: 'contact' | 'quote' | 'lead-magnet' | 'exit-intent' | 'manual';
  status: 'new' | 'contacted' | 'qualified' | 'proposal' | 'negotiation' | 'won' | 'lost';
  score: number;
  projectType?: string;
  budget?: string;
  timeline?: string;
  location?: string;
  message?: string;
  requirements?: string;
  downloadedResource?: string;
  interestedIn?: string;
  referralSource?: string;
  assignedTo?: mongoose.Types.ObjectId;
  notes: {
    content: string;
    createdBy: mongoose.Types.ObjectId;
    createdAt: Date;
  }[];
  activities: {
    type: string;
    description: string;
    createdBy?: mongoose.Types.ObjectId;
    createdAt: Date;
  }[];
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const leadSchema = new Schema<ILead>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'],
    },
    phone: {
      type: String,
      trim: true,
    },
    source: {
      type: String,
      required: true,
      enum: ['contact', 'quote', 'lead-magnet', 'exit-intent', 'manual'],
    },
    status: {
      type: String,
      enum: ['new', 'contacted', 'qualified', 'proposal', 'negotiation', 'won', 'lost'],
      default: 'new',
    },
    score: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    projectType: String,
    budget: String,
    timeline: String,
    location: String,
    message: String,
    requirements: String,
    downloadedResource: String,
    interestedIn: String,
    referralSource: String,
    assignedTo: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    notes: [{
      content: {
        type: String,
        required: true,
      },
      createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    }],
    activities: [{
      type: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    }],
    tags: [{
      type: String,
      lowercase: true,
      trim: true,
    }],
  },
  {
    timestamps: true,
  }
);

leadSchema.index({ email: 1 });
leadSchema.index({ status: 1 });
leadSchema.index({ source: 1 });
leadSchema.index({ assignedTo: 1 });
leadSchema.index({ createdAt: -1 });

leadSchema.methods.calculateScore = function() {
  let score = 0;
  
  if (this.source === 'quote') score += 30;
  else if (this.source === 'lead-magnet') score += 20;
  else if (this.source === 'contact') score += 15;
  else if (this.source === 'exit-intent') score += 10;
  
  if (this.phone) score += 10;
  
  if (this.budget) {
    if (this.budget.includes('75+') || this.budget.includes('100+')) score += 20;
    else if (this.budget.includes('50-75')) score += 15;
    else if (this.budget.includes('25-50')) score += 10;
  }
  
  if (this.timeline === 'Immediate (Within 1 month)') score += 15;
  else if (this.timeline === 'Short-term (1-3 months)') score += 10;
  
  if (this.referralSource) score += 10;
  
  const activityScore = Math.min(this.activities.length * 2, 10);
  score += activityScore;
  
  this.score = Math.min(score, 100);
  return this.score;
};

leadSchema.pre('save', function (next) {
  if (this.isNew) {
    this.activities.push({
      type: 'created',
      description: `Lead created from ${this.source}`,
      createdAt: new Date(),
    });
    
    (this as any).calculateScore();
  }
  
  next();
});

const Lead = (mongoose.models.Lead as mongoose.Model<ILead>) || mongoose.model<ILead>('Lead', leadSchema);

export default Lead;