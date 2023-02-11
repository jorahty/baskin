import { render } from '@testing-library/react'
import CategoryPage from '../../../pages/category/[slug]';
import { CssVarsProvider } from '@mui/joy/styles';
import '../matchMedia';

jest.mock('next/router', () => ({
  useRouter() {
    return ({
      query: { slug: 'clothing' },
    });
  },
}));

const renderView = async () => {
  render(
    <CssVarsProvider>
      <CategoryPage />
    </CssVarsProvider>
  );
};

test('Renders', async () => {
  renderView();
});
