import CategoryPage from '../../../pages/category/[slug]';
import { getServerSideProps } from '../../../pages/category/[slug]';
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
    query: { slug: 'clothing' },
  });
  render(
    <CssVarsProvider>
      <CategoryPage products={props.products}/>
    </CssVarsProvider>
  );
};

test('Renders', async () => {
  renderView();
  await screen.findByText('All Categories');
});
