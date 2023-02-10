import { render } from '@testing-library/react'
import ProductCard from "../../../../components/product/card";

const renderView = async () => {
  render(<ProductCard />);
};

test('Renders', async () => {
  renderView();
});
