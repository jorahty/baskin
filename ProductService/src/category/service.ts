import { Attribute, Category } from './schema';

import { pool } from '../db';

export class CategoryService {
  public async list(slug?: string): Promise<Category[]> {
    let select = `SELECT data || jsonb_build_object('slug', slug, 'parent', parent_slug)
      AS category FROM category`;
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
      SELECT data || jsonb_build_object('slug', slug, 'parent', parent_slug) AS category FROM category
      WHERE parent_slug ${slug ? '= $1' : 'IS NULL'}
    `;
    const query = {
      text: select,
      values: slug ? [slug] : [],
    };
    const { rows } = await pool.query(query);
    return rows.map(row => row.category);
  }

  public async ancestors(slug: string): Promise<Category[]> {
    const select = `
      WITH RECURSIVE category_ancestors AS (
        SELECT slug, parent_slug, data, 1 AS level
        FROM category
        WHERE slug = $1
        UNION ALL
        SELECT c.slug, c.parent_slug, c.data, ca.level + 1
        FROM category_ancestors ca
        JOIN category c ON c.slug = ca.parent_slug
      )
      SELECT data || jsonb_build_object('slug', slug, 'parent', parent_slug) AS category
      FROM category_ancestors
      WHERE slug != $1
      ORDER BY level DESC;
    `;
    const query = {
      text: select,
      values: [slug],
    };
    const { rows } = await pool.query(query);
    return rows.map(row => row.category);
  }

  public async attributes(slug: string): Promise<Attribute[]> {
    const select = `
      WITH RECURSIVE category_tree AS (
        SELECT slug, parent_slug, data
        FROM category
        WHERE slug = $1
        UNION ALL
        SELECT c.slug, c.parent_slug, c.data
        FROM category c
        JOIN category_tree ct ON ct.parent_slug = c.slug
      )
      SELECT a.data || jsonb_build_object(
        'id', a.id,
        'category', a.category_slug
      ) AS attribute
      FROM attribute a
      JOIN category_tree ct ON ct.slug = a.category_slug
    `;
    const query = {
      text: select,
      values: [slug],
    };
    const { rows } = await pool.query(query);
    return rows.map(row => row.attribute).reverse();
  }

  public async add(slug: string, name: string, parent?:string): Promise<Category> {
    const insert = `INSERT INTO category (slug, parent_slug, data) VALUES ($1, $2, $3)
      RETURNING data || jsonb_build_object('slug', slug, 'parent', parent_slug) AS category`;

    const query = {
      text: insert,
      values: [slug, (parent ? parent : null), { name: name }],
    };

    const { rows } = await pool.query(query);

    return rows.map(row => row.category)[0];
  }

  public async remove(slug: string): Promise<Category> {
    const insert = `DELETE FROM category WHERE slug = $1
      RETURNING data || jsonb_build_object('slug', slug, 'parent', parent_slug) AS category`;

    const query = {
      text: insert,
      values: [slug],
    };

    const { rows } = await pool.query(query);

    return rows.map(row => row.category)[0];
  }

  public async edit(slug:string, name?:string, parent?:string): Promise<Category>{
    if (!parent && !name){
      throw new Error('Error editing category, no field given');
    }

    let update = '';
    let query = { text: '', values: [''] };
    if (name){
      const newSlug = name.toLowerCase();
      update = `Update category SET slug = $1,  data = jsonb_set(data, '{name}', $2, false)
        WHERE slug = $3
        RETURNING data || jsonb_build_object('slug', slug, 'parent', parent_slug) AS category`;
      query = {
        text: update,
        values: [newSlug, `"${name}"`, slug],
      };
    }

    if (parent) {
      update = `Update category SET parent_slug = $1 WHERE slug = $2
        RETURNING data || jsonb_build_object('slug', slug, 'parent', parent_slug) AS category`;
      query = {
        text: update,
        values: [parent, slug],
      };
    }


    const { rows } = await pool.query(query);

    return rows.map(row => row.category)[0];
  }
}
