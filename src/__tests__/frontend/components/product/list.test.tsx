import { findByRole, fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProductList from "../../../../components/product/list";

const products = [
  {
    user: "string",
    id: "string",
    category: "string",
    name: "string",
    price: 0,
    quantity: 1,
    description: "string",
    date: new Date().toISOString(),
    pictures: ["string"],
    discount: 0
  },
  {
    user: "string",
    id: "string",
    category: "string",
    name: "string",
    price: 1,
    quantity: 1,
    description: "string",
    date: new Date().toISOString(),
    pictures: ["string"],
    discount: 0
  }];

const renderView = async () => {
  render(<ProductList products={products} showSearch={true} showSorter={true}/>);
};

test('Renders', async () => {
  renderView();
});

test('Searching', async () => {
  renderView();
  const search = screen.getByPlaceholderText("Search Products");
  fireEvent.change(search, { target: { value: "Air" } });
});

test('Sorting', async () => {
  renderView();
  await userEvent.click(await findByRole((await screen.findByTestId("sort")), "combobox"));
  fireEvent.click(screen.getByLabelText("newest"));
  await userEvent.click(await findByRole((await screen.findByTestId("sort")), "combobox"));
  fireEvent.click(screen.getByLabelText("oldest"));
  await userEvent.click(await findByRole((await screen.findByTestId("sort")), "combobox"));
  fireEvent.click(screen.getByLabelText("price-high"));
  await userEvent.click(await findByRole((await screen.findByTestId("sort")), "combobox"));
  fireEvent.click(screen.getByLabelText("price-low"));
});


