const prismic = require("@prismicio/client");

const sm = require("./sm.json");

/** @type {import('next').NextConfig} */
const nextConfig = async () => {
  const client = prismic.createClient(sm.apiEndpoint);

  const repository = await client.getRepository();
  const locales = repository.languages.map((lang) => lang.id);

  return {
    async rewrites() {
      return [
        {
          source: "/sortiment/:region/:producer",
          destination: "/sortiment?region=:region&producer=:producer",
        },
        {
          source: "/hem",
          destination: "/",
        },
      ];
    },
    reactStrictMode: true,
    i18n: {
      defaultLocale: "sv",
    },
  };
};

module.exports = {
  async rewrites() {
    return [
      {
        source: "/sortiment/:region/:producer/:cardId",
        destination: "/sortiment",
      },
      {
        source: "/hem",
        destination: "/",
      },
    ];
  },
  i18n: {
    locales: ["sv"],
    defaultLocale: "sv",
  },
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.cdninstagram.com",
      },
      {
        protocol: "https",
        hostname: "images.prismic.io",
      },
    ],
    //deviceSizes: [640, 750, 828, 1080, 1200],
  },
};
