import { Product, ProductArgs } from './schema';
import { Request } from 'next';
import request, { gql } from 'graphql-request';

interface NewProduct {
  user: string;
  category: string;
  name: string;
  price: number;
  discount: number;
  quantity: number;
  description: string;
  pictures: string[];
}

export class ProductService {
  public async list({ id, user, category }: ProductArgs): Promise<Product[]> {
    const query = gql`
      query ListProducts($id: String, $user: String, $category: String) {
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

  public async add(newProduct: NewProduct): Promise<Product> {
    const mutation = gql`
      mutation AddProduct($input: ProductInput!) {
        addProduct(input: $input) {
          id, user, category, name, price, discount,
          quantity, description, date, pictures
        }
      }
    `;

    const data = await request(
      'http://localhost:3013/graphql',
      mutation,
      { input: newProduct },
    );

    return data.addProduct;
  }

  public async remove(id: string, { user }: Request): Promise<Product> {
    const products = await this.list({ id: id });
    if (products.length == 0) {
      throw new Error('Product does not exist');
    } else if (products[0].user != user.username) {
      throw new Error('Not owner of product');
    }

    const mutation = gql`
      mutation RemoveProduct($id: String!) {
        removeProduct(id: $id) {
          id, user, category, name, price, discount,
          quantity, description, date, pictures
        }
      }
    `;

    const data = await request(
      'http://localhost:3013/graphql',
      mutation,
      { id: id },
    );

    return data.removeProduct;
  }
}
