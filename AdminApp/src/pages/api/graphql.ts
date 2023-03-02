import { createYoga } from 'graphql-yoga';
import 'reflect-metadata'; // must come before buildSchema
import { buildSchemaSync } from 'type-graphql';

import { AuthResolver } from '../../graphql/auth/resolver';
import { CategoryResolver } from '../../graphql/category/resolver';

const schema = buildSchemaSync({
  resolvers: [
    AuthResolver,
    CategoryResolver,
  ],
  validate: { forbidUnknownValues: false },
});

export default createYoga({
  schema,
  // Defined explicitly because our endpoint lives at a different path other than `/graphql`
  graphqlEndpoint: '/api/graphql',
});
