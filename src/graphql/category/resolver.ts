import { Args, Resolver, Query } from "type-graphql";

import { Category, CategoryArgs } from "./schema";
import { CategoryService } from "./service";

@Resolver()
export class CategoryResolver {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Query((returns) => [Category])
  async category(@Args() args: CategoryArgs): Promise<Category[]> {
    return new CategoryService().list(args);
  }
}