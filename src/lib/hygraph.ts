// src/lib/hygraph.ts
import { GraphQLClient } from 'graphql-request';

if (!process.env.NEXT_PUBLIC_HYGRAPH_API) {
  throw new Error('NEXT_PUBLIC_HYGRAPH_API is not defined');
}

export const hygraph = new GraphQLClient(process.env.NEXT_PUBLIC_HYGRAPH_API, {
  requestMiddleware: request => {
    return {
      ...request,
      cache: 'force-cache',
    };
  },
});
