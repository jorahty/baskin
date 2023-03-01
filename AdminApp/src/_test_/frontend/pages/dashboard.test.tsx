import { render, screen, fireEvent } from '@testing-library/react';
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

test('Clicks on sidebar', async () => {
  renderView();
  const sidebar = await screen.findByText('Categories');
  fireEvent.click(sidebar);
});


test('Close User Menu', async () => {
  // this test is kinda scuffed. I spent so long trying to make it disappear.
  // The only way I got it to close was by clicking a button on the menu.
  // Clicking away or on other elements NEVER triggered its handleClose()
  renderView();
  fireEvent.click(screen.getByText('Welcome to the dashboard'));
  const sidebar = await screen.findByText('Categories');
  fireEvent.click(sidebar);
  expect(screen.queryByText('Welcome to the dashboard')).not.toBeInTheDocument();
  fireEvent.click(screen.getByText('Welcome to the Categories'));
});