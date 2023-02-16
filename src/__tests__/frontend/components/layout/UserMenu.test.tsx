import { render, screen } from "@testing-library/react";
import UserMenu from "../../../../components/layout/UserMenu";
import { CssVarsProvider } from "@mui/joy";
import "../../matchMedia";
import { AppContextProvider } from "../../../../context";

const user = {
  username: 'nobby_nobody',
  name: 'Nobby Nobody',
  accessToken: 'whatever',
};

const renderView = async () => {
  localStorage.setItem('user', JSON.stringify(user));
  render(
    <CssVarsProvider>
      <AppContextProvider>
        <UserMenu />
      </AppContextProvider>
    </CssVarsProvider>
  );
};

test("Renders", async () => {
  renderView();
  await screen.findByLabelText(/user-avatar/i);
});
