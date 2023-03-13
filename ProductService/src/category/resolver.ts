import { Arg, Args, Resolver, Query, Mutation } from 'type-graphql';
import {
  Category,
  CategoryAncestorsArgs,
  CategoryArgs,
  CategoryAttributesArgs,
  CategoryChildrenArgs,
  CategoryStat,
  EditCategoryArgs,
  NewCategory,
  RemoveCategoryArgs,
} from './schema';
import { Attribute } from '../attribute/schema';
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

  @Query(() => [Category])
  async categoryAncestors(
    @Args() { slug }: CategoryAncestorsArgs
  ): Promise<Category[]> {
    return new CategoryService().ancestors(slug);
  }

  @Query(() => [Attribute])
  async categoryAttributes(
    @Args() { slug }: CategoryAttributesArgs
  ): Promise<Attribute[]> {
    return new CategoryService().attributes(slug);
  }

  @Mutation(() => Category)
  async addCategory(
    @Arg('input') input: NewCategory,
  ): Promise<Category> {
    return new CategoryService().add(input.slug, input.name, input.parent);
  }

  @Mutation(() => Category)
  async removeCategory(
    @Args() { slug }: RemoveCategoryArgs
  ): Promise<Category> {
    return new CategoryService().remove(slug);
  }

  @Mutation(() => Category)
  async editCategory(
    @Args() { slug, name, parent }: EditCategoryArgs
  ): Promise<Category> {
    return new CategoryService().edit(slug, name, parent);
  }

   // eslint-disable-next-line @typescript-eslint/no-unused-vars
   @Query(returns => CategoryStat)
   async categoryStat(): Promise<CategoryStat> {
    return new CategoryService().stat();
   }
}
