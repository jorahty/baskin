import { Product, ProductArgs } from "./schema";
import { pool } from "../db";

export class ProductService {
  public async list({ id, user, category }: ProductArgs): Promise<Product[]> {
    let select = `
      SELECT data || jsonb_build_object(
        'id', id,
        'user', member_username,
        'category', category_slug
      ) AS product FROM product
    `;
    let values: string[] = [];
    if (id) {
      select += ` WHERE id = $1`;
      values = [id];
    } else if (user) {
      select += ` WHERE member_username = $1`;
      values = [user];
    } else if (category) {
      select += ` WHERE category_slug = $1`;
      values = [category];
    }
    const query = {
      text: select,
      values: values,
    };
    const { rows } = await pool.query(query);
    return rows.map(row => row.product);
  }
}
