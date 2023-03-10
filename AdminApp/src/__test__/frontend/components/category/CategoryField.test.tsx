import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CategoryField from '../../../../components/category/CategoryField';
import { AppContextProvider } from '../../../../context';
import { graphql } from 'msw';
import { CssVarsProvider } from '@mui/joy';
import '../../matchMedia';
import { setupServer } from 'msw/node';

const handlers = [
  graphql.mutation('editCategory', async (req, res, ctx) => {
    const json = await req.json();
    if (json.query.indexOf('Vehicles') >= 0) {
      return res(
        ctx.data({
          editCategory: {
            name: 'Vehicles',
            slug: 'vehicles',
          },
        }),
      );
    } else {
      return res(
        ctx.errors([
          {
            message: 'Unexpected error.',
          },
        ]),
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
        <CategoryField id={'vehicle'} value={'Vehicle'} field={'name'} />
      </AppContextProvider>
    </CssVarsProvider>,
  );
};

test('Renders Categories field', async () => {
  localStorage.setItem(
    'user',
    `{"username":"molly_member","accessToken":"blergh","name":"Molly Member"}`,
  );

  await renderView();
  await screen.findByText('Vehicle');
  fireEvent.mouseEnter(await screen.findByText('Vehicle'));
  fireEvent.mouseLeave(await screen.findByText('Vehicle'));
});

test('Id Categories field and click cancel', async () => {
  localStorage.setItem(
    'user',
    `{"username":"molly_member","accessToken":"blergh","name":"Molly Member"}`,
  );

  await renderView();
  fireEvent.mouseMove(await screen.findByText('Vehicle'));
  fireEvent.click(await screen.findByLabelText('edit-vehicle'));
  fireEvent.click(await screen.findByLabelText('cancel-vehicle'));
});

test('Id Categories field', async () => {
  localStorage.setItem(
    'user',
    `{"username":"molly_member","accessToken":"blergh","name":"Molly Member"}`,
  );

  await renderView();
  fireEvent.mouseMove(await screen.findByText('Vehicle'));
  fireEvent.click(await screen.findByLabelText('edit-vehicle'));
  const input = await screen.getByLabelText('input');
  await userEvent.type(input, 's');
  fireEvent.click(await screen.findByLabelText('submit-vehicle'));
  await screen.findByText('Vehicles');
});

test('Id Categories field failed request', async () => {
  localStorage.setItem(
    'user',
    `{"username":"molly_member","accessToken":"blergh","name":"Molly Member"}`,
  );

  await renderView();
  let alerted = false;
  window.alert = () => {
    alerted = true;
  };
  fireEvent.mouseMove(await screen.findByText('Vehicle'));
  fireEvent.click(await screen.findByLabelText('edit-vehicle'));
  const input = await screen.getByLabelText('input');
  await userEvent.type(input, 'reversed');
  fireEvent.click(await screen.findByLabelText('submit-vehicle'));
  await waitFor(() => {
    expect(alerted).toBe(true);
  });
});
