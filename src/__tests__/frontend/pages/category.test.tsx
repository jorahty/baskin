import { render, screen } from '@testing-library/react'
import CategoryPage from '../../../pages/category/[id]';
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
      <CategoryPage />
    </CssVarsProvider>
  );
};

test('Renders', async () => {
  renderView();
  screen.getByText('List by category id: 123');
});
