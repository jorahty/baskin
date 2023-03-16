import { Product } from '../../../ProductService/src/product/schema';
import ProductList from '../components/product/list';
import request, { gql } from 'graphql-request';

export interface Props {
  products: Product[];
}

export async function getServerSideProps() {
  const query = gql`
    query ListProducts($id: String, $user: String, $category: String) {
      product(id: $id, user: $user, category: $category) {
        id, user, category, name, price, discount,
        quantity, description, date, images, attributes { id, name, value, symbol }
      }
    }
  `;

  const data:{product:Product[]} = await request(
    'http://localhost:4002/graphql',
    query,
    {},
  );

  return {
    props: {
      products: data.product,
    },
  };
}

export default function Dashboard({ products }: Props){

  // call product microservice => list these product with a delete button that recalls the delete service
  return(
    <ProductList products={products}/>
  );
}
