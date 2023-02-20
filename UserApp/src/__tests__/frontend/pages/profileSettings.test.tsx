import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { CssVarsProvider } from '@mui/joy/styles';
import { graphql } from 'msw';
import { setupServer } from 'msw/node';
// import Dashboard from '../../../pages/dashboard';
import 'whatwg-fetch';
import '../matchMedia';
import ProfileEdit from '../../../components/dashboard/ProfileEdit';
import userEvent from '@testing-library/user-event';

jest.mock('../../../context', () => ({
  useAppContext: () => ({
    signIn: jest.fn(),
    signOut: jest.fn(),
    signedInUser: {
      name: 'Nobby Nobody',
      username: 'nobby_nobody',
      accessToken: 'whatever',
    },
    setSignedInUser: jest.fn(),
  }),
}));

const handlers = [
  graphql.mutation('updateUsername', async (req, res, ctx) => {
    return res(
      ctx.data({
        updateUsername: {
          username: 'nobby_bread1',
        },
      })
    );
  }),
  graphql.query('user', async (req, res, ctx) => {
    const json = await req.json();
    if (json.query.indexOf('nobby_nobody') >= 0) {
      return res(
        ctx.data({
          user: {
            name: 'Nobby Nobody',
            username: 'nobby_nobody',
          },
        })
      );
    } else {
      return res(
        ctx.data({
          user: [],
        })
      )
    }
  }),
];

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const renderView = async () => {
  render(
    <CssVarsProvider>
      <ProfileEdit />
    </CssVarsProvider>
  );
};

test('Renders', async () => {
  await renderView();
  await screen.findByText('Profile Settings');
});

test('Changes Username', async () => {
  await renderView();
  let input = await screen.findByPlaceholderText('Username');
  await userEvent.type(input, 'nob');
  expect(await screen.findByText('Invalid Username...')).toBeTruthy();
  fireEvent.change(input, { target: { value: 'nobby_nobody' } });
  expect(await screen.findByText('Invalid Username...')).toBeTruthy();
  fireEvent.change(input, { target: { value: 'nobby_bread1' } });
  await waitFor(() => expect(screen.queryByText('Invalid Username...')).toBeTruthy());
  const button = await screen.findByText('Update');
  fireEvent.click(button);
  fireEvent.change(input, { target: { value: '' } });
  await waitFor(() => expect(screen.queryByText('Valid Username')).toBeNull());
});
