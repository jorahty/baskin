import { Category, CategoryArgs } from "./schema";

import { pool } from "../db";

export class CategoryService {
  public async list({ slug }: CategoryArgs): Promise<Category[]> {
    let select = `SELECT data || jsonb_build_object('slug', slug) AS category FROM category`;
    if (slug) {
      select += ` WHERE slug = $1`;
    }
    const query = {
      text: select,
      values: slug ? [slug] : [],
    };
    const { rows } = await pool.query(query);
    console.log(rows);
    return rows.map((row) => row.category);
  }
}
