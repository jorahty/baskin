import { createYoga } from 'graphql-yoga';
import 'reflect-metadata'; // must come before buildSchema
import { buildSchemaSync } from 'type-graphql';

import { AuthResolver } from '../../graphql/auth/resolver';
import { nextAuthChecker } from '../../graphql/auth/checker';
import { CategoryResolver } from '../../graphql/category/resolver';
import { AttributeResolver } from '../../graphql/attribute/resolver';
import { UserResolver } from '../../graphql/user/resolver';

const schema = buildSchemaSync({
  resolvers: [
    AuthResolver,
    CategoryResolver,
    AttributeResolver,
    UserResolver,
  ],
  validate: { forbidUnknownValues: false },
  authChecker: nextAuthChecker,
});

export default createYoga({
  schema,
  // Defined explicitly because our endpoint lives at a different path other than `/graphql`
  graphqlEndpoint: '/api/graphql',
});
