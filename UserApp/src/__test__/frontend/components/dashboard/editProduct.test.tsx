import { Product } from '../../../../graphql/product/schema';
import { render, screen } from '@testing-library/react';
import { CssVarsProvider } from '@mui/joy';
import { AppContextProvider } from '../../../../context';
import ProductEdit from '../../../../components/dashboard/product/ProductEdit';
import '../../matchMedia';
import userEvent from '@testing-library/user-event';
import { graphql, rest } from 'msw';
import { setupServer } from 'msw/node';

const product: Product = {
  id: 'aa8efe0c-8eeb-4bd3-95a5-e8e3526e9bb9',
  user: 'molly_member',
  name: 'iPad 19',
  description:
    'Latest and greatest update, not even in the market for 90 years.',
  price: 190000000,
  category: 'electronics',
  quantity: 1,
  images: ['1630caf6-fab4-43ac-8e43-bdc692fe19df'],
  discount: 0,
  date: '2022-01-21T15:43:08.000Z',
  attributes: [],
};

const productList: Product[] = [product];

const handlers = [
  graphql.mutation('updateProduct', async (req, res, ctx) => {
    return res(
      ctx.data({
        updateProduct: {
          id: 'aa8efe0c-8eeb-4bd3-95a5-e8e3526e9bb9',
          user: 'molly_member',
          name: 'iPad 19 (blew up)',
          description: 'Sorry... it blew up oop.',
          price: 10,
          category: 'electronics',
          quantity: 1,
          images: ['1630caf6-fab4-43ac-8e43-bdc692fe19df'],
          discount: 0,
          date: '2022-01-21T15:43:08.000Z',
          attributes: [],
        },
      }),
    );
  }),
  graphql.query('getAllCategories', async (req, res, ctx) => {
    return res(
      ctx.data({
        category: [
          {
            name: 'Electronics',
            slug: 'electronics',
          },
          {
            name: 'Toys',
            slug: 'toys',
          },
        ],
      }),
    );
  }),
  rest.post('http://localhost:4001/api/v0/image', async (req, res, ctx) => {
    return res(ctx.status(200), ctx.json([]));
  }),
  rest.post('http://localhost:3000/api/image', async (req, res, ctx) => {
    return res(ctx.status(200), ctx.json([]));
  }),
];

const server = setupServer(...handlers);

beforeAll(() => {
  server.listen();
});

afterEach(() => server.resetHandlers());
afterAll(() => server.close());

jest.mock('next/router', () => ({ push: jest.fn(), back: jest.fn() }));

jest.mock('react-i18next', () => ({
  // this mock makes sure any components using the translate hook can use it without a warning being shown
  useTranslation: () => {
    return {
      t: (str: string) => str,
      i18n: {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        changeLanguage: () => new Promise(() => {}),
      },
    };
  },
  initReactI18next: {
    type: '3rdParty',
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    init: () => {},
  },
}));

const renderView = async () => {
  const handleCancel = jest.fn();
  const updateProductList = jest.fn();
  render(
    <CssVarsProvider>
      <AppContextProvider>
        <ProductEdit
          product={product}
          handleCancel={handleCancel}
          productList={productList}
          updateProductList={updateProductList}
        />
      </AppContextProvider>
    </CssVarsProvider>,
  );
};

test('Renders Edit Modal - All exists', async () => {
  localStorage.setItem(
    'user',
    '{"accessToken":"whatever","name":"molly","email":"molly_admin@ucsc.edu"}',
  );
  await renderView();
  const productNameInput = (await screen.findByLabelText(
    'Enter Name',
  )) as HTMLInputElement;
  // const categoryInput = (await screen.findByLabelText('category')) as HTMLInputElement;
  const priceInput = (await screen.findByLabelText(
    'Enter Price',
  )) as HTMLInputElement;
  const quantityInput = (await screen.findByLabelText(
    'Enter Quantity',
  )) as HTMLInputElement;
  const descriptionInput = (await screen.findByLabelText(
    'Enter Description',
  )) as HTMLInputElement;

  expect(productNameInput.value).toBe(product.name);
  // expect(categoryInput.value).toBe(product.category);
  expect(+priceInput.value).toBe(product.price);
  expect(+quantityInput.value).toBe(product.quantity);
  expect(descriptionInput.value).toBe(product.description);
});

test('Renders Edit Modal - Edit fields', async () => {
  localStorage.setItem(
    'user',
    '{"accessToken":"whatever","name":"molly","email":"molly_admin@ucsc.edu"}',
  );
  await renderView();

  const updatedValues = {
    name: 'iPad 19 (blew up)',
    description: 'Sorry... it blew up oop.',
    price: 10,
  };

  const productNameInput = (await screen.findByLabelText(
    'Enter Name',
  )) as HTMLInputElement;
  // const categoryInput = (await screen.findByLabelText('category')) as HTMLInputElement;
  const priceInput = (await screen.findByLabelText(
    'Enter Price',
  )) as HTMLInputElement;
  const quantityInput = (await screen.findByLabelText(
    'Enter Quantity',
  )) as HTMLInputElement;
  const descriptionInput = (await screen.findByLabelText(
    'Enter Description',
  )) as HTMLInputElement;

  await userEvent.clear(productNameInput);
  await userEvent.type(productNameInput, updatedValues.name);

  await userEvent.clear(priceInput);
  await userEvent.type(priceInput, `${updatedValues.price}`);

  await userEvent.clear(descriptionInput);
  await userEvent.type(descriptionInput, updatedValues.description);

  expect(productNameInput.value).toBe(updatedValues.name);
  // expect(categoryInput.value).toBe(product.category);
  expect(+priceInput.value).toBe(updatedValues.price);
  expect(+quantityInput.value).toBe(product.quantity);
  expect(descriptionInput.value).toBe(updatedValues.description);

  const submitButton = await screen.getByLabelText('create');
  await userEvent.click(submitButton);
});
