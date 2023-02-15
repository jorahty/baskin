import { CssVarsProvider } from "@mui/joy/styles";
import { render, screen, waitFor, fireEvent, findByRole } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { graphql } from "msw";
import { setupServer } from "msw/node";
import "whatwg-fetch";
import "../matchMedia";

import Create from "../../../pages/product/create"
import { getServerSideProps } from "../../../pages/product/create"



const handlers = [
  graphql.mutation('create', async (req, res, ctx) => {
    const json = await req.json()
    if (json.query.indexOf('electronics') >= 0) {
      return res(
        ctx.data({
          create: {
            "id": "11111"
          }
        }),
      )
    } else {
      return res(
        ctx.errors ([ {
          "message": "Unexpected error."
        }]),
      )
    }
  })
]

const server = setupServer(...handlers)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

jest.mock('next/router', () => ({
  useRouter() {
    return ({
      query: { slug: 'toys' },
    });
  },
  push: jest.fn(),
}));

const renderView = async () => {
  const { props } = await getServerSideProps({
    req: { headers: { host: 'localhost:3000' } }
  });
  render(
    <CssVarsProvider>
      <Create categories={props.categories} />
    </CssVarsProvider>
  );
};

test('Renders', async () => {
  renderView();
  await screen.findByText('Create New Product');
});

test('Click Cancel', async () => {
  renderView();
  await screen.findByText('Create New Product');
  fireEvent.click(screen.getByLabelText('cancel'));
});

test('Click create', async () => {
  localStorage.setItem('user', `{"username":"molly_member","accessToken":"whatever"}`)

  renderView();
  let alerted = false
  window.alert = () => {
    alerted = true
  }
  await screen.findByText('Create New Product');
  await userEvent.click(await findByRole((await screen.findByTestId("category")), "combobox"));
  // fireEvent.mouseDown(screen.getByLabelText('slug'));
  userEvent.click(await screen.getByLabelText('Electronics'))
  const name = screen.getByPlaceholderText('Enter name');
  await userEvent.type(name, 'new')
  const price = screen.getByPlaceholderText('Enter price');
  await userEvent.type(price, '1.50')
  const quantity = screen.getByPlaceholderText('Enter quantity');
  await userEvent.type(quantity, '1')
  const description = screen.getByPlaceholderText('Enter description');
  await userEvent.type(description, 'great product')
  await fireEvent.click(screen.getByLabelText('create'));
  await waitFor(() => {
    expect(alerted).toBe(false)
  })
});

test('Click create invalid', async () => {
  localStorage.setItem('user', `{"username":"molly_member","accessToken":"whatever"}`)
  
  renderView();
  let alerted = false
  window.alert = () => {
    alerted = true
  }
  await screen.findByText('Create New Product');
  const name = screen.getByPlaceholderText('Enter name');
  await userEvent.type(name, 'new')
  const price = screen.getByPlaceholderText('Enter price');
  await userEvent.type(price, '1.50')
  const quantity = screen.getByPlaceholderText('Enter quantity');
  await userEvent.type(quantity, '1')
  const description = screen.getByPlaceholderText('Enter description');
  await userEvent.type(description, 'great product')
  await userEvent.click(screen.getByLabelText('category'));
  fireEvent.click(screen.getByLabelText('create'));
  await waitFor(() => {
    expect(alerted).toBe(true)
  })
});