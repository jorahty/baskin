import { render, screen } from '@testing-library/react'
import ProductPage from '../../../pages/product/[id]';
import { CssVarsProvider } from '@mui/joy/styles';
import '../matchMedia';

jest.mock('next/router', () => ({
  useRouter() {
    return ({
      query: { id: '123' },
    });
  },
}));

const renderView = async () => {
  render(
    <CssVarsProvider>
      <ProductPage />
    </CssVarsProvider>
  );
};

test('Renders', async () => {
  renderView();
  screen.getByText('Show detials of product with id 123');
});
