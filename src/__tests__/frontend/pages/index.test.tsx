import { fireEvent } from "@testing-library/react";
import Index from "../../../pages/index";
import { getServerSideProps } from "../../../pages/index";
import { render, screen } from "@testing-library/react";
import { CssVarsProvider } from "@mui/joy/styles";
import * as db from "../../graphql/db";
import "../matchMedia";
import { act } from "react-dom/test-utils";

jest.mock("next/router", () => ({
  useRouter() {
    return {
      query: { id: "123" },
    };
  },
}));

beforeAll(() => db.reset());
afterAll(() => db.shutdown());

const renderView = async () => {
  const { props } = await getServerSideProps({
    req: { headers: { host: "localhost:3000" } },
  });
  render(
    <CssVarsProvider>
      <Index products={props.products} />
    </CssVarsProvider>
  );
};

test("Renders", async () => {
  renderView();
  await screen.findByText("All Categories");
});

function setWidth(width: number) {
  global.innerWidth = width;
  act(() => {
    global.dispatchEvent(new Event("resize"));
  });
}

test("Resize Layout and Open Mobile Menu", async () => {
  renderView();
  await screen.findByLabelText(/menu-icon/i);
  setWidth(550);
  fireEvent.click(screen.getByRole("button", { name: /menu-icon/i }));
});
