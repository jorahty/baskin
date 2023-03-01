import { render } from '@testing-library/react';
import CategoryNavigate from '../../../../components/category/navigate';

const renderView = async () => {
  render(<CategoryNavigate />);
};

test('Renders', async () => {
  renderView();
});
