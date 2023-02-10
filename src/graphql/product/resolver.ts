import { Resolver, Query } from "type-graphql";

import { Product } from "./schema";
import { ProductService } from "./service";

@Resolver()
export class ProductResolver {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Query(returns => [Product])
  async product(): Promise<Product[]> {
    return new ProductService().list();
  }
}
