import Index from '../../../pages/index';
import { render, screen } from '@testing-library/react'
import { CssVarsProvider } from '@mui/joy/styles';
import '../matchMedia';

const renderView = async () => {
  render(
    <CssVarsProvider>
      <Index />
    </CssVarsProvider>
  );
};

test('Renders', async () => {
  renderView();
  await screen.findByText('Hello World!');
});
