import { Category } from './schema';

import queryGQL from '../../queryQGL';

export class CategoryService {
  public async list(): Promise<Category[]> {
    const data = await queryGQL(
      'http://localhost:3013/graphql',
      'query ListCategories { category { slug, name } }',
    );
    return data.category;
  }
}
