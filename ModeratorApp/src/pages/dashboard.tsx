import ProductList from '../components/product/list';

export interface Product{
  id: string;
  name: string;
  price: number;
}

export default function Dashoard(){

  const products = [
    { id: '1', name: 'appasjf', price: 2 },
    { id: '2', name: 'babfbas', price: 2 },
    { id: '3', name: 'cad', price: 2 },
  ];

  // call product microservice => list these product with a delete button that recalls the delete service
  return(

    <ProductList products={products}/>

  );
}