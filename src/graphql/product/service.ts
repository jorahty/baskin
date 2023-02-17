import { NewProductArgs, Product, ProductArgs, FavoriteProduct } from "./schema";
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

  public async create({name, category, price, quantity, description, pictures}:NewProductArgs, request: Request): Promise<Product> {
    const insert = 'INSERT INTO product(member_username, category_slug, data) VALUES ($1, $2, $3) RETURNING *';
    const query = {
      text: insert,
      values: [request.user.username, category,{"name": name, "quantity": quantity, "price": price, "discount": 0, "description": description, "pictures": pictures, "date": (new Date())}]
    }

    const { rows } = await pool.query(query);

    const product = rows[0].data;
    product['user'] = rows[0].member_username;
    product['category'] = rows[0].category_slug;
    product['id'] = rows[0].id;

    return product;
  }

  public async get(product:string, request: Request): Promise<FavoriteProduct[]> {
    const insert = 'SELECT * FROM favorite WHERE member_username = $1 AND product_id = $2';
    const query = {
      text: insert,
      values: [request.user.username, product]
    }

    const { rows } = await pool.query(query);

    return rows.map(row => {return {"user": row.member_username, "product": row.product_id}});
  }

  public async favorite(product:string, request: Request): Promise<FavoriteProduct> {
    const insert = 'INSERT INTO favorite(member_username, product_id) VALUES ($1, $2) RETURNING *';
    const query = {
      text: insert,
      values: [request.user.username, product]
    }

    const { rows } = await pool.query(query);

    const favorite = {user: rows[0].member_username, product: rows[0].product_id,};

    return favorite;
  }

  public async unfavorite(product:string, request: Request): Promise<FavoriteProduct> {
    const insert = 'Delete From favorite Where member_username = $1 And product_id = $2 Returning *';
    const query = {
      text: insert,
      values: [request.user.username, product]
    }

    const { rows } = await pool.query(query);

    const favorite = {user: rows[0].member_username, product: rows[0].product_id,};

    return favorite;
  }
}
