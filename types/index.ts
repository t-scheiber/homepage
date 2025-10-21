// Shared type definitions

export interface Certificate {
  href: string;
  src: string;
  alt: string;
  title: string;
}

export interface Project {
  name: string;
  url: string;
  description?: string;
}

export interface ExternalLink {
  href: string;
  logoSrc: string;
  name: string;
}

export interface TileLink {
  href: string;
  label: string;
  icon: string;
  alt: string;
  priority?: boolean;
  external?: boolean;
  download?: string;
}
