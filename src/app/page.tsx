import { Metadata } from 'next'
import { hygraph } from '@/lib/hygraph'
import { getPageQuery } from '@/lib/queries'
import type { Page } from '@/types/hygraph'

export async function generateMetadata(): Promise<Metadata> {
  const data = await hygraph.request<{ pages: Page[] }>(getPageQuery)
  const page = data.pages[0]
  
  if (!page?.seo) {
    return {
      title: 'Bodega Import',
      description: 'Vin är vår vardag. Men framför allt är det vår passion. Därför har vi samlat flaskor vi älskar från en grupp spännande producenter runt om i världen.'
    }
  }

  return {
    title: page.seo.title,
    description: page.seo.description,
    openGraph: {
      title: page.seo.title,
      description: page.seo.description,
      images: page.seo.image ? [page.seo.image.url] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: page.seo.title,
      description: page.seo.description,
      images: page.seo.image ? [page.seo.image.url] : [],
    },
  }
}

export default async function Home() {
  const data = await hygraph.request<{ pages: Page[] }>(getPageQuery)
  const page = data.pages[0]

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">{page.seo?.title || 'Home'}</h1>
      {page.content?.map((section) => (
        <section key={section.id} className="mt-8">
          <div dangerouslySetInnerHTML={{ __html: section.body }} />
          {section.cta && (
            <a 
              href={section.cta.href}
              className="inline-block mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              {section.cta.value}
            </a>
          )}
        </section>
      ))}
    </main>
  )
}