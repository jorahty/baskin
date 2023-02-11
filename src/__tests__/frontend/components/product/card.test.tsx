import { render, screen } from '@testing-library/react'
import ProductCard from "../../../../components/product/card";

const product = {
  mid: "string",
  id: "string",
  cid: "string",
  title: "string",
  price: 0,
  quantity: 90,
  description: "string",
  date: "string",
};

const renderView = async () => {
  render(<ProductCard product={product} />);
};

test('Renders', async () => {
  renderView();
});

test('Renders - Less than 10 products', async () => {
  product.quantity = 2;
  renderView();
  screen.getByText('Only 2 left!');
});
