import { fireEvent, render, screen } from '@testing-library/react';
import Sidebar from '../../../../components/layout/Sidebar';

jest.mock('next/router', () => ({
  useRouter() {
    return {
      query: { slug: 'toys' },
    };
  },
  push: jest.fn(),
}));

const categories = [
  { name: 'Electronics', slug: 'electronics' },
  { name: 'Clothing', slug: 'clothing' },
  { name: 'Sports Equipment', slug: 'sports-equipment' },
  { name: 'Toys', slug: 'toys' },
  { name: 'Furniture', slug: 'furniture' },
  { name: 'Instruments', slug: 'instruments' },
];

const renderView = async () => {
  render(<Sidebar categories={categories} />);
};

test('Renders', async () => {
  renderView();
});

test('Select Catagory', async () => {
  renderView();
  fireEvent.click(screen.getByText('Clothing'));
  fireEvent.click(screen.getByLabelText('All Categories'));
});
