import { render } from '@testing-library/react';
import CategoryNavigate from '../../../../components/category/navigate';

const category = {
  children: [],
  products: [],
  categories: [],
};

const renderView = async () => {
  render(<CategoryNavigate category={category} />);
};

test('Renders', async () => {
  renderView();
});
