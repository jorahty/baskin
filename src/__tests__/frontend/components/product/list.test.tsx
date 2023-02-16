import { fireEvent, render, screen } from "@testing-library/react";
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
  render(<ProductList products={products}/>);
};

test('Renders', async () => {
  renderView();
});

test('Sorting', async () => {
  renderView();
  fireEvent.click(screen.getByText("sort products"));
  fireEvent.click(screen.getByText("Newest"));
  fireEvent.click(screen.getByText("sort products"));
  fireEvent.click(screen.getByText("Oldest"));
  fireEvent.click(screen.getByText("sort products"));
  fireEvent.click(screen.getByText("Price High"));
  fireEvent.click(screen.getByText("sort products"));
  fireEvent.click(screen.getByText("Price Low"));
});


