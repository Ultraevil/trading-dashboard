import { Fragment } from 'react';
import type { ReactNode } from 'react';

/**
 * Placeholder for a real `@apollo/client` ApolloProvider.
 *
 * This app talks to its GraphQL endpoint through RTK Query
 * instead of Apollo Client — `services/graphql/client.ts` implements a
 * small GraphQL-over-fetch `baseQuery` that RTK Query uses for caching,
 * invalidation and request de-duping, which covers everything this test
 * project needs without pulling in a second data-fetching library.
 *
 * The file is kept here so the provider layer matches the intended
 * architecture and so swapping to real Apollo Client later is a one-file
 * change: install `@apollo/client`, construct a client, and render
 * `<ApolloClientProvider client={client}>` below instead of the fragment.
 */
export const ApolloProvider = ({ children }: { children: ReactNode }) => {
  return <Fragment>{children}</Fragment>;
};
