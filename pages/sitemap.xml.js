import { SliceZone } from "@prismicio/react";
import * as prismicH from "@prismicio/helpers";
import { createClient } from "../prismicio";
import { APP_URL } from "../lib/const";

function generateSiteMap(pages, producers, articles) {
  console.log([...pages, ...producers, ...articles]);
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <url>
       <loc>${`${APP_URL}`}</loc>
     </url>
     ${[...pages, ...producers, ...articles]
       .filter((f) => f.uid !== "hem")
       .map((page) => {
         return `
  <url>
      <loc>${`${APP_URL}${page.url}`}</loc>
      <lastmod>${page.last_publication_date}</lastmod>
  </url>
`;
       })
       .join("")}
   </urlset>
 `;
}

const Sitemap = ({ page }) => {};

export default Sitemap;

export async function getServerSideProps({ previewData, res }) {
  const client = createClient({ previewData });
  const pages = await client.getAllByType("page");
  const producers = await client.getAllByType("producer");
  const articles = await client.getAllByType("article");

  const sitemap = generateSiteMap(pages, producers, articles);

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}
