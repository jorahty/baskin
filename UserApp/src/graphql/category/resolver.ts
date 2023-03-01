import { Resolver, Query, Args } from 'type-graphql';

import { Category, CategoryArgs, CategoryChildrenArgs } from './schema';
import { CategoryService } from './service';

@Resolver()
export class CategoryResolver {
  @Query(() => [Category])
  async category(
    @Args() { slug }: CategoryArgs
  ): Promise<Category[]> {
    return new CategoryService().list(slug);
  }

  @Query(() => [Category])
  async categoryChildren(
    @Args() { slug }: CategoryChildrenArgs
  ): Promise<Category[]> {
    return new CategoryService().children(slug);
  }
}
