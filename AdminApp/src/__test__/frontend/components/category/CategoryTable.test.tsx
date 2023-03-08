import { render, screen, fireEvent } from '@testing-library/react';
import CategoriesTable from '../../../../components/category/CategoryTable';
import { AppContextProvider } from '../../../../context';
import { graphql } from 'msw';
import { CssVarsProvider } from '@mui/joy';
import '../../matchMedia';
import { setupServer } from 'msw/node';

const categories = [
  {
    name: 'Vehicles',
    slug: 'vehicles',
    parent: '',
  },
  {
    name: 'Trucks',
    slug: 'trucks',
    parent: '',
  },
  {
    name: 'Tractors',
    slug: 'tractors',
    parent: '',
  },
  {
    name: 'Trailers',
    slug: 'trailers',
    parent: '',
  },
];

const handlers = [
  graphql.mutation('removeCategory', async (req, res, ctx) => {
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
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const setCategories = () => null;
  render(
    <CssVarsProvider>
      <AppContextProvider>
        <CategoriesTable categories={categories}  setCategories={setCategories}/>
      </AppContextProvider>
    </CssVarsProvider>,
  );
};

test('Renders Categories Table', async () => {
  localStorage.setItem(
    'user',
    `{"username":"molly_member","accessToken":"blergh","name":"Molly Member"}`,
  );

  await renderView();
  await screen.findByLabelText('vehicles');
});

test('Delete category', async () => {
  localStorage.setItem(
    'user',
    `{"username":"molly_member","accessToken":"blergh","name":"Molly Member"}`,
  );

  await renderView();
  fireEvent.click(await screen.findByLabelText('delete-vehicles'));
  fireEvent.click(await screen.findByLabelText('delete'));
});

test('Delete category failed request', async () => {
  localStorage.setItem(
    'user',
    `{"username":"molly_member","accessToken":"blergh","name":"Molly Member"}`,
  );

  await renderView();
  fireEvent.click(await screen.findByLabelText('delete-trucks'));
  fireEvent.click(await screen.findByLabelText('delete'));
});

test('Cancel delete category', async () => {
  localStorage.setItem(
    'user',
    `{"username":"molly_member","accessToken":"blergh","name":"Molly Member"}`,
  );

  await renderView();
  fireEvent.click(await screen.findByLabelText('delete-vehicles'));
  await screen.findByLabelText('delete');
  fireEvent.click(await screen.findByText('Cancel'));
});

test('Esapce delete category', async () => {
  localStorage.setItem(
    'user',
    `{"username":"molly_member","accessToken":"blergh","name":"Molly Member"}`,
  );

  await renderView();
  fireEvent.click(await screen.findByLabelText('delete-vehicles'));
  await screen.findByLabelText('delete');
  fireEvent.keyDown(screen.getByText('Cancel'), {
    key: 'Escape',
    code: 'Escape',
    keyCode: 27,
    charCode: 27,
  });
});