import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProductCard from "../../../../components/product/card";
import { AppContextProvider } from "../../../../context";
import { graphql } from "msw";
import { setupServer } from "msw/node";
import "whatwg-fetch";
import "../../matchMedia";

const handlers = [
  graphql.query('getFavorites', async (req, res, ctx) => {
    return res(
      ctx.data({
        getFavorites: [{
          "product": "11111"
        }]
      }),
    ) 
  }),
  graphql.mutation('favorite', async (req, res, ctx) => {
    return res(
      ctx.data({
        favorite: [{
          "product": "11111"
        }]
      }),
    ) 
  }),
  graphql.mutation('unfavorite', async (req, res, ctx) => {
    return res(
      ctx.data({
        unfavorite: [{
          "product": "11111"
        }]
      }),
    ) 
  })
]

const server = setupServer(...handlers)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

const product = {
  user: "string",
  id: "string",
  category: "string",
  name: "string",
  price: 0,
  quantity: 90,
  description: "string",
  date: "string",
  pictures: ["string"],
  discount: 0,
};

const renderView = async () => {
  render(
    <AppContextProvider>
      <ProductCard product={product} />
    </AppContextProvider>
  );
};

test("Renders", async () => {
  renderView();
});

test("Renders favotrite", async () => {
  localStorage.setItem(
    "user",
    `{"username": "nobby_nobody", "accessToken": "blergh"}`
  );
  renderView();
  await screen.findByLabelText('favorite')
  await screen.findByLabelText('favorited')
  fireEvent.click(await screen.getByLabelText('favorite'))
  await screen.getByLabelText('notfavorited')
  fireEvent.click(await screen.getByLabelText('favorite'))
  await screen.getByLabelText('favorited')
});

