import { fireEvent, render, screen } from "@testing-library/react";
import Header from "../../../../components/layout/Header";
import { CssVarsProvider } from "@mui/joy";
import "../../matchMedia";

const renderView = async () => {
  render(
    <CssVarsProvider>
      <Header />
    </CssVarsProvider>
  );
};

test("Sign in", async () => {
  renderView();
  fireEvent.click(screen.getByText("Sign in"));
});

test("Sign up", async () => {
  renderView();
  fireEvent.click(screen.getByText("Sign up"));
});

test("Toggle Dark Mode", async () => {
  renderView();
  fireEvent.click(screen.getByRole("button", { name: /mode-toggle/i }));
  fireEvent.click(screen.getByRole("button", { name: /mode-toggle/i }));
});

test("User Menu", async () => {
  localStorage.setItem(
    "user",
    `{"username": "nobby_nobody", "accessToken": "blergh"}`
  );
  renderView();
  fireEvent.click(screen.getByLabelText(/user-avatar/i));
});

test("Close User Menu", async () => {
  // this test is kinda scuffed. I spent so long trying to make it disappear.
  // The only way I got it to close was by clicking a button on the menu.
  // Clicking away or on other elements NEVER triggered its handleClose()
  renderView();
  fireEvent.click(screen.getByLabelText(/user-avatar/i));
  fireEvent.click(screen.getByText("Profile"));
  expect(screen.queryByText("Profile")).not.toBeInTheDocument();
});

test("Log Out in User Menu", async () => {
  renderView();
  fireEvent.click(screen.getByLabelText(/user-avatar/i));
  await screen.findByText("Sign out");
  fireEvent.click(screen.getByText("Sign out"));
});
