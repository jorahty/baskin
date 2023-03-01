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
    if (req.variables.slug === 'not-a-category') return res(
      ctx.data({
        category: [null],
      }),
    );

    return res(
      ctx.data({
        category: [{
          slug: 'cars',
          name: 'Cars',
        }],
      }),
    );
  }),
  graphql.query('CategoryChildren', async (req, res, ctx) => {
    return res(
      ctx.data({
        categoryChildren: [{
          slug: 'cars',
          name: 'Cars',
        }],
      }),
    );
  }),
  graphql.query('CategoryAncestors', async (req, res, ctx) => {
    return res(
      ctx.data({
        categoryAncestors: [{
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

const renderView = async (slug: string) => {
  const { props } = await getServerSideProps({
    query: { slug: slug },
  } as any) as any; // eslint-disable-line @typescript-eslint/no-explicit-any
  props && render(
    <CssVarsProvider>
      <CategoryPage
        category={props.category}
      />
    </CssVarsProvider>
  );
};

test('Renders', async () => {
  renderView('cars');
  await new Promise(resolve => setTimeout(resolve, 500));
});

test('Redirect', async () => {
  renderView('not-a-category');
  await new Promise(resolve => setTimeout(resolve, 500));
});
