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
      ];
    },
    reactStrictMode: true,
    i18n: {
      // These are all the locales you want to support in
      // your application
      locales,
      // This is the default locale you want to be used when visiting
      // a non-locale prefixed path e.g. `/hello`
      defaultLocale: locales[0],
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
    ];
  },
  i18n: {
    locales: ["en-us"],
    defaultLocale: "en-us",
  },
  reactStrictMode: true,
};
