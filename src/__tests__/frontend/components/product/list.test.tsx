import { render } from '@testing-library/react'
import ProductList from "../../../../components/product/list";

const products = [{
  user: "string",
  id: "string",
  category: "string",
  name: "string",
  price: 0,
  quantity: 1,
  description: "string",
  date: "string",
}];

const renderView = async () => {
  render(<ProductList products={products}/>);
};

test('Renders', async () => {
  renderView();
});

