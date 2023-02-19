import { CssVarsProvider } from '@mui/joy/styles';
import { render, screen } from '@testing-library/react';

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
  graphql.query('conversation', async (req, res, ctx) => {
    return res(
      ctx.data({
        conversation: [
          {
            id: 'f94a1252-7d5e-4b87-ae41-7a03f58a4028',
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
            content: 'Hello, can you tell me the status of my order?',
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
  await screen.findByText('f94a1252-7d5e-4b87-ae41-7a03f58a4028');
  await screen.findByText('Hello, can you tell me the status of my order?');
});
