import { Product } from '../../pages/dashboard';

interface Props{
  product: Product;
}

export default function ProductCard({ product }: Props){
  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.price}</p>
    </div>
  );
}