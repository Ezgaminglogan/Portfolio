export interface Screenshot {
  src: string;
  alt: string;
}

export interface Project {
  title: string;
  summary: string;
  features: string[];
  tech: string[];
  images: Screenshot[];
  kind: "Web application" | "Desktop application" | "Cross-platform application";
  context: string;
  featured?: boolean;
  /** Only set when verified (e.g. by a certificate or the repo). */
  status?: string;
  role?: string;
  outcome?: string;
  githubUrl?: string;
  liveUrl?: string;
}

export interface ExperienceItem {
  role: string;
  organization: string;
  period: string;
  description: string;
  skills: string[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  honor?: string;
  description: string;
}

export interface Certificate {
  title: string;
  issuer: string;
  date: string;
  kind: string;
  image: string;
  alt: string;
  note?: string;
  verifyUrl?: string;
}

export interface SkillGroup {
  title: string;
  items: string[];
}
