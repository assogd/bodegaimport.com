export const getPageQuery = `
  {
    pages(first: 1) {
      marquee
      content {
        ... on Section {
          id
          body
          cta {
            ... on Link {
              id
              href
              value
            }
          }
        }
      }
      seo {
        description
        title
        image {
          url(
            transformation: {document: {output: {format: webp}}, image: {resize: {fit: max, width: 1200, height: 1200}}}
          )
        }
      }
    }
  }
` 