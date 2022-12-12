import Link from "next/link";
import { PrismicLink, PrismicProvider } from "@prismicio/react";
import { PrismicPreview } from "@prismicio/next";

import { repositoryName, linkResolver } from "../prismicio";
import { Heading } from "../components/Heading";

import "../styles/globals.css";
import { AnimatePresence } from "framer-motion";

import { generateKey } from "../lib/utils";

const NextLinkShim = ({ href, children, locale, ...props }) => {
  return (
    <Link href={href} locale={locale}>
      <a {...props}>{children}</a>
    </Link>
  );
};

const richTextComponents = {
  heading1: ({ children }) => (
    <Heading as="h1" className="mb-7 mt-12 inline-block first:mt-0 last:mb-0">
      {children}
    </Heading>
  ),
  heading2: ({ children }) => (
    <Heading
      as="h2"
      size="md"
      className="mb-7 mt-12 inline-block first:mt-0 last:mb-0"
    >
      {children}
    </Heading>
  ),
  heading3: ({ children }) => (
    <Heading
      as="h3"
      size="md"
      className="mb-4 mt-8 font-serif first:mt-0 last:mb-0"
    >
      {children}
    </Heading>
  ),
  heading5: ({ children }) => <h5 className="mb-2 underline">{children}</h5>,
  paragraph: ({ children }) => <p className="mb-4 last:mb-0">{children}</p>,
  oList: ({ children }) => (
    <ol className="mb-7 pl-4 last:mb-0 sm:pl-6">{children}</ol>
  ),
  oListItem: ({ children }) => (
    <li className="mb-1 list-decimal pl-1 last:mb-0 sm:pl-2">{children}</li>
  ),
  list: ({ children }) => (
    <ul className="mx-auto max-w-xl list-inside rounded-md bg-white text-left last:mb-0">
      {children}
    </ul>
  ),
  listItem: ({ children }) => (
    <li className="mb-2 list-disc last:mb-0 sm:pl-2">{children}</li>
  ),
  preformatted: ({ children }) => (
    <pre className="bg-slate-100 mb-7 rounded-md p-4 text-sm last:mb-0 sm:p-8 sm:text-lg">
      <code>{children}</code>
    </pre>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold">{children}</strong>
  ),
  hyperlink: ({ children, node }) => (
    <PrismicLink
      field={node.data}
      className="underline decoration-1 underline-offset-2"
    >
      {children}
    </PrismicLink>
  ),
};

export default function App({ Component, pageProps, router }) {
  return (
    <PrismicProvider
      linkResolver={linkResolver}
      internalLinkComponent={NextLinkShim}
      richTextComponents={richTextComponents}
    >
      <PrismicPreview repositoryName={repositoryName}>
        <AnimatePresence mode="wait" initial={false}>
          <Component {...pageProps} key={generateKey} />
        </AnimatePresence>
      </PrismicPreview>
    </PrismicProvider>
  );
}
