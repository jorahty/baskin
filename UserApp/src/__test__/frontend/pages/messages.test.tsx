import { CssVarsProvider } from '@mui/joy/styles';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { graphql } from 'msw';
import { setupServer } from 'msw/node';
import 'whatwg-fetch';
import '../matchMedia';

import { getServerSideProps } from '../../../pages/messages/[id]';
import MessagesPage from '../../../pages/messages/[id]';
// import { loginHandlers } from '../../graphql/login';

jest.mock('../../../context', () => ({
  useAppContext: () => ({
    signIn: jest.fn(),
    signOut: jest.fn(),
    signedInUser: {
      name: 'Molly Member',
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
            members: [
              { name: 'Anna Admin', username: 'anna_admin' },
              { name: 'Molly Member', username: 'molly_member' },
            ],
          },
          {
            id: '2',
            members: [
              { name: 'Anna Admin', username: 'anna_admin' },
              { name: 'Molly Member', username: 'molly_member' },
            ],
          },
          {
            id: '3',
            members: [
              { name: 'Anna Admin', username: 'anna_admin' },
              { name: 'Molly Member', username: 'molly_member' },
              { name: 'Mia Moderator', username: 'mia_moderator' },
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
            sender: 'molly_member',
            content: 'Hey Anna, this is Molly',
            date: new Date('January 1, 2023').toString(),
          },
          {
            sender: 'anna_admin',
            content: 'Hey Molly, this is Anna',
            date: new Date().toString(),
          },
          {
            sender: 'molly_member',
            content: 'Cool',
            date: new Date().toString(),
          },
          {
            sender: 'molly_member',
            content: 'How\'s your day been?',
            date: new Date().toString(),
          },
        ],
      })
    );
  }),
  graphql.mutation('sendMessage', async (req, res, ctx) => {
    return res(
      ctx.data({
        sendMessage: {
          sender: 'molly_member',
          content: 'bogus text',
          date: new Date().toISOString(),
        },
      })
    );
  }),
];

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const renderView = async () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { props } = (await getServerSideProps({} as any)) as any;
  console.log(props);
  render(
    <CssVarsProvider>
      <MessagesPage />
    </CssVarsProvider>
  );
};

jest.mock('next/router', () => ({
  useRouter() {
    return {
      query: { id: '1' },
      push: jest.fn(),
    };
  },
  push: jest.fn(),
}));

test('Main', async () => {
  await renderView();
  await screen.findAllByText('Samsung TV');
  await screen.findByText('Hey Anna, this is Molly');

  fireEvent.mouseEnter(screen.getByText('Hey Anna, this is Molly'));
  await screen.findByText('Hey Molly, this is Anna');
  fireEvent.mouseEnter(screen.getByText('Hey Molly, this is Anna'));

  fireEvent.click(screen.getByText('Anna Admin'));
});

test('Go to Chat With Id 2', async () => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const mockRouter = jest.spyOn(require('next/router'), 'useRouter');
  mockRouter.mockReturnValue({ query: { id: '2' }, push: jest.fn() });

  renderView();
  await screen.findAllByText('Anna Admin');
});

test('Go to Chat With Id 3', async () => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const mockRouter = jest.spyOn(require('next/router'), 'useRouter');
  mockRouter.mockReturnValue({ query: { id: '3' }, push: jest.fn() });

  renderView();
  expect(await screen.findAllByText('Anna, Mia')).toHaveLength(2);
});

test('Bad URL', async () => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const mockRouter = jest.spyOn(require('next/router'), 'useRouter');
  mockRouter.mockReturnValue({ query: { id: '11' }, push: jest.fn() });

  await renderView();
  await screen.findByText('Samsung TV');
  await screen.findByText('Anna Admin');
});

test('Not signed in', async () => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const useAppContext = jest.spyOn(require('../../../context'), 'useAppContext');

  useAppContext.mockImplementation(() => ({
    signIn: jest.fn(),
    signOut: jest.fn(),
    signedInUser: null,
  }));

  await renderView();
});

test('Send Message', async () => {
  renderView();
  await screen.findByPlaceholderText('Aa');
  await userEvent.type(screen.getByPlaceholderText('Aa'), 'bogus text');
  fireEvent.click(screen.getByLabelText('send-message'));
  await screen.findByText('bogus text');
});
