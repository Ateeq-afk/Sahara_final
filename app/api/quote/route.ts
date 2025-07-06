import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const quoteSchema = z.object({
  // Personal Information
  fullName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  company: z.string().optional(),
  
  // Project Details
  projectType: z.enum(['new-construction', 'renovation', 'interior-design', 'commercial', 'other']),
  projectScope: z.array(z.string()),
  estimatedBudget: z.string(),
  timeline: z.string(),
  
  // Property Details
  propertyType: z.string(),
  propertySize: z.string(),
  propertyLocation: z.string(),
  currentCondition: z.string(),
  
  // Design Preferences
  designStyle: z.array(z.string()),
  keyFeatures: z.array(z.string()),
  specialRequirements: z.string(),
  
  // Additional Information
  hearAboutUs: z.string(),
  additionalComments: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate the request body
    const validatedData = quoteSchema.parse(body);
    
    // TODO: Implement actual quote processing logic here
    // Options:
    // 1. Send email notification to sales team
    // 2. Save to database for follow-up
    // 3. Integrate with CRM system
    // 4. Generate PDF quote estimate
    
    // For now, we'll simulate a successful submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Calculate estimated quote based on project details
    const basePrice = calculateBasePrice(validatedData);
    
    return NextResponse.json({
      success: true,
      message: 'Quote request submitted successfully',
      data: {
        id: `quote-${Date.now()}`,
        ...validatedData,
        estimatedQuote: {
          basePrice,
          priceRange: {
            min: basePrice * 0.9,
            max: basePrice * 1.2,
          },
          currency: 'INR',
          validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        },
        submittedAt: new Date().toISOString(),
        expectedResponseTime: '2-4 hours',
      }
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        success: false,
        message: 'Validation error',
        errors: error.errors,
      }, { status: 400 });
    }
    
    console.error('Quote form error:', error);
    return NextResponse.json({
      success: false,
      message: 'Internal server error',
    }, { status: 500 });
  }
}

function calculateBasePrice(data: z.infer<typeof quoteSchema>): number {
  // Simple price calculation logic
  let basePrice = 0;
  
  // Base price by project type
  const projectTypePrices: Record<string, number> = {
    'new-construction': 5000000,
    'renovation': 2000000,
    'interior-design': 1000000,
    'commercial': 8000000,
    'other': 3000000,
  };
  
  basePrice = projectTypePrices[data.projectType] || 3000000;
  
  // Adjust based on property size (assuming it's in sq ft)
  const sizeMatch = data.propertySize.match(/(\d+)/);
  if (sizeMatch) {
    const size = parseInt(sizeMatch[1]);
    basePrice = basePrice * (size / 2000); // Assuming 2000 sq ft as base
  }
  
  // Adjust based on features
  basePrice += data.keyFeatures.length * 100000;
  
  // Adjust based on design styles
  if (data.designStyle.includes('luxury') || data.designStyle.includes('premium')) {
    basePrice *= 1.5;
  }
  
  return Math.round(basePrice);
}