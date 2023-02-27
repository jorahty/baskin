import { render, screen } from '@testing-library/react';
import { CssVarsProvider } from '@mui/joy/styles';
import '../matchMedia';
import { graphql } from 'msw';
import { setupServer } from 'msw/node';

import UserPage from '../../../pages/user/[username]';
import { getServerSideProps } from '../../../pages/user/[username]';

jest.mock('next/router', () => ({
  useRouter() {
    return {
      query: { username: '123' },
    };
  },
}));

const handlers = [
  graphql.query('UserPage', async (req, res, ctx) => {
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
  graphql.query('UserProfile', async (req, res, ctx) => {
    return res(ctx.data({
      user: [{
        username: 'molly_member',
        name: 'Molly Member',
        email: 'molly@books.com',
      }],
    },
    ));
  }),
];

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const renderView = async () => {
  const { props } = await getServerSideProps({
    req: { headers: { host: 'localhost:3000' } },
    query: { username: 'molly_member' },
  });
  render(
    <CssVarsProvider>
      <UserPage user={props.user} products={props.products} />
    </CssVarsProvider>
  );
};

test('Renders', async () => {
  renderView();
  await screen.findByText(`Molly Member`);
});
