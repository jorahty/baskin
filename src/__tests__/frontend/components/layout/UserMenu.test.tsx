import { render, screen } from "@testing-library/react";
import UserMenu from "../../../../components/layout/UserMenu";
import { CssVarsProvider } from "@mui/joy";
import "../../matchMedia";

const user = {
  username: "nobby_nobody",
  accessToken: "blergh",
};

let handleSignOut: () => void;

const renderView = async () => {
  render(
    <CssVarsProvider>
      <UserMenu user={user} handleSignOut={handleSignOut} />
    </CssVarsProvider>
  );
};

test("Renders", async () => {
  renderView();
  await screen.findByLabelText(/user-avatar/i);
});
