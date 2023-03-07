import { render } from '@testing-library/react';
import CategoryNavigate from '../../../../components/category/navigate';

const category = {
  name: null,
  ancestors: [],
  children: [],
  products: [],
  categories: [],
  attributes: [],
};

const renderView = async () => {
  render(<CategoryNavigate category={category} />);
};

test('Renders', async () => {
  renderView();
});
