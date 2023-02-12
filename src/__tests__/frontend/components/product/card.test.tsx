import { render, screen } from '@testing-library/react'
import ProductCard from "../../../../components/product/card";

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
  render(<ProductCard product={product} />);
};

test('Renders', async () => {
  renderView();
});
