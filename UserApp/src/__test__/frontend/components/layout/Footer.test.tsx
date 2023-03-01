import { render } from '@testing-library/react';
import Footer from '../../../../components/layout/Footer';
import { CssVarsProvider } from '@mui/joy';
import '../../matchMedia';
import { AppContextProvider } from '../../../../context';

const renderView = async () => {
  render(
    <CssVarsProvider>
      <AppContextProvider>
        <Footer />
      </AppContextProvider>
    </CssVarsProvider>
  );
};

test('Renders', async () => {
  renderView();
});
