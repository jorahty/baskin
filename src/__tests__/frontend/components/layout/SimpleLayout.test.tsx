import { render } from '@testing-library/react'
import SimpleLayout from "../../../../components/layout/SimpleLayout";
import { CssVarsProvider } from '@mui/joy';
import '../../matchMedia';

const renderView = async () => {
  render(
    <CssVarsProvider>
      <SimpleLayout>
        <p>Children components go here.</p>
      </SimpleLayout>
    </CssVarsProvider>
  )
};

test('Renders', async () => {
  renderView();
});
