import Head from 'next/head'
import { APP_NAME, TWITTER_ACCOUNT, APP_URL } from '../../lib/const'

export const Title = ({ data }) =>
  data ? (
    <Head>
      <title>{data}</title>
    </Head>
  ) : null

export const Description = ({ data }) =>
  data ? (
    <Head>
      <meta name="description" content={data.substring(0, 200)} />
    </Head>
  ) : null

export const Canonical = ({ url }) =>
  url ? (
    <Head>
      <link rel="canonical" href={url} />
    </Head>
  ) : null

export const Twitter = ({ title, description, image }) => {
  if (!title || !description || !image) return null

  return (
    <Head>
      <meta name="twitter:card" content="summary_large_image" />
      {TWITTER_ACCOUNT && (
        <meta name="twitter:site" content={TWITTER_ACCOUNT} />
      )}
      {TWITTER_ACCOUNT && (
        <meta name="twitter:creator" content={TWITTER_ACCOUNT} />
      )}
      <meta name="twitter:title" content={title} />
      <meta
        name="twitter:description"
        content={description.substring(0, 200)}
      />
      <meta name="twitter:image" content={image} />
    </Head>
  )
}

export const OpenGraph = ({ title, url, image, description }) => {
  if (!title || !description || !image) return null

  return (
    <Head>
      <meta property="og:type" content="article" />
      <meta property="og:title" content={title} />
      <meta property="og:image" content={image} />
      <meta property="og:description" content={description.substring(0, 200)} />
      <meta property="og:site_name" content={APP_NAME} />
      {url && <meta property="og:url" content={url} />}
    </Head>
  )
}

export const Favicon = ({ render, path = '/favicon' }) => {
  if (!render) return null

  return (
    <Head>
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href={`${path}/apple-touch-icon.png`}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href={`${path}/favicon-32x32.png`}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href={`${path}/favicon-16x16.png`}
      />
      <link rel="manifest" href={`${path}/site.webmanifest`} />
      <link
        rel="mask-icon"
        href={`${path}/safari-pinned-tab.svg`}
        color="#000000"
      />
      <link rel="shortcut icon" href={`${path}/favicon.ico`} />
    </Head>
  )
}
