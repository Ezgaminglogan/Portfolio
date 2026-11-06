export interface Screenshot {
  src: string;
  alt: string;
  /** Intrinsic size, so tall phone shots don't shift the layout. Default 1600×900. */
  width?: number;
  height?: number;
  caption?: string;
}

export interface Project {
  title: string;
  summary: string;
  /** Longer copy for the details dialog; falls back to `summary`. */
  description?: string[];
  features: string[];
  /** Flagship card: shown full-width above the featured grid. */
  flagship?: boolean;
  /**
   * CSS background sampled from a designed cover's own edges. When set, the cover
   * is shown whole (object-contain) on this matte instead of cropped, keeping the
   * project's brand colors.
   */
  matte?: string;
  label?: string;
  stats?: { value: string; label: string }[];
  downloadUrl?: string;
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
