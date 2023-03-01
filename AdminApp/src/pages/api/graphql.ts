import { createYoga } from 'graphql-yoga';
import 'reflect-metadata'; // must come before buildSchema
import { buildSchemaSync } from 'type-graphql';

import { AuthResolver } from '../../graphql/auth/resolver';

const schema = buildSchemaSync({
  resolvers: [
    AuthResolver,
  ],
  validate: { forbidUnknownValues: false },
});

export default createYoga({
  schema,
  // Defined explicitly because our endpoint lives at a different path other than `/graphql`
  graphqlEndpoint: '/api/graphql',
});
