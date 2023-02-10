import { render } from '@testing-library/react'
import ProductCard from "../../../../components/product/card";

const product = {
  mid: "string",
  id: "string",
  cid: "string",
  title: "string",
  price: 0,
  quantity: 1,
  description: "string",
  date: "string",
};

const renderView = async () => {
  render(<ProductCard product={product} />);
};

test('Renders', async () => {
  renderView();
});
