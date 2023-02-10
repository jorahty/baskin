import { render } from '@testing-library/react'
import DashboardLayout from "../../../../components/layout/DashboardLayout";
import { CssVarsProvider } from '@mui/joy';
import '../../matchMedia';

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
      <DashboardLayout>
        <p>Children components go here.</p>
      </DashboardLayout>
    </CssVarsProvider>
  )
};

test('Renders', async () => {
  renderView();
});
