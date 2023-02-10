import { Args, Resolver, Query } from "type-graphql";

import { Product, ProductArgs } from "./schema";
import { ProductService } from "./service";

@Resolver()
export class ProductResolver {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Query((returns) => [Product])
  async product(@Args() args: ProductArgs): Promise<Product[]> {
    return new ProductService().list(args);
  }
}
