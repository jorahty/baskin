import { render } from '@testing-library/react'
import DashboardLayout from "../../../../components/layout/DashboardLayout";
import { CssVarsProvider } from '@mui/joy';
import '../../matchMedia';

const renderView = async () => {
  render(
    <CssVarsProvider>
      <DashboardLayout>
        <p>Children components go here.</p>
      </DashboardLayout>
    </CssVarsProvider>
  )
};

test('Renders', async () => {
  renderView();
});
