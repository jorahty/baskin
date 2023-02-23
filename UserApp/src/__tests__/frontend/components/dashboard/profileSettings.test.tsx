import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { CssVarsProvider } from '@mui/joy/styles';
import { graphql } from 'msw';
import { setupServer } from 'msw/node';
import 'whatwg-fetch';
import '../../matchMedia';
import ProfileEdit from '../../../../components/dashboard/ProfileEdit';
import userEvent from '@testing-library/user-event';

jest.mock('../../../../context', () => ({
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
  graphql.mutation('updateEmail', async (req, res, ctx) => {
    return res(
      ctx.data({
        updateEmail: {
          email: 'nobby@gmail.com',
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
    } else if (json.query.indexOf('molly@books.com') >= 0) {
      return res(
        ctx.data({
          user: {
            name: 'Molly',
            username: 'molly_member',
          },
        })
      );
    } else {
      return res(
        ctx.data({
          user: [],
        })
      );
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

jest.mock('next/router', () => ({ push: jest.fn() }));

test('Renders', async () => {
  await renderView();
  await screen.findByText('Profile Settings');
});

test('Attempting invalid username change then valid username change', async () => {
  await renderView();
  const input = await screen.findByPlaceholderText('Username');
  await userEvent.type(input, 'nob');
  expect(await screen.findByText('Invalid Username...')).toBeTruthy();
  await waitFor(() => {
    fireEvent.click(screen.getByText('Update Username'));
    expect(screen.findByText('Invalid Username...')).toBeTruthy();
  });
  fireEvent.change(input, { target: { value: 'nobby_nobody' } });
  expect(await screen.findByText('Invalid Username...')).toBeTruthy();
  fireEvent.change(input, { target: { value: 'nobby_bread1' } });
  await waitFor(() => {
    userEvent.click(screen.getByText('Update Username'));
    expect(screen.queryByText('Are you sure?')).toBeTruthy();
  });
  await waitFor(() => {
    fireEvent.click(screen.getByText('Update and Sign Out'));
    expect(screen.queryByText('Are you sure?')).toBeFalsy();
  });
  await waitFor(() => {
    expect(localStorage.getItem('user')).toBe(null);
  });
});

test('Attempting invalid email change then valid email change', async () => {
  await renderView();
  const input = await screen.findByPlaceholderText('Email');
  await userEvent.type(input, 'nobby');
  expect(await screen.findByText('Invalid Email...')).toBeTruthy();
  await waitFor(() => {
    fireEvent.click(screen.getByText('Update Email'));
    expect(screen.findByText('Invalid Email...')).toBeTruthy();
  });
  fireEvent.change(input, { target: { value: 'molly@books.com' } });
  expect(await screen.findByText('Invalid Email...')).toBeTruthy();
  fireEvent.change(input, { target: { value: 'nobby@gmail.com' } });
  await waitFor(() => {
    userEvent.click(screen.getByText('Update Email'));
    expect(screen.queryByText('Are you sure?')).toBeTruthy();
  });
  await waitFor(() => {
    fireEvent.click(screen.getByText('Update and Sign Out'));
    expect(screen.queryByText('Are you sure?')).toBeFalsy();
  });
  await waitFor(() => {
    expect(localStorage.getItem('user')).toBe(null);
  });
});
