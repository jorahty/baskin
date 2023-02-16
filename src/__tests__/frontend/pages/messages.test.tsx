import MessagesPage, { /* getServerSideProps */ } from "../../../pages/messages";
import { render } from "@testing-library/react";
import { CssVarsProvider } from "@mui/joy/styles";
import * as db from '../../graphql/db';
import "../matchMedia";

beforeAll(() => db.reset());
afterAll(() => db.shutdown());

const renderView = async () => {
  // const { props } = await getServerSideProps({
  //   req: { headers: { host: "localhost:3000" } },
  // });
  render(
    <CssVarsProvider>
      <MessagesPage />
    </CssVarsProvider>
  );
};

test("Renders", async () => {
  await renderView();
});
