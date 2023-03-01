import { render } from '@testing-library/react';
import { CssVarsProvider } from '@mui/joy/styles';
import '../matchMedia';

import IndexPage from '../../../pages/index';
import { AppContextProvider } from '../../../context';


const renderView = async () => {
  render(
    <CssVarsProvider>
      <AppContextProvider>
        <IndexPage />
      </AppContextProvider>
    </CssVarsProvider>,
  );
};

test('Render page', async () => {
  await renderView();
});