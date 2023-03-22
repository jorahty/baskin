import { Product } from '@/graphql/product/schema';
import { render, screen } from '@testing-library/react';
import { CssVarsProvider } from '@mui/joy';
import '../../matchMedia';

import ProductEdit from '../../../../components/dashboard/product/ProductEdit';
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

jest.mock(
  '../../../../components/layout/CreateLayout',
  () =>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any,implicit-arrow-linebreak
    function CreateLayout({ handleCreate }: any) {
      handleCreate('string', 'string', 0, 'Choose Category', 0, ['whatever']);

      return <div>Hello World!</div>;
    },
);

jest.mock('next/router', () => ({
  back: jest.fn(),
}));

const handlers = [
  rest.post('http://localhost:4001/api/v0/image', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json([]));
  }),
  rest.post('http://localhost:3000/api/image', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json([]));
  }),
  graphql.mutation('updateProduct', async (req, res, ctx) => {
    return res(
      ctx.data({
        updateProduct: {
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
        },
      }),
    );
  }),
];

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const renderView = async () => {
  render(
    <CssVarsProvider>
      <ProductEdit
        product={product}
        handleCancel={jest.fn()}
        productList={[product]}
        updateProductList={jest.fn}
      />
    </CssVarsProvider>,
  );
};

test('Renders', async () => {
  await renderView();
  screen.findByText('Hello World!');
  await new Promise(resolve => setTimeout(resolve, 500));
});
