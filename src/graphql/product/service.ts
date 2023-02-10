import { Product } from "./schema";

import { pool } from "../db";

export class ProductService {
  public async list(): Promise<Product[]> {
    const select = `SELECT data || jsonb_build_object('id', id, 'mid', mid, 'cid', cid) as product
     FROM product`;
    const query = {
      text: select,
      values: [],
    };
    const { rows } = await pool.query(query);
    return rows.map((row) => row.product);
  }
}
