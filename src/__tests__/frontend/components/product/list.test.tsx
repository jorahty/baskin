import { render } from '@testing-library/react'
import ProductList from "../../../../components/product/list";

const renderView = async () => {
  render(<ProductList />);
};

test('Renders', async () => {
  renderView();
});
