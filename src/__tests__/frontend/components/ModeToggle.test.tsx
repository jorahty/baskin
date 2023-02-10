import { CssVarsProvider } from '@mui/joy';
import { fireEvent, render, screen } from '@testing-library/react'
import ModeToggle from "../../../components/ModeToggle";
import '../../matchMedia';

const renderView = async () => {
  render(
    <CssVarsProvider>
      <ModeToggle />
    </CssVarsProvider>
  )
};

test('Toggle', async () => {
  renderView();
  fireEvent.click(screen.getByRole('button', { name: /mode-toggle/i }));
  fireEvent.click(screen.getByRole('button', { name: /mode-toggle/i }));
});
