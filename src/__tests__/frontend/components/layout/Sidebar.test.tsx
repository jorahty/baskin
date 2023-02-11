import { fireEvent, render, screen } from '@testing-library/react'
import Sidebar from "../../../../components/layout/Sidebar";

jest.mock('next/router', () => ({
  useRouter() {
    return ({
      query: { slug: 'toys' },
    });
  },
  push: jest.fn(),
}));

const renderView = async () => {
  render(
    <Sidebar />
  )
};

test('Renders', async () => {
  renderView();
});

test('Select Catagory', async () => {
  renderView();
  fireEvent.click(screen.getByText('Clothing'));
  fireEvent.click(screen.getByText('All Categories'));
});
