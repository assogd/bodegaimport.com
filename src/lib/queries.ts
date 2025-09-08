export const getPageQuery = `
  {
    pages(first: 1) {
      marquee
      content {
        ... on Section {
          id
          body
          links {
            ... on Link {
              id
              href
              value
            }
            ... on LinkGroup {
              id
              value
              links {
                id
                href
                value
              }
            }
          }
        }
        ... on Gallery {
        id
        assets {
          ... on Image {
            id
            caption
            file {
              height
              width
              url(
                transformation: {document: {output: {format: webp}}, image: {quality: {value: 80}, resize: {fit: max, height: 1200, width: 1200}}}
              )
            }
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
`;
