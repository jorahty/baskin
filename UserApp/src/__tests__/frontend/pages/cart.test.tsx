import { render, screen } from '@testing-library/react';
import { CssVarsProvider } from '@mui/joy/styles';
import Cart from '../../../pages/cart';
import '../matchMedia';

jest.mock('next/router', () => ({
  useRouter() {
    return {
      query: { slug: '123' },
    };
  },
}));

const renderView = async () => {
  render(
    <CssVarsProvider>
      <Cart />
    </CssVarsProvider>
  );
};

test('Renders', async () => {
  renderView();
  await screen.findByText('Your Cart');
});
