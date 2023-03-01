import { render, screen } from '@testing-library/react';
import { CssVarsProvider } from '@mui/joy/styles';
import TermsPage from '../../../pages/terms';
import '../matchMedia';

const renderView = async () => {
  render(
    <CssVarsProvider>
      <TermsPage />
    </CssVarsProvider>
  );
};

test('Renders', async () => {
  await renderView();
});