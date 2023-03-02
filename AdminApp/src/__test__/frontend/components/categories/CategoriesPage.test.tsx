import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CategoriesPage from '../../../../components/categories/CategoriesPage';
import { AppContextProvider } from '../../../../context';
import { graphql } from 'msw';
import { CssVarsProvider } from '@mui/joy';
import '../../matchMedia';
import { setupServer } from 'msw/node';

let categories = [
  {
    name: 'Vehicles',
    slug: 'vehicles',
    parent: null,
  },
  {
    name: 'Trucks',
    slug: 'trucks',
    parent: 'vehicles',
  },
];

const handlers = [
  graphql.query('getAllCategories', async (req, res, ctx) => {
    return res(
      ctx.data({
        category: categories,
      }),
    );
  }),
  graphql.mutation('addCategory', async (req, res, ctx) => {
    const json = await req.json();
    if (json.query.indexOf('vehicles') >= 0) {
      return res(
        ctx.data({
          addCategory:
            {
              name: 'New',
              slug: 'new',
              parent: 'vehicles',
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
        <CategoriesPage />
      </AppContextProvider>
    </CssVarsProvider>,
  );
};

test('Renders Product Menu', async () => {
  localStorage.setItem(
    'user',
    `{"username":"molly_member","accessToken":"blergh","name":"Molly Member"}`,
  );

  await renderView();
  await screen.findByLabelText('vehicles');
});

test('Create new category failed request', async () => {
  localStorage.setItem(
    'user',
    `{"username":"molly_member","accessToken":"blergh","name":"Molly Member"}`,
  );

  await renderView();
  let alerted = false;
  window.alert = () => {
    alerted = true;
  };
  fireEvent.click(await screen.findByText('Add Category'));
  const name = await screen.getByLabelText('name');
  await userEvent.type(name, 'New');

  const button = await screen.findByLabelText('parent');
  await userEvent.click(button);

  const vehicles = await screen.findByLabelText('Trucks');
  await userEvent.click(vehicles);

  fireEvent.click(await screen.findByText('Submit'));
  await waitFor(() => {
    expect(alerted).toBe(true);
  });
});

test('Create new category', async () => {
  localStorage.setItem(
    'user',
    `{"username":"molly_member","accessToken":"blergh","name":"Molly Member"}`,
  );

  await renderView();
  fireEvent.click(await screen.findByText('Add Category'));
  const name = await screen.getByLabelText('name');
  categories = categories.concat({
    name: 'New',
    slug: 'new',
    parent: 'vehicles',
  });
  await userEvent.type(name, 'New');

  const button = await screen.findByLabelText('parent');
  await userEvent.click(button);

  const vehicles = await screen.findByLabelText('Vehicles');
  await userEvent.click(vehicles);

  fireEvent.click(await screen.findByText('Submit'));

  await screen.findByLabelText('new');
});

test('Cancel when creating a new category', async () => {
  localStorage.setItem(
    'user',
    `{"username":"molly_member","accessToken":"blergh","name":"Molly Member"}`,
  );

  await renderView();
  fireEvent.click(await screen.findByText('Add Category'));

  fireEvent.click(await screen.findByText('Cancel'));
});

test('Escape when creating a new category', async () => {
  localStorage.setItem(
    'user',
    `{"username":"molly_member","accessToken":"blergh","name":"Molly Member"}`,
  );

  await renderView();
  fireEvent.click(await screen.findByText('Add Category'));

  fireEvent.keyDown(screen.getByText('Cancel'), {
    key: 'Escape',
    code: 'Escape',
    keyCode: 27,
    charCode: 27,
  });
});