import { render } from '@testing-library/react';
import { CssVarsProvider } from '@mui/joy/styles';
import '../matchMedia';

import Dashboard from '../../../pages/dashboard';

const renderView = async () => {
  render(
    <CssVarsProvider>
      <Dashboard />
    </CssVarsProvider>,
  );
};

test('Render page', async () => {
  await renderView();
});