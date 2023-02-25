import { render } from '@testing-library/react';
import { CssVarsProvider } from '@mui/joy/styles';
import { graphql } from 'msw';
import { setupServer } from 'msw/node';
import 'whatwg-fetch';
import '../matchMedia';

import CategoryPage from '../../../pages/category/[slug]';
import { getServerSideProps } from '../../../pages/category/[slug]';

const handlers = [
  graphql.query('category', async (req, res, ctx) => {
    return res(
      ctx.data({
        category: [{
          slug: 'vehicles',
          name: 'Vehicles',
        }, {
          slug: 'apparel',
          name: 'Apparel',
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
      query: { id: '123' },
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
