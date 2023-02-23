import { fireEvent, render, screen } from '@testing-library/react';
import { CssVarsProvider } from '@mui/joy';
import { AppContextProvider } from '../../../../context';
import ProductTable from '../../../../components/dashboard/product/ProductTable';
import { Product } from '../../../../graphql/product/schema';
import { graphql } from 'msw';
import { setupServer } from 'msw/node';
import 'whatwg-fetch';
import '../../matchMedia';

const handlers = [
  graphql.mutation('delete', async (req, res, ctx) => {
    return res(
      ctx.data({
        delete: [
          {
            id: '038b7e70-a5c0-47e6-80f3-5b1772bb4a0d',
          },
        ],
      })
    );
  }),
];

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const products: Product[] = [
  {
    id: '038b7e70-a5c0-47e6-80f3-5b1772bb4a0d',
    user: 'molly_member',
    category: 'toys',
    name: 'Honda Civic Toy Car',
    price: 23,
    discount: 0,
    quantity: 23,
    pictures: [
      'https://images.pexels.com/photos/6020432/' +
      'pexels-photo-6020432.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    ],
    description: 'something',
    date: '2022-07-28T01:00:08.000Z',
  },
];
const renderView = async () => {
  localStorage.setItem('user', `{"username": "molly_member", "accessToken": "blergh"}`);
  render(
    <CssVarsProvider>
      <AppContextProvider>
        <ProductTable products={products} />
      </AppContextProvider>
    </CssVarsProvider>,
  );
};

test('Renders Product Menu', async () => {
  await renderView();
});

test('Edits product', async () => {
  await renderView();
  fireEvent.click(screen.getByLabelText('menu'));
  fireEvent.click(screen.getByLabelText('edit'));
});

test('Deletes product', async () => {
  await renderView();
  fireEvent.click(screen.getByLabelText('menu'));
  fireEvent.click(screen.getByLabelText('delete'));
  await new Promise(resolve => setTimeout(resolve, 1000));
  expect(screen.queryByText('Honda Civic Toy Car')).not.toBeInTheDocument();
});
