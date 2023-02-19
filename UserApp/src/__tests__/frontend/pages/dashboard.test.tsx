import { fireEvent, render, screen } from '@testing-library/react';
import { CssVarsProvider } from '@mui/joy/styles';
import Dashboard from '../../../pages/dashboard';
import '../matchMedia';

const renderView = async () => {
  render(
    <CssVarsProvider>
      <Dashboard />
    </CssVarsProvider>
  );
};

test('Renders', async () => {
  renderView();
  await screen.findByText('Dashboard');
});

test('Clicks on sidebar', async () => {
  renderView();
  const sidebar = await screen.findByText('Favorites');
  fireEvent.click(sidebar);
});