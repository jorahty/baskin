import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RolesPage from '../../../../components/roles/RolesPage';
import { AppContextProvider } from '../../../../context';
import { graphql } from 'msw';
import { CssVarsProvider } from '@mui/joy';
import '../../matchMedia';
import { setupServer } from 'msw/node';


const handlers = [
  graphql.query('getAllUsers', async (req, res, ctx) => {
    return res(
      ctx.data({
        user: [
          {
            username: 'molly_member',
          },
        ],
      }),
    );
  }),
  graphql.mutation('updateRoles', async (req, res, ctx) => {
    const json = await req.json();
    if (json.query.indexOf('moderator') >= 0) {
      return res(
        ctx.data({
          updateRoles:
            {
              username: 'molly_member',
            },
        }),
      );
    } else {
      return res(
        ctx.errors([
          {
            message: 'Unexpected error.',
          },
        ])
      );
    }
  }),
];

const server = setupServer(...handlers);

beforeAll(() => {
  server.listen();
});

afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const renderView = async () => {
  render(
    <CssVarsProvider>
      <AppContextProvider>
        <RolesPage />
      </AppContextProvider>
    </CssVarsProvider>,
  );
};

test('Renders roles page', async () => {
  localStorage.setItem(
    'user',
    `{"username":"molly_member","accessToken":"blergh","name":"Molly Member"}`,
  );

  await renderView();
  await screen.findByText('Username');
});

test('Set new roles', async () => {
  localStorage.setItem(
    'user',
    `{"username":"molly_member","accessToken":"blergh","name":"Molly Member"}`,
  );

  await renderView();
  let alerted = false;
  window.alert = () => {
    alerted = true;
  };
  await screen.findByText('Username');

  const input = await screen.findByLabelText('username');
  await userEvent.click(input);

  await userEvent.type(input, 'molly_member');
  await screen.findByText('molly_member');
  fireEvent.keyDown(await screen.findByLabelText('username'), {
    key: 'Enter',
    code: 13,
    charCode: 13,
  });

  const roles = await screen.findByLabelText('roles');
  await userEvent.click(roles);

  const moderator = await screen.findByLabelText('admin');
  await userEvent.click(moderator);

  fireEvent.click(await screen.findByText('Change!'));
  await waitFor(() => {
    expect(alerted).toBe(true);
  });
});

test('Set new roles moderator', async () => {
  localStorage.setItem(
    'user',
    `{"username":"molly_member","accessToken":"blergh","name":"Molly Member"}`,
  );

  await renderView();
  let alerted = false;
  window.alert = () => {
    alerted = true;
  };
  await screen.findByText('Username');

  const input = await screen.findByLabelText('username');
  await userEvent.click(input);

  await userEvent.type(input, 'molly_member');
  await screen.findByText('molly_member');
  fireEvent.keyDown(await screen.findByLabelText('username'), {
    key: 'Enter',
    code: 13,
    charCode: 13,
  });

  const roles = await screen.findByLabelText('roles');
  await userEvent.click(roles);

  const moderator = await screen.findByLabelText('moderator');
  await userEvent.click(moderator);

  fireEvent.click(await screen.findByText('Change!'));
  await waitFor(() => {
    expect(alerted).toBe(true);
  });
});

test('Set new roles failed request', async () => {
  localStorage.setItem(
    'user',
    `{"username":"molly_member","accessToken":"blergh","name":"Molly Member"}`,
  );

  await renderView();
  let alerted = false;
  window.alert = () => {
    alerted = true;
  };
  await screen.findByText('Username');

  const input = await screen.findByLabelText('username');
  await userEvent.click(input);

  await userEvent.type(input, 'molly_member');
  await screen.findByText('molly_member');
  fireEvent.keyDown(await screen.findByLabelText('username'), {
    key: 'Enter',
    code: 13,
    charCode: 13,
  });

  const roles = await screen.findByLabelText('roles');
  await userEvent.click(roles);

  const moderator = await screen.findByLabelText('member');
  await userEvent.click(moderator);

  fireEvent.click(await screen.findByText('Change!'));
  await waitFor(() => {
    expect(alerted).toBe(true);
  });
});


test('Set new roles withtout selecting roles', async () => {
  localStorage.setItem(
    'user',
    `{"username":"molly_member","accessToken":"blergh","name":"Molly Member"}`,
  );

  await renderView();
  let alerted = false;
  window.alert = () => {
    alerted = true;
  };
  await screen.findByText('Username');

  const input = await screen.findByLabelText('username');
  await userEvent.click(input);

  await userEvent.type(input, 'molly_member');
  await screen.findByText('molly_member');
  fireEvent.keyDown(await screen.findByLabelText('username'), {
    key: 'Enter',
    code: 13,
    charCode: 13,
  });

  fireEvent.click(await screen.findByText('Change!'));
  await waitFor(() => {
    expect(alerted).toBe(true);
  });
});
