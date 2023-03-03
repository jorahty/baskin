import { AppContextProvider } from '../../../../context';
import { findByRole, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProductList from '../../../../components/product/list';

const products = [
  {
    user: 'string',
    id: 'string',
    category: 'string',
    name: 'string',
    price: 0,
    quantity: 1,
    description: 'string',
    date: new Date().toISOString(),
    pictures: [
      'https://images.pexels.com/photos' +
      '/930398/pexels-photo-930398.jpeg?auto=compress&cs=tinysrgb&w=1600',
    ],
    discount: 0,
  },
  {
    user: 'string',
    id: 'string',
    category: 'string',
    name: 'string',
    price: 1,
    quantity: 1,
    description: 'string',
    date: new Date().toISOString(),
    pictures: [
      'https://images.pexels.com/photos' +
      '/930398/pexels-photo-930398.jpeg?auto=compress&cs=tinysrgb&w=1600',
    ],
    discount: 0,
  },
];

jest.mock('next/router', () => ({
  useRouter() {
    return {
      query: { username: '123' },
    };
  },
}));

jest.mock('react-i18next', () => ({
  // this mock makes sure any components using the translate hook can use it without a warning being shown
  useTranslation: () => {
    return {
      t: (str: string) => str,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
    };
  },
  initReactI18next: {
    type: '3rdParty',
    init: () => {},
  },
}));

const renderView = async () => {
  render(
    <AppContextProvider>
      <ProductList products={products} showSearch={true} showSorter={true} />
    </AppContextProvider>
  );
};

test('Renders', async () => {
  renderView();
});

test('Searching', async () => {
  renderView();
  const search = screen.getByLabelText('Search Products');
  fireEvent.change(search, { target: { value: 'Air' } });
});

test('Sorting', async () => {
  renderView();
  await userEvent.click(await findByRole(await screen.findByTestId('sort'), 'combobox'));
  fireEvent.click(screen.getByLabelText('newest'));
  await userEvent.click(await findByRole(await screen.findByTestId('sort'), 'combobox'));
  fireEvent.click(screen.getByLabelText('oldest'));
  await userEvent.click(await findByRole(await screen.findByTestId('sort'), 'combobox'));
  fireEvent.click(screen.getByLabelText('price-high'));
  await userEvent.click(await findByRole(await screen.findByTestId('sort'), 'combobox'));
  fireEvent.click(screen.getByLabelText('price-low'));
});
