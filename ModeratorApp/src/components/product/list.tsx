import { Product } from '../../pages/dashboard';
import ProductCard from './card';


interface Props{
  products: Product[];
}

export default function ProductList({ products } : Props){
  return (
    <div>
      {products.map(product => (
        <ProductCard product={product} key={product.id}/>
      ))}
    </div>
  );
}
