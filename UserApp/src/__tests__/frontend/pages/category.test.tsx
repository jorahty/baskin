import { render } from '@testing-library/react';
import { CssVarsProvider } from '@mui/joy/styles';
import { graphql } from 'msw';
import { setupServer } from 'msw/node';
import 'whatwg-fetch';
import '../matchMedia';

import CategoryPage from '../../../pages/category/[slug]';
import { getServerSideProps } from '../../../pages/category/[slug]';

const handlers = [
  graphql.query('ListProducts', async (req, res, ctx) => {
    return res(
      ctx.data({
        product: [{
          id: '038b7e70-a5c0-47e6-80f3-5b1772bb4a0d',
          user: 'molly_member',
          category: 'clothing',
          name: 'Air Jordan 15',
          price: 250,
          date: '2023-02-09T06:43:08.000Z',
          discount: 0,
          quantity: 1,
          description: 'Never worn',
          pictures: [
            'https://images.pexels.com/whatever',
          ],
        }],
      }),
    );
  }),
  graphql.query('ListCategories', async (req, res, ctx) => {
    return res(
      ctx.data({
        category: [{
          slug: 'cars',
          name: 'Cars',
        }],
      }),
    );
  }),
];

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

jest.mock('next/router', () => ({
  useRouter() {
    return {
      query: { slug: '123' },
    };
  },
}));

const renderView = async () => {
  const { props } = await getServerSideProps({
    req: { headers: { host: 'localhost:3000' } },
    query: { username: 'molly_member' },
  });
  render(
    <CssVarsProvider>
      <CategoryPage
        categories={props.categories}
        products={props.products}
      />
    </CssVarsProvider>
  );
};

test('Renders', async () => {
  renderView();
  await new Promise(resolve => setTimeout(resolve, 500));
});
