// Type definitions for better type safety

export interface SocialLink {
  href: string;
  label: string;
  imageSrc: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
  external?: boolean;
  textMargin?: string;
}

export interface TileConfig {
  href: string;
  label: string;
  imageSrc: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
  priority?: boolean;
  className?: string;
  imageClassName?: string;
  textMargin?: string;
  external?: boolean;
}

