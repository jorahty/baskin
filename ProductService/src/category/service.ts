import { Category } from './schema';

import { pool } from '../db';

export class CategoryService {
  public async list(slug?: string): Promise<Category[]> {
    let select = `SELECT data || jsonb_build_object('slug', slug) AS category FROM category`;
    if (slug) select += ' WHERE slug = $1';
    const query = {
      text: select,
      values: slug ? [slug] : [],
    };
    const { rows } = await pool.query(query);
    return rows.map(row => row.category);
  }

  public async children(slug?: string): Promise<Category[]> {
    const select = `
      SELECT data || jsonb_build_object('slug', slug) AS category FROM category
      WHERE parent_slug ${slug ? '= $1' : 'IS NULL'}
    `;
    const query = {
      text: select,
      values: slug ? [slug] : [],
    };
    const { rows } = await pool.query(query);
    return rows.map(row => row.category);
  }
}
