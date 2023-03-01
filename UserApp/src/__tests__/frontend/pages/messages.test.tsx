import { CssVarsProvider } from '@mui/joy/styles';
import { render, screen, fireEvent } from '@testing-library/react';

import { graphql } from 'msw';
import { setupServer } from 'msw/node';
import 'whatwg-fetch';
import '../matchMedia';

import MessagesPage from '../../../pages/messages/[id]';

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
            id: '1',
            name: 'Samsung TV',
          },
          {
            id: '2',
            members: [{ name: 'Anna Admin' }],
          },
          {
            id: '3',
            members: [{ name: 'Anna Admin' }, { name: 'Molly Member' }],
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
            sender: 'molly_member',
            content: 'Hey Anna, this is Molly',
          },
          {
            sender: 'anna_admin',
            content: 'Hey Molly, this is Anna',
          },
          {
            sender: 'molly_member',
            content: 'Cool',
          },
          {
            sender: 'molly_member',
            content: 'How\'s your day been?',
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
      query: { id: '1' },
      push: () => (null),
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

test('Renders', async () => {
  await renderView();
  await screen.findByText('Samsung TV');
});
