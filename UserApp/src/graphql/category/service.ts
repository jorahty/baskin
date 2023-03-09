import request, { gql } from 'graphql-request';
import { Attribute, Category } from './schema';

export class CategoryService {
  public async list(slug?: string): Promise<Category[]> {
    const query = gql`
      query ListCategories($slug: String) {
        category(slug: $slug) {
          slug, name
        }
      }
    `;

    const data:{category: Category[]} = await request(
      'http://localhost:4002/graphql',
      query,
      { slug: slug },
    );

    return data.category;
  }

  public async children(slug?: string): Promise<Category[]> {
    const query = gql`
      query CategoryChildren($slug: String) {
        categoryChildren(slug: $slug) {
          slug, name
        }
      }
    `;

    const data:{categoryChildren: Category[]} = await request(
      'http://localhost:4002/graphql',
      query,
      { slug: slug },
    );

    return data.categoryChildren;
  }

  public async ancestors(slug: string): Promise<Category[]> {
    const query = gql`
      query CategoryAncestors($slug: String!) {
        categoryAncestors(slug: $slug) {
          slug, name
        }
      }
    `;

    const data:{categoryAncestors: Category[]} = await request(
      'http://localhost:4002/graphql',
      query,
      { slug: slug },
    );

    return data.categoryAncestors;
  }

  public async attributes(slug: string): Promise<Attribute[]> {
    const query = gql`
      query CategoryAttributes($slug: String!) {
        categoryAttributes(slug: $slug) {
          id, category, name, type, min, max, step, symbol, values
        }
      }
    `;

    const data:{categoryAttributes: Attribute[]} = await request(
      'http://localhost:4002/graphql',
      query,
      { slug: slug },
    );

    return data.categoryAttributes;
  }
}
