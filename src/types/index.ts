import type { ComponentType, SVGProps } from "react";

export interface TechIconMap {
  [key: string]: string;
}

export interface SkillItem {
  name: string;
  icon: string;
  role?: string;
}

export interface StackCategory {
  title: string;
  badge: string;
  items: SkillItem[];
}

export interface ProfessionalSkill {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
  highlights: string[];
  accent: string;
  dot: string;
}

export interface CodeHighlight {
  filename: string;
  language: string;
  code: string;
  explanation: string;
}

export interface Project {
  title: string;
  description: string;
  tech: string[];
  gradient: string;
  image: string;
  type: string;
  liveUrl?: string;
  githubUrl?: string;
  codeHighlight?: CodeHighlight;
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  honor?: string;
  description: string;
  highlights?: string[];
}

export interface ExperienceItem {
  role: string;
  organization: string;
  period: string;
  type: string;
  badge?: string;
  description: string;
  skills?: string[];
}

export interface SqliteImageItem {
  src: string;
  alt: string;
}

export interface CertificateItem {
  image: string;
  alt: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
}

export interface ServiceItem {
  title: string;
  description: string;
  features: string[];
  accent: string;
}
