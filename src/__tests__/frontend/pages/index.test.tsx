import Index from '../../../pages/index';
import { render } from '@testing-library/react'
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
      <Index />
    </CssVarsProvider>
  );
};

test('Renders', async () => {
  renderView();
});
