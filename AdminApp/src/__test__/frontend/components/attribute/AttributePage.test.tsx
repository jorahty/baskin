import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AppContextProvider } from '../../../../context';
import { graphql } from 'msw';
import { CssVarsProvider } from '@mui/joy';
import '../../matchMedia';
import { setupServer } from 'msw/node';
import AttributePage from '../../../../components/attribute/AttributePage';

let attributes = [
  {
    id: 'X0bZdioM6D',
    name: 'Bathrooms',
    category: 'propert',
    type: 'number',
    min: 0,
    max: 20,
    step: 0,
    symbol: '',
  },
  {
    id: 'X0bZdioM60',
    name: 'Condition',
    category: 'property',
    type: 'set',
    values: ['new', 'used'],
    min: 0,
    max: 0,
    step: 0,
    symbol: '',
  },
];

const categories = [
  {
    name: 'Vehicles',
  },
  {
    name: 'Trucks',
  },
];

const handlers = [
  graphql.query('getAllAttributes', async (req, res, ctx) => {
    return res(
      ctx.data({
        attribute: attributes,
      }),
    );
  }),
  graphql.query('getAllCategories', async (req, res, ctx) => {
    return res(
      ctx.data({
        category: categories,
      }),
    );
  }),
  graphql.mutation('addAttribute', async (req, res, ctx) => {
    const json = await req.json();
    if (json.query.indexOf('New') >= 0) {
      return res(
        ctx.data({
          id: 'X0bZdioM61',
          name: 'New',
          category: 'vehicles',
          type: 'color',
          values: [],
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
        <AttributePage />
      </AppContextProvider>
    </CssVarsProvider>,
  );
};

test('Renders attributes page', async () => {
  localStorage.setItem(
    'user',
    `{"username":"molly_member","accessToken":"blergh","name":"Molly Member"}`,
  );

  await renderView();
  await screen.findByText('Bathrooms');
});

test('Cancel when creating a new attribute', async () => {
  localStorage.setItem(
    'user',
    `{"username":"molly_member","accessToken":"blergh","name":"Molly Member"}`,
  );

  await renderView();
  fireEvent.click(await screen.findByText('Add Attribute'));

  fireEvent.click(await screen.findByText('Cancel'));
});

test('Escape when creating a new attribute', async () => {
  localStorage.setItem(
    'user',
    `{"username":"molly_member","accessToken":"blergh","name":"Molly Member"}`,
  );

  await renderView();
  fireEvent.click(await screen.findByText('Add Attribute'));

  fireEvent.keyDown(screen.getByText('Cancel'), {
    key: 'Escape',
    code: 'Escape',
    keyCode: 27,
    charCode: 27,
  });
});


test('Create new attribute type color', async () => {
  localStorage.setItem(
    'user',
    `{"username":"molly_member","accessToken":"blergh","name":"Molly Member"}`,
  );

  await renderView();
  fireEvent.click(await screen.findByText('Add Attribute'));
  const name = await screen.getByLabelText('name');

  attributes = attributes.concat({
    id: 'X0bZdioM61',
    name: 'New',
    category: 'vehicles',
    type: 'color',
    min: 0,
    max: 0,
    step: 0,
    symbol: '',
    values: [],
  });
  await userEvent.type(name, 'New');

  const button = await screen.findByLabelText('category');
  await userEvent.click(button);

  const vehicles = await screen.findByLabelText('Vehicles');
  await userEvent.click(vehicles);

  const type = await screen.findByLabelText('type');
  await userEvent.click(type);

  const color = await screen.findByLabelText('color');
  await userEvent.click(color);

  fireEvent.click(await screen.findByText('Submit'));

  await screen.findByLabelText('X0bZdioM61');
});

test('Create new attribute type number', async () => {
  localStorage.setItem(
    'user',
    `{"username":"molly_member","accessToken":"blergh","name":"Molly Member"}`,
  );

  await renderView();
  fireEvent.click(await screen.findByText('Add Attribute'));
  const name = await screen.getByLabelText('name');

  attributes = attributes.concat({
    id: 'X0bZdioM65',
    name: 'NewNumber',
    category: 'vehicles',
    type: 'number',
    min: 1,
    max: 5,
    step: 3,
    symbol: 'ft',
    values: [],
  });
  await userEvent.type(name, 'NewNumber');

  const button = await screen.findByLabelText('category');
  await userEvent.click(button);

  const vehicles = await screen.findByLabelText('Vehicles');
  await userEvent.click(vehicles);

  const type = await screen.findByLabelText('type');
  await userEvent.click(type);

  const number = await screen.findByLabelText('number');
  await userEvent.click(number);

  const min = await screen.getByLabelText('min');
  await userEvent.type(min, '1');

  const max = await screen.getByLabelText('max');
  await userEvent.type(max, '5');

  const step = await screen.getByLabelText('step');
  await userEvent.type(step, '1');

  const symbol = await screen.getByLabelText('symbol');
  await userEvent.type(symbol, 'ft');

  fireEvent.click(await screen.findByText('Submit'));

  await screen.findByLabelText('X0bZdioM65');
});

test('Create new attribute type set', async () => {
  localStorage.setItem(
    'user',
    `{"username":"molly_member","accessToken":"blergh","name":"Molly Member"}`,
  );

  await renderView();
  fireEvent.click(await screen.findByText('Add Attribute'));
  const name = await screen.getByLabelText('name');

  attributes = attributes.concat({
    id: 'X0bZdioM62',
    name: 'New select',
    category: 'vehicles',
    type: 'set',
    values: ['good'],
    min: 0,
    max: 0,
    step: 0,
    symbol: '',
  });
  await userEvent.type(name, 'New');

  const button = await screen.findByLabelText('category');
  await userEvent.click(button);

  const vehicles = await screen.findByLabelText('Vehicles');
  await userEvent.click(vehicles);

  const type = await screen.findByLabelText('type');
  await userEvent.click(type);

  const set = await screen.findByLabelText('set');
  await userEvent.click(set);

  const selection = await screen.getByLabelText('selection');
  await userEvent.type(selection, 'bad');


  const add = await screen.findByLabelText('add-selection');
  await userEvent.click(add);

  await fireEvent.click(await screen.findByLabelText('remove-bad'));

  await userEvent.type(selection, 'good');

  await userEvent.click(add);


  fireEvent.click(await screen.findByText('Submit'));

  await screen.findByLabelText('X0bZdioM62');
});

test('failed new attribute type color', async () => {
  localStorage.setItem(
    'user',
    `{"username":"molly_member","accessToken":"blergh","name":"Molly Member"}`,
  );

  await renderView();
  let alerted = false;
  window.alert = () => {
    alerted = true;
  };
  fireEvent.click(await screen.findByText('Add Attribute'));
  const name = await screen.getByLabelText('name');
  await userEvent.type(name, 'Not');

  const button = await screen.findByLabelText('category');
  await userEvent.click(button);

  const vehicles = await screen.findByLabelText('Vehicles');
  await userEvent.click(vehicles);

  const type = await screen.findByLabelText('type');
  await userEvent.click(type);

  const color = await screen.findByLabelText('color');
  await userEvent.click(color);

  fireEvent.click(await screen.findByText('Submit'));

  await waitFor(() => {
    expect(alerted).toBe(true);
  });
});

test('Create new attribute type set adding a doublicate to selectiong', async () => {
  localStorage.setItem(
    'user',
    `{"username":"molly_member","accessToken":"blergh","name":"Molly Member"}`,
  );

  await renderView();
  fireEvent.click(await screen.findByText('Add Attribute'));

  const type = await screen.findByLabelText('type');
  await userEvent.click(type);

  const set = await screen.findByLabelText('set');
  await userEvent.click(set);

  const selection = await screen.getByLabelText('selection');
  await userEvent.type(selection, 'bad');

  const add = await screen.findByLabelText('add-selection');
  await userEvent.click(add);

  await userEvent.type(selection, 'bad');

  await userEvent.click(add);
});
