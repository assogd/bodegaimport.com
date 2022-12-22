import Head from "next/head";
import {
  Title,
  Canonical,
  Description,
  Twitter,
  Favicon,
  OpenGraph,
} from "./render";

import {
  APP_URL,
  APP_NAME,
  FALLBACK_OG_IMAGE,
  FALLBACK_DESCRIPTION,
} from "../../lib/const";

export default function Meta({
  title,
  description,
  image,
  slug,
  favicon = false,
  twitter,
  og,
  noindex,
}) {
  return (
    <>
      {noindex && <NoIndex />}
      <Title data={title ?? APP_NAME} />
      <Description data={description ?? FALLBACK_DESCRIPTION} />
      <Canonical url={slug ? APP_URL + slug : APP_URL} />
      <Twitter
        description={
          twitter?.primary.description ?? description ?? FALLBACK_DESCRIPTION
        }
        image={twitter?.primary.image.url ?? FALLBACK_OG_IMAGE}
        title={twitter?.primary.title ?? title ?? APP_NAME}
      />
      <OpenGraph
        description={
          og?.primary.description ?? description ?? FALLBACK_DESCRIPTION
        }
        image={og?.primary.image.url ?? FALLBACK_OG_IMAGE}
        title={og?.primary.title ?? title ?? APP_NAME}
        url={slug ? APP_URL + slug : APP_URL}
      />
      <Favicon render={false} />
    </>
  );
}

const NoIndex = () => (
  <Head>
    <meta name="robots" content="noindex" />
  </Head>
);
