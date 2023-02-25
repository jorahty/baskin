import { Resolver, Query } from 'type-graphql';

import { Category } from './schema';
import { CategoryService } from './service';

@Resolver()
export class CategoryResolver {
  @Query(() => [Category])
  async category(): Promise<Category[]> {
    return new CategoryService().list();
  }
}
