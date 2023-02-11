import ProductPage from '../../../pages/product/[id]';
import { getServerSideProps } from '../../../pages/product/[id]';
import { render, screen } from '@testing-library/react'
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
  const { props } = await getServerSideProps({
    req: { headers: { host: 'localhost:3000' } },
    query: { id: '038b7e70-a5c0-47e6-80f3-5b1772bb4a0d' },
  });
  render(
    <CssVarsProvider>
      <ProductPage product={props.product}/>
    </CssVarsProvider>
  );
};

test('Renders', async () => {
  renderView();
  await screen.findByText('Product details');
});
