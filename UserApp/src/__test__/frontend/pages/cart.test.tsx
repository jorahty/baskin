import { render, screen } from '@testing-library/react';
import { CssVarsProvider } from '@mui/joy/styles';
import Cart, { getServerSideProps } from '../../../pages/cart';
import '../matchMedia';

jest.mock('next/router', () => ({
  useRouter() {
    return {
      query: { slug: '123' },
    };
  },
}));

const renderView = async () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { props } = await getServerSideProps({} as any) as any;
  render(
    <CssVarsProvider>
      <Cart locale={props.locale} />
    </CssVarsProvider>
  );
};

test('Renders', async () => {
  renderView();
  await screen.findByText('Your Cart');
});
