import { render } from '@testing-library/react';
import BackDrop from '../../../../components/layout/BackDrop';
import { CssVarsProvider } from '@mui/joy';
import '../../matchMedia';

let handleSidebarOpen: () => void;

const renderView = async () => {
  render(
    <CssVarsProvider>
      <BackDrop handleClick={handleSidebarOpen} />
    </CssVarsProvider>
  );
};

test('Renders', async () => {
  renderView();
});
