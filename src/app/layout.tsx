import type { Metadata } from "next";
import localFont from 'next/font/local'
import "./globals.css";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sv">
      <body
        className={`${mono.variable} font-mono antialiased`}
        style={{
          '--font-serif': 'Times New Roman, Times, serif',
        } as React.CSSProperties}
      >
        {children}
      </body>
    </html>
  );
}
