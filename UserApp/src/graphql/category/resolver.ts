import { Resolver, Query, Args } from 'type-graphql';
import { CategoryService } from './service';
import {
  Category,
  CategoryAncestorsArgs,
  CategoryArgs,
  CategoryChildrenArgs,
} from './schema';

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

  @Query(() => [Category])
  async categoryAncestors(
    @Args() { slug }: CategoryAncestorsArgs
  ): Promise<Category[]> {
    return new CategoryService().ancestors(slug);
  }
}
