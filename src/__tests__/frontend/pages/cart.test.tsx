import {render, screen} from "@testing-library/react";
import {CssVarsProvider} from "@mui/joy/styles";
import Cart from "../../../pages/cart";
import "../matchMedia";

const renderView = async () => {
  render(
    <CssVarsProvider>
      <Cart />
    </CssVarsProvider>
  );
};

test('Renders', async () => {
  renderView();
  await screen.findByText('Your Cart');
});
