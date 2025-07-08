export interface ProjectImage {
  id: string;
  url: string;
  alt: string;
  type: 'before' | 'after' | '360' | 'gallery';
}

export interface ProjectSpec {
  label: string;
  value: string;
  icon?: string;
}

export interface ProjectStats {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
}

export interface ProjectTimeline {
  phase: string;
  duration: string;
  completed: boolean;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: 'residential' | 'commercial' | 'renovation';
  images: ProjectImage[];
  specs: ProjectSpec[];
  stats: ProjectStats[];
  timeline: ProjectTimeline[];
  budget: {
    estimated: number;
    actual: number;
    currency: string;
  };
  completionDate: string;
  location: string;
  client: {
    name: string;
    testimonial?: string;
  };
  features: string[];
}