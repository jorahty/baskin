import { gql, GraphQLClient } from 'graphql-request';

export default async function queryGQL(url: string, query: string, bearerToken?: string) {
  const graphQLClient = new GraphQLClient(url, {
    headers: {
      Authorization: `Bearer ${bearerToken}`,
    },
  });
  const data = await graphQLClient.request(gql`${query}`);
  return data;
}
