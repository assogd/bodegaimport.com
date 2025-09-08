import { Metadata } from 'next';
import { hygraph } from '@/lib/hygraph';
import { getPageQuery } from '@/lib/queries';
import type { Page, Section, Gallery } from '@/types/hygraph';
import Image from 'next/image';
import RootLayout from './layout';
import ReactMarkdown from 'react-markdown';
import clsx from 'clsx';
import LogotypeWall from './components/LogotypeWall';
import InlineNavigation from './components/InlineNavigation';
import RevalidateButton from './components/RevalidateButton';
import InstagramFeed from './components/InstagramFeed';
import LeftBird from './assets/svg/LeftBird';
import RightBird from './assets/svg/RightBird';
import Logotype from './assets/svg/Logotype';

export async function generateMetadata(): Promise<Metadata> {
  const data = await hygraph.request<{ pages: Page[] }>(getPageQuery);
  const page = data.pages[0];

  if (!page?.seo) {
    return {
      title: 'Bodega Import',
      description:
        'Vin är vår vardag. Men framför allt är det vår passion. Därför har vi samlat flaskor vi älskar från en grupp spännande producenter runt om i världen.',
    };
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
  };
}

function isGallery(section: Section | Gallery): section is Gallery {
  return 'assets' in section && Array.isArray(section.assets);
}

function isSection(section: Section | Gallery): section is Section {
  return 'body' in section;
}


export default async function Home() {
  const data = await hygraph.request<{ pages: Page[] }>(getPageQuery);
  const page = data.pages[0];

  function renderContent(section: Section | Gallery, i: number) {
    if (isGallery(section)) {
      return (
        <div
          key={section.id}
          className="col-span-full w-full max-w-4xl mx-auto pt-0 sm:pt-20 pb-16"
        >
          <div className="w-full flex flex-col gap-12">
            {section.assets.map((img, idx) => {
              const isPortrait = (img.file.height || 0) >= (img.file.width || 0);
              return (
                <figure
                  key={img.id || idx}
                  className={`${isPortrait ? 'max-w-[60%] sm:max-w-xs' : 'max-w-[80%] w-full sm:max-w-md'} ${idx % 2 === 0 ? 'ml-0 mr-auto' : 'ml-auto mr-0'}`}
                >
                  <Image
                    src={img.file.url}
                    alt={''}
                    width={img.file.width || 400}
                    height={img.file.height || 400}
                    sizes="(max-width: 640px) 100vw, 384px"
                    className="w-full"
                    priority={idx === 0}
                  />
                  {img.caption && (
                    <figcaption className="text-left text-xs uppercase mt-1">
                      {img.caption}
                    </figcaption>
                  )}
                </figure>
              );
            })}
          </div>
        </div>
      );
    }
    if (isSection(section)) {
      return (
        <section
          key={section.id}
          className={clsx('col-span-full grid gap-4', i < 3 ? 'max-w-sm' : 'max-w-4xl')}
        >
          <ReactMarkdown>{section.body}</ReactMarkdown>
          <InlineNavigation section={section} />
          {section.id === 'cmb0ssfo4brn608mdsbw3361u' && (
            <div className="relative w-full">
              <LeftBird />
              <RightBird />
            </div>
          )}
        </section>
      );
    }
    return null;
  }

  return (
    <RootLayout>
      {process.env.NODE_ENV === 'development' && (
        <nav className="fixed bottom-4 right-4 flex gap-2">
          <h3>Dev:</h3>
          <RevalidateButton />
        </nav>
      )}
      <main className="p-4 sm:p-8 !pt-36 grid grid-cols-12 gap-y-8 justify-items-center text-center">
        <header className="col-span-full grid gap-4 mb-8">
          <Logotype />
          <h1 className="font-serif text-2xl">Bodega Import</h1>
          <div className="flex flex-col gap-4">
            <p>
              Hornsbruksgatan 24
              <br />
              117 34 Stockholm
            </p>
            <p>
              +46 (0) 76 314 86 27
              <br />
              info@bodegaimport.com
            </p>
          </div>
        </header>
        {page.content?.map(renderContent)}
        <InstagramFeed />
        <footer className="col-span-full grid gap-4 mb-8 mt-24">
          <Logotype />
          <h1 className="font-serif text-2xl">Bodega Import</h1>
          <div className="flex flex-col gap-4">
            <p>
              Hornsbruksgatan 24
              <br />
              117 34 Stockholm
            </p>
            <p>
              +46 (0) 76 314 86 27
              <br />
              info@bodegaimport.com
            </p>
          </div>
          <div className="pt-24 px-16 grid gap-12">
            <h3>Bodega Import är en del av 20‑gruppen</h3>
            <LogotypeWall />
          </div>
        </footer>
      </main>
    </RootLayout>
  );
}
