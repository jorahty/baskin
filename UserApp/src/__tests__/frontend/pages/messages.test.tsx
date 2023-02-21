import { CssVarsProvider } from '@mui/joy/styles';
import { render, screen, fireEvent } from '@testing-library/react';

import { graphql } from 'msw';
import { setupServer } from 'msw/node';
import 'whatwg-fetch';
import '../matchMedia';

import MessagesPage from '../../../pages/messages';

jest.mock('../../../context', () => ({
  useAppContext: () => ({
    signIn: jest.fn(),
    signOut: jest.fn(),
    signedInUser: {
      name: 'molly',
      username: 'molly_member',
      accessToken: 'whatever',
    },
  }),
}));

const handlers = [
  graphql.query('chat', async (req, res, ctx) => {
    return res(
      ctx.data({
        chat: [
          {
            name: 'Samsung TV',
          },
          {
            members: [
              { name: 'Anna Admin' },
            ],
          },
        ],
      })
    );
  }),
  graphql.query('message', async (req, res, ctx) => {
    return res(
      ctx.data({
        message: [
          {
            content: 'Hey Anna, this is Molly',
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

jest.mock('next/router', () => ({
  useRouter() {
    return {
      query: { slug: 'toys' },
    };
  },
  push: jest.fn(),
}));

const renderView = async () => {
  render(
    <CssVarsProvider>
      <MessagesPage />
    </CssVarsProvider>
  );
};

test('Renders', async () => {
  await renderView();
  await screen.findByText('Samsung TV');
  await screen.findByText('Anna Admin');
  await screen.findByText('Hey Anna, this is Molly');
  fireEvent.click(screen.getByText('Samsung TV'));
  await screen.findByText('Hey Anna, this is Molly');
});
