import { gql, GraphQLClient } from 'graphql-request';

// Provides a concise way to query GraphQL.
// Used by react components that query UserApp's API,
// and by the UserApp's API that queries micro services
export default async function queryGQL(url: string, query: string, bearerToken?: string) {
  const graphQLClient = new GraphQLClient(url, {
    headers: {
      Authorization: `Bearer ${bearerToken}`,
    },
  });
  const data = await graphQLClient.request(gql`${query}`);
  return data as any; // eslint-disable-line @typescript-eslint/no-explicit-any
}
