import Lead from '@/models/Lead';
import dbConnect from '@/lib/mongodb';
import mongoose from 'mongoose';

export interface CreateLeadData {
  name: string;
  email: string;
  phone?: string;
  source: 'contact' | 'quote' | 'lead-magnet' | 'manual';
  projectType?: string;
  budget?: string;
  timeline?: string;
  location?: string;
  message?: string;
  requirements?: string;
  downloadedResource?: string;
  interestedIn?: string;
  referralSource?: string;
  tags?: string[];
}

export class LeadService {
  static async createLead(data: CreateLeadData): Promise<any> {
    try {
      await dbConnect();
      
      // Check if lead already exists
      const existingLead = await Lead.findOne({ email: data.email });
      
      if (existingLead) {
        // Update existing lead with new activity
        const leadDoc = existingLead as any;
        leadDoc.activities.push({
          type: 'form_submission',
          description: `New ${data.source} form submission`,
          createdAt: new Date(),
        });
        
        // Update fields if provided
        if (data.phone && !leadDoc.phone) leadDoc.phone = data.phone;
        if (data.projectType) leadDoc.projectType = data.projectType;
        if (data.budget) leadDoc.budget = data.budget;
        if (data.timeline) leadDoc.timeline = data.timeline;
        if (data.location) leadDoc.location = data.location;
        if (data.message) {
          leadDoc.message = leadDoc.message 
            ? `${leadDoc.message}\n\n---\n\n${data.message}` 
            : data.message;
        }
        if (data.requirements) leadDoc.requirements = data.requirements;
        if (data.downloadedResource) leadDoc.downloadedResource = data.downloadedResource;
        if (data.interestedIn) leadDoc.interestedIn = data.interestedIn;
        if (data.referralSource) leadDoc.referralSource = data.referralSource;
        
        // Add new tags
        if (data.tags) {
          leadDoc.tags = Array.from(new Set([...leadDoc.tags, ...data.tags]));
        }
        
        // Recalculate score
        leadDoc.calculateScore();
        
        await leadDoc.save();
        return leadDoc;
      }
      
      // Create new lead
      const lead = new Lead({
        ...data,
        activities: [{
          type: 'created',
          description: `Lead created from ${data.source}`,
          createdAt: new Date(),
        }],
      });
      
      await lead.save();
      return lead;
    } catch (error) {
      console.error('Error creating lead:', error);
      throw new Error('Failed to create lead');
    }
  }
  
  static async createLeadFromQuote(quoteData: any): Promise<any> {
    const leadData: CreateLeadData = {
      name: quoteData.name,
      email: quoteData.email,
      phone: quoteData.phone,
      source: 'quote',
      projectType: quoteData.projectType,
      budget: quoteData.budget || quoteData.budgetRange,
      timeline: quoteData.timeline,
      location: quoteData.location || quoteData.city,
      requirements: quoteData.requirements || quoteData.additionalInfo,
      interestedIn: quoteData.services?.join(', '),
      tags: ['high-priority', quoteData.projectType],
    };
    
    return this.createLead(leadData);
  }
  
  static async createLeadFromContact(contactData: any): Promise<any> {
    const leadData: CreateLeadData = {
      name: contactData.name || contactData.fullName,
      email: contactData.email || '',
      phone: contactData.phone || contactData.phoneNumber,
      source: 'contact',
      message: contactData.message,
      tags: ['contact-form'],
    };
    
    // If no email, generate a placeholder
    if (!leadData.email && leadData.phone) {
      leadData.email = `${leadData.phone}@phone.placeholder`;
    }
    
    return this.createLead(leadData);
  }
  
  static async createLeadFromLeadMagnet(data: any): Promise<any> {
    const leadData: CreateLeadData = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      source: 'lead-magnet',
      downloadedResource: data.guide || data.resource,
      tags: ['lead-magnet', data.guide?.toLowerCase().replace(/\s+/g, '-')],
    };
    
    return this.createLead(leadData);
  }
}