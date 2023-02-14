import ProductPage, { getServerSideProps } from "../../../pages/product/[id]";
import { render, screen } from "@testing-library/react";
import { CssVarsProvider } from "@mui/joy/styles";
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

jest.mock("next/router", () => ({
  useRouter() {
    return {
      query: { id: "123" },
    };
  },
}));

const renderView = async () => {
  const { props } = await getServerSideProps({
    req: { headers: { host: "localhost:3000" } },
    query: { id: "038b7e70-a5c0-47e6-80f3-5b1772bb4a0d" },
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
  await renderView();
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
