import { render } from '@testing-library/react'
import ProductDetails from "../../../../components/product/details";

const product = {
  user: "string",
  id: "string",
  category: "string",
  name: "string",
  price: 0,
  quantity: 90,
  description: "string",
  date: "string",
};

const renderView = async () => {
  render(<ProductDetails product={product} />);
};

test('Renders', async () => {
  renderView();
});
