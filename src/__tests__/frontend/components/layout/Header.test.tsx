import { fireEvent, render, screen } from '@testing-library/react'
import Header from "../../../../components/layout/Header";
import { CssVarsProvider } from '@mui/joy';
import '../../matchMedia';

const renderView = async () => {
  render(
    <CssVarsProvider>
      <Header />
    </CssVarsProvider>
  );
};

test('Sign in', async () => {
  renderView();
  fireEvent.click(screen.getByText('Sign in'))
});

test('Sign up', async () => {
  renderView();
  fireEvent.click(screen.getByText('Sign up'))
});

test('Toggle Dark Mode', async () => {
  renderView();
  fireEvent.click(screen.getByRole('button', { name: /mode-toggle/i }));
  fireEvent.click(screen.getByRole('button', { name: /mode-toggle/i }));
});
