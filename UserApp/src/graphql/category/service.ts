import request, { gql } from 'graphql-request';
import { Category } from './schema';

export class CategoryService {
  public async list(slug?: string): Promise<Category[]> {
    const mutation = gql`
      query ListCategories($slug: String) {
        category(slug: $slug) {
          slug, name
        }
      }
    `;

    const data = await request(
      'http://localhost:4002/graphql',
      mutation,
      { slug: slug },
    );

    return data.category;
  }

  public async children(slug?: string): Promise<Category[]> {
    const mutation = gql`
      query CategoryChildren($slug: String) {
        categoryChildren(slug: $slug) {
          slug, name
        }
      }
    `;

    const data = await request(
      'http://localhost:4002/graphql',
      mutation,
      { slug: slug },
    );

    return data.categoryChildren;
  }

  public async ancestors(slug: string): Promise<Category[]> {
    const mutation = gql`
      query CategoryAncestors($slug: String!) {
        categoryAncestors(slug: $slug) {
          slug, name
        }
      }
    `;

    const data = await request(
      'http://localhost:4002/graphql',
      mutation,
      { slug: slug },
    );

    return data.categoryAncestors;
  }
}
