import { Product, ProductArgs } from "./schema";

import { pool } from "../db";

export class ProductService {
  public async list({ id, cid, mid }: ProductArgs): Promise<Product[]> {
    let select = `SELECT data || jsonb_build_object('id', id, 'mid', mid, 'cid', cid) AS product
     FROM product`;
    if (id) {
      select += ` WHERE id = $1`;
    } else if (mid) {
      select += ` WHERE mid = $1`;
    } else if (cid) {
      select += ` WHERE cid = $1`;
    }
    const query = {
      text: select,
      values: id ? [id] : cid ? [cid] : mid ? [mid] : [],
    };
    const { rows } = await pool.query(query);
    return rows.map((row) => row.product);
  }
}
