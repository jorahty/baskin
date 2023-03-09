import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import EditAttributeModal from '../../../../components/attribute/EditAttributeModal';
import { AppContextProvider } from '../../../../context';
import { graphql } from 'msw';
import { CssVarsProvider } from '@mui/joy';
import '../../matchMedia';
import { setupServer } from 'msw/node';
import { Attribute } from '@/graphql/attribute/schema';

const categories = [
  {
    slug: 'vehicles',
  },
  {
    slug: 'trucks',
  },
];

let attribute:Attribute = {
  name: 'Condition',
  category: 'trucks',
  id: 'X0bZdioM6D',
  type: 'set',
  values: ['new'],
  min: undefined,
  max: undefined,
  step: undefined,
  symbol: '',
};

const handlers = [
  graphql.query('getAllCategories', async (req, res, ctx) => {
    return res(
      ctx.data({
        category: categories,
      }),
    );
  }),
  graphql.mutation('editAttribute', async (req, res, ctx) => {
    const json = await req.json();
    if (json.query.indexOf('set') >= 0) {
      return res(
        ctx.data({
          id: 'X0bZdioM61',
          name: 'Condition',
          category: 'vehicles',
          type: 'set',
          values: ['bad'],
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
  const setOpen = () => null;
  const open = true;

  render(
    <CssVarsProvider>
      <AppContextProvider>
        <EditAttributeModal attribute={attribute}  setOpen={setOpen} open={open}/>
      </AppContextProvider>
    </CssVarsProvider>,
  );
};

test('Renders Edit Attribute Modal', async () => {
  localStorage.setItem(
    'user',
    `{"username":"molly_member","accessToken":"blergh","name":"Molly Member"}`,
  );

  await renderView();
  await screen.findByText('Edit attribute');
});

test('Edit attribute', async () => {
  localStorage.setItem(
    'user',
    `{"username":"molly_member","accessToken":"blergh","name":"Molly Member"}`,
  );

  await renderView();
  const button = await screen.findByLabelText('category');
  await userEvent.click(button);

  const vehicles = await screen.findByLabelText('vehicles');
  await userEvent.click(vehicles);

  const type = await screen.findByLabelText('type');
  await userEvent.click(type);

  const number = await screen.findByLabelText('number');
  await userEvent.click(number);

  await userEvent.click(type);

  const set = await screen.findByLabelText('set');
  await userEvent.click(set);

  await fireEvent.click(await screen.findByLabelText('remove-new'));

  const selection = await screen.getByLabelText('selection');
  await userEvent.type(selection, 'bad');

  const add = await screen.findByLabelText('add-selection');
  await userEvent.click(add);

  fireEvent.click(await screen.findByText('Edit'));
});

test('Edit attribute failed request', async () => {
  localStorage.setItem(
    'user',
    `{"username":"molly_member","accessToken":"blergh","name":"Molly Member"}`,
  );

  await renderView();
  let alerted = false;
  window.alert = () => {
    alerted = true;
  };
  const type = await screen.findByLabelText('type');
  await userEvent.click(type);

  const number = await screen.findByLabelText('number');
  await userEvent.click(number);

  const selection = await screen.getByLabelText('selection');
  await userEvent.type(selection, 'new');

  const add = await screen.findByLabelText('add-selection');
  await userEvent.click(add);

  fireEvent.click(await screen.findByText('Edit'));
  await waitFor(() => {
    expect(alerted).toBe(true);
  });
});

test('Edit attribute with number type', async () => {
  localStorage.setItem(
    'user',
    `{"username":"molly_member","accessToken":"blergh","name":"Molly Member"}`,
  );
  attribute = {
    id: 'X0bZdioM6D',
    name: 'Bathrooms',
    category: 'trucks',
    type: 'number',
    min: 0,
    max: 20,
    step: 0,
    symbol: 'ft',
    values: undefined,
  };
  await renderView();


  const selection = await screen.getByLabelText('step');
  await userEvent.type(selection, '1');

  fireEvent.click(await screen.findByText('Edit'));

});

test('Cancel when editing a new attribute', async () => {
  localStorage.setItem(
    'user',
    `{"username":"molly_member","accessToken":"blergh","name":"Molly Member"}`,
  );

  await renderView();

  fireEvent.click(await screen.findByText('Cancel'));
});

test('Escape when editing a new attribute', async () => {
  localStorage.setItem(
    'user',
    `{"username":"molly_member","accessToken":"blergh","name":"Molly Member"}`,
  );

  await renderView();

  fireEvent.keyDown(screen.getByText('Cancel'), {
    key: 'Escape',
    code: 'Escape',
    keyCode: 27,
    charCode: 27,
  });
});