import { NewProductArgs, Product, ProductArgs } from "./schema";
import { pool } from "../db";
import { Request } from "next"


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

  public async create({name, category, price, quantity, description}:NewProductArgs, request: Request): Promise<Product> {
    const insert = 'INSERT INTO product(member_username, category_slug, data) VALUES ($1, $2, $3) RETURNING *';
    const query = {
      text: insert,
      values: [request.user.username, category,{"name": name, "quantity": quantity, "price": price, "discount": 0, "description": description, "date": (new Date())}]
    }

    const { rows } = await pool.query(query);

    const product = rows[0].data;
    product['user'] = rows[0].member_username;
    product['category'] = rows[0].category_slug;
    product['id'] = rows[0].id;

    return product;
  }
}
