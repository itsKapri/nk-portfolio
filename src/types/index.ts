export interface PersonalInfo {
  name: string;
  shortName: string;
  title: string;
  resumeUrl: string;
  email: string;
  location: string;
  heroTagline: string;
  bioParagraphs: string[];
}

export interface NavItem {
  label: string;
  href: string;
}

export interface TechStackItem {
  icon: string;
  name: string;
}

export interface ProjectItem {
  title: string;
  tags: string[];
  description: string;
  imageUrl: string;
  githubUrl: string;
  liveUrl: string;
}

export interface ExperienceItem {
  year: string;
  role: string;
  company: string;
  description: string;
}

export interface SocialLink {
  label: string;
  href: string;
}

export interface PortfolioData {
  personal: PersonalInfo;
  navigation: NavItem[];
  techStack: TechStackItem[];
  projects: ProjectItem[];
  experience: ExperienceItem[];
  socialLinks: SocialLink[];
}
