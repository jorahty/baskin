import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import 'reflect-metadata'; // must come before buildSchemaSync
import { buildSchemaSync } from 'type-graphql';
import expressPlayground from 'graphql-playground-middleware-express';

import { CategoryResolver } from './category/resolver';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const schema = buildSchemaSync({
  resolvers: [CategoryResolver],
});

app.use('/graphql', graphqlHTTP({ schema }));

app.get('/playground', expressPlayground({ endpoint: '/graphql' }));

export default app;
