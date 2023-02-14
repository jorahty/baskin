import ProductPage, { getServerSideProps } from "../../../pages/product/[id]";
import {act, render, screen, cleanup} from "@testing-library/react";
import { CssVarsProvider } from "@mui/joy/styles";
import * as db from '../../graphql/db';
import "../matchMedia";

const product = {
  name: "Air Jordan 11",
  date: "2023-02-09T06:43:08.000Z",
  id: "038b7e70-a5c0-47e6-80f3-5b1772bb4a0d",
  price: 250,
  discount: 0,
  category: "clothing",
  user: "molly_member",
  quantity: 1,
  description: "Never worn",
};

const discountProduct = {
  name: "Baseballs",
  date: "2022-01-21T15:43:08.000Z",
  id: "2759559e-84f2-4c41-9512-932589163f4f",
  price: 2,
  discount: 0.2,
  category: "toys",
  user: "molly_member",
  quantity: 40,
  description: "something not too long",
};

// https://stackoverflow.com/questions/32911630/how-do-i-deal-with-localstorage-in-jest-tests
// const localStorageMock = (() => {
//   let store = {};
//   return {
//     getItem: function(key: string) {
//       return store[key] || null;
//     },
//     setItem: function(key: string, value: any) {
//       store[key] = value.toString();
//     },
//     clear: function() {
//       store = {};
//     },
//   };
// })();
//
// Object.defineProperty(window, "localStorage", {
//   value: localStorageMock,
// });

jest.mock("next/router", () => ({
  useRouter() {
    return {
      query: { id: "123" },
    };
  },
}));

beforeAll(() => db.reset());
beforeEach(() => {
  // Removes render
  cleanup();
  // Removes localStorage
  localStorage.clear();
})
afterAll(() => db.shutdown());

const renderView = async (id: string) => {
  const { props } = await getServerSideProps({
    req: { headers: { host: "localhost:3000" } },
    query: { id },
  });

  render(
    <CssVarsProvider>
      <ProductPage product={props.product} />
    </CssVarsProvider>
  );
};

const renderDiscountView = async () => {
  const { props } = await getServerSideProps({
    req: { headers: { host: "localhost:3000" } },
    query: { id: "2759559e-84f2-4c41-9512-932589163f4f" },
  });

  render(
    <CssVarsProvider>
      <ProductPage product={props.product} />
    </CssVarsProvider>
  );
};

test("Renders", async () => {
  await renderView("038b7e70-a5c0-47e6-80f3-5b1772bb4a0d");
  await screen.findByText(product.name);
  await screen.findByText("$" + product.price.toFixed(2));
  await screen.findByText(product.category);
  await screen.findByText(`${product.user}`);
});

test("Renders (Discount Item)", async () => {
  const price =
    discountProduct.price - discountProduct.discount * discountProduct.price;
  await renderDiscountView();
  await screen.findByText(discountProduct.name);
  await screen.findByText("$" + price.toFixed(2));
  await screen.findByText(discountProduct.category);
  await screen.findByText(`${discountProduct.user}`);
});

test("Added to Cart - In LocalStorage", async () => {
  await renderView("038b7e70-a5c0-47e6-80f3-5b1772bb4a0d");
  const addToCartButton = await screen.findByText('Add to Cart');

  await act(async () => {
    await addToCartButton.click();
  });

  expect(localStorage.getItem('cart'))
    .toBe('[{"id":"038b7e70-a5c0-47e6-80f3-5b1772bb4a0d","quantity":1}]');
});

test("Added to Cart - In LocalStorage - Two Products", async () => {
  await renderView("2759559e-84f2-4c41-9512-932589163f4f");
  let addToCartButton = await screen.findByText('Add to Cart');

  await act(async () => {
    await addToCartButton.click();
  });

  expect(localStorage.getItem('cart'))
    .toBe('[{"id":"2759559e-84f2-4c41-9512-932589163f4f","quantity":1}]');

  // Removes render
  cleanup();

  await renderView("038b7e70-a5c0-47e6-80f3-5b1772bb4a0d");
  addToCartButton = await screen.findByText('Add to Cart');

  await act(async () => {
    await addToCartButton.click();
  });

  expect(localStorage.getItem('cart'))
    .toBe('[{"id":"2759559e-84f2-4c41-9512-932589163f4f","quantity":1},{"id":"038b7e70-a5c0-47e6-80f3-5b1772bb4a0d","quantity":1}]');
});
