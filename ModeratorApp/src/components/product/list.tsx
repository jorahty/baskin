import { Table } from '@mui/joy';
import { Product } from '../../../../ProductService/src/product/schema';
import ProductCard from './card';


interface Props {
  products: Product[];
}

export default function ProductList({ products } : Props){
  return (
    <Table>
      <thead>
        <tr>
          <th>Title</th>
          <th>User</th>
          <th/>
        </tr>
      </thead>
      <tbody>
        {products.map(product => (
          <ProductCard product={product} key={product.id}/>
        ))}
      </tbody>
    </Table>
  );
}
