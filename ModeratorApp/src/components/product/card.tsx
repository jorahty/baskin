import { Product } from '../../../../ProductService/src/product/schema';

interface Props{
  product: Product;
}

export default function ProductCard({ product }: Props){
  return (
    <tr>
      <td>{product.name}</td>
      <td>{product.user}</td>
    </tr>
  );
}