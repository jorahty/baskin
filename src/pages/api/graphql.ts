import { createYoga } from "graphql-yoga";
import "reflect-metadata"; // must come before buildSchema
import { buildSchemaSync } from "type-graphql";

import { AuthResolver } from "../../graphql/auth/resolver";
import { ProductResolver } from "../../graphql/listing/resolver";

const schema = buildSchemaSync({
  resolvers: [AuthResolver, ProductResolver],
  validate: true,
  // authChecker: nextAuthChecker,
});

export default createYoga({
  schema,
  // Needed to be defined explicitly because our endpoint lives at a different path other than `/graphql`
  graphqlEndpoint: "/api/graphql",
});
