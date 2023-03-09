import { render, screen, fireEvent } from '@testing-library/react';
import AttributeTable from '../../../../components/attribute/AttributeTable';
import { AppContextProvider } from '../../../../context';
import { graphql } from 'msw';
import { CssVarsProvider } from '@mui/joy';
import '../../matchMedia';
import { setupServer } from 'msw/node';

const categories = [
  {
    name: 'Condition',
    category: 'vehicles',
    id: 'X0bZdioM6D',
    type: 'set',
    values: ['new', 'used'],
  },
  {
    name: 'Condition',
    category: 'vehicles',
    id: 'X0bZdioM60',
    type: 'set',
    values: ['new', 'used'],
  },
];

const handlers = [
  graphql.mutation('removeAttribute', async (req, res, ctx) => {
    const json = await req.json();
    if (json.query.indexOf('X0bZdioM6D') >= 0) {
      return res(
        ctx.data({
          removeAttribute:
            {
              id: 'X0bZdioM6D',
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
  const setAttributes = () => null;
  render(
    <CssVarsProvider>
      <AppContextProvider>
        <AttributeTable attributes={categories}  setAttributes={setAttributes}/>
      </AppContextProvider>
    </CssVarsProvider>,
  );
};

test('Renders Attribute Table', async () => {
  localStorage.setItem(
    'user',
    `{"username":"molly_member","accessToken":"blergh","name":"Molly Member"}`,
  );

  await renderView();
  await screen.findByLabelText('X0bZdioM6D');
});

test('Delete attribute', async () => {
  localStorage.setItem(
    'user',
    `{"username":"molly_member","accessToken":"blergh","name":"Molly Member"}`,
  );

  await renderView();
  fireEvent.click(await screen.findByLabelText('delete-X0bZdioM6D'));
  fireEvent.click(await screen.findByLabelText('delete'));
});

test('Delete attribute failed request', async () => {
  localStorage.setItem(
    'user',
    `{"username":"molly_member","accessToken":"blergh","name":"Molly Member"}`,
  );

  await renderView();
  fireEvent.click(await screen.findByLabelText('delete-X0bZdioM60'));
  fireEvent.click(await screen.findByLabelText('delete'));
});

test('Cancel attribute category', async () => {
  localStorage.setItem(
    'user',
    `{"username":"molly_member","accessToken":"blergh","name":"Molly Member"}`,
  );

  await renderView();
  fireEvent.click(await screen.findByLabelText('delete-X0bZdioM6D'));
  await screen.findByLabelText('delete');
  fireEvent.click(await screen.findByText('Cancel'));
});

test('Esapce delete attribute', async () => {
  localStorage.setItem(
    'user',
    `{"username":"molly_member","accessToken":"blergh","name":"Molly Member"}`,
  );

  await renderView();
  fireEvent.click(await screen.findByLabelText('delete-X0bZdioM6D'));
  await screen.findByLabelText('delete');
  fireEvent.keyDown(screen.getByText('Cancel'), {
    key: 'Escape',
    code: 'Escape',
    keyCode: 27,
    charCode: 27,
  });
});

test('Click edit attribute', async () => {
  localStorage.setItem(
    'user',
    `{"username":"molly_member","accessToken":"blergh","name":"Molly Member"}`,
  );

  await renderView();
  fireEvent.click(await screen.findByLabelText('edit-X0bZdioM6D'));
});