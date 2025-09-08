export interface Link {
  id: string;
  href: string;
  value: string;
}

export interface LinkGroup {
  id: string;
  value: string;
  links: Link[];
}

export interface Section {
  id: string;
  body: string;
  cta?: Link;
  links?: (Link | LinkGroup)[];
}

export interface SEO {
  title: string;
  description: string;
  image?: {
    url: string;
  };
}

export interface ImageAsset {
  id: string;
  caption?: string;
  file: {
    url: string;
    width?: number;
    height?: number;
  };
}

export interface Gallery {
  id: string;
  assets: ImageAsset[];
}

export type SectionOrGallery = Section | Gallery;

export interface Page {
  content?: SectionOrGallery[];
  seo?: SEO;
  marquee?: string;
}
