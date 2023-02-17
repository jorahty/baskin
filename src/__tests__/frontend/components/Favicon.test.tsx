import { render } from '@testing-library/react';
import Favicon from '../../../components/Favicon';
import '../matchMedia';

const renderView = async () => {
  render(<Favicon />);
};

test('Renders', async () => {
  renderView();
});
