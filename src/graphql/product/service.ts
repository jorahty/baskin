import { Product, ProductArgs } from "./schema";

import { pool } from "../db";

export class ProductService {
  public async list({ id, owner_username, product_category }: ProductArgs): Promise<Product[]> {
    let select = `SELECT data || jsonb_build_object('id', id, 'owner_username', owner_username, 'product_category', product_category) AS product FROM product`;
    if (id) {
      select += ` WHERE id = $1`;
    } else if (owner_username) {
      select += ` WHERE owner_username = $1`;
    } else if (product_category) {
      select += ` WHERE product_category = $1`;
    }
    const query = {
      text: select,
      values: id ? [id] : owner_username ? [owner_username] : product_category ? [product_category] : [],
    };
    const { rows } = await pool.query(query);
    return rows.map((row) => row.product);
  }
}
