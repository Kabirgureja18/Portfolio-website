export interface ProjectClip {
  title: string;
  tag: string;
  caption: string;
  imageUrl: string;
  source?: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'Climate & BioTech' | 'AI & Software' | 'Robotics & Hardware' | 'Web & Products' | 'Experimental';
  status: 'ACTIVE' | 'IN DEVELOPMENT' | 'EXPERIMENTAL' | 'CONCEPT' | 'COMPLETED';
  year: string;
  summary: string;
  description: string;
  highlights: string[];
  techStack: string[];
  links?: {
    label: string;
    url: string;
    isExternal?: boolean;
  }[];
  accentColor: string;
  featured?: boolean;
  visualType?: 'terra' | 'jarvis' | 'browser' | 'robotics' | 'web' | 'ecommerce' | 'farmverse';
  clips?: ProjectClip[];
  embed3dUrl?: string;
  liveUrl?: string;
}

export interface AchievementItem {
  id: string;
  title: string;
  organization: string;
  year: string;
  date?: string;
  category: 'Award' | 'Robotics' | 'MUN' | 'Press & Billboard' | 'Milestone' | 'Certificate';
  awardLevel?: 'Winner' | 'Commendation' | 'Featured' | 'Certified' | 'Finalist' | 'Special Mention';
  description: string;
  highlights?: string[];
  verifiedNote?: string;
  badge?: string;
  photoUrl?: string;
  certificateUrl?: string;
  evidenceType?: 'Certificate' | 'Photograph' | 'Press Clippings' | 'Billboard Display' | 'Hardware Demo' | 'Official Commendation';
  credentialId?: string;
  issuerUrl?: string;
  featured?: boolean;
  tags?: string[];
}

export interface InterestItem {
  id: string;
  name: string;
  category: 'Tech' | 'Creative' | 'Athletics & Lore' | 'Business';
  tagline: string;
  iconName: string;
  note?: string;
}

export interface FunFactItem {
  id: string;
  title: string;
  fact: string;
  tag: string;
}

export interface ArtworkItem {
  id: string;
  title: string;
  medium: string;
  year: string;
  description: string;
  aspectRatio: string;
  palette: string[];
  billboardFeatured?: boolean;
  tag: string;
}

export interface PhotoItem {
  id: string;
  title: string;
  location: string;
  year: string;
  camera: string;
  mood: string;
  description: string;
}

export interface ProductItem {
  id: string;
  name: string;
  type: string;
  status: string;
  description: string;
  priceNote?: string;
}

export interface MarvelQuestion {
  id: string;
  question: string;
  theoryTopic: string;
  senderName: string;
  email: string;
  date: string;
}
