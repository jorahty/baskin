import { NewProductArgs, Product, ProductArgs } from './schema';
import { pool } from '../db';
import { Request } from 'next';
import request, { gql } from 'graphql-request';

export class ProductService {
  public async list({ id, user, category }: ProductArgs): Promise<Product[]> {
    const query = gql`
      query Product($id: String, $user: String, $category: String) {
        product(id: $id, user: $user, category: $category) {
          id, user, category, name, price, discount,
          quantity, description, date, pictures
        }
      }
    `;

    const data = await request(
      'http://localhost:3013/graphql',
      query,
      { user, id, category },
    );

    return data.product;
  }

  public async add(
    { name, category, price, quantity, description, pictures }: NewProductArgs,
    request: Request
  ): Promise<Product> {
    const insert =
      'INSERT INTO product(member_username, category_slug, data) VALUES ($1, $2, $3) RETURNING *';
    const query = {
      text: insert,
      values: [
        request.user.username,
        category,
        {
          name: name,
          quantity: quantity,
          price: price,
          discount: 0,
          description: description,
          pictures: pictures,
          date: new Date(),
        },
      ],
    };

    const { rows } = await pool.query(query);

    const product = rows[0].data;
    product['user'] = rows[0].member_username;
    product['category'] = rows[0].category_slug;
    product['id'] = rows[0].id;

    return product;
  }

  public async remove(id:string, request: Request): Promise<Product> {
    const products = await this.list({ id: id });
    if (products.length == 0) {
      throw new Error('Product does not exist');
    } else if (products[0].user != request.user.username) {
      throw new Error('Not owner of product');
    }
    const insert =
      'Delete From product WHERE id = $1 RETURNING *';
    const query = {
      text: insert,
      values: [ id ],
    };

    const { rows } = await pool.query(query);

    const product = rows[0].data;
    product['user'] = rows[0].member_username;
    product['category'] = rows[0].category_slug;
    product['id'] = rows[0].id;

    return product;
  }
}
