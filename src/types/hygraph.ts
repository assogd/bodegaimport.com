export interface Link {
  id: string
  href: string
  value: string
}

export interface Section {
  id: string
  body: string
  cta?: Link
}

export interface SEO {
  title: string
  description: string
  image?: {
    url: string
  }
}

export interface Page {
  content?: Section[]
  seo?: SEO
} 