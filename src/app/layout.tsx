import type { Metadata } from "next";
import localFont from 'next/font/local'
import "./globals.css";
import MarqueeBar from './MarqueeBar'
import { hygraph } from '@/lib/hygraph'
import { getPageQuery } from '@/lib/queries'
import type { Page } from '@/types/hygraph'

const mono = localFont({
  src: [
    {
      path: '../../public/fonts/PanamaMonospaceRegular.woff',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/PanamaMonospaceItalic.woff',
      weight: '400',
      style: 'italic',
    }
  ],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: "Bodega Import",
  description: "Vin är vår vardag. Men framför allt är det vår passion. Därför har vi samlat flaskor vi älskar från en grupp spännande producenter runt om i världen.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const data = await hygraph.request<{ pages: Page[] }>(getPageQuery)
  const page = data.pages[0]
  let marqueeContent = page.marquee;
  if (Array.isArray(marqueeContent)) {
    while (marqueeContent.length < 6) {
      marqueeContent = marqueeContent.concat(marqueeContent);
    }
    marqueeContent = marqueeContent.slice(0, 6);
  }
  return (
    <html lang="sv">
      <body
        className={`${mono.variable} font-mono antialiased`}
        style={{
          '--font-serif': 'Times New Roman, Times, serif',
        } as React.CSSProperties}
      >
        {marqueeContent && <MarqueeBar content={marqueeContent} />}
        {children}
      </body>
    </html>
  );
}
