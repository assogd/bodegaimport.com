export default function Favicon({ render, path = '/favicon' }) {
  if (!render) return null

  return (
    <>
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
      <link
        rel="mask-icon"
        href={`${path}/safari-pinned-tab.svg`}
        color="#000000"
      />
      <link rel="shortcut icon" href={`${path}/favicon.ico`} />
      <link rel="manifest" href={`${path}/site.webmanifest`} />
    </>
  )
}
