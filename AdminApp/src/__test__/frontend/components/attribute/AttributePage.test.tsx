import { render, screen } from '@testing-library/react';
import { AppContextProvider } from '../../../../context';
import { graphql } from 'msw';
import { CssVarsProvider } from '@mui/joy';
import '../../matchMedia';
import { setupServer } from 'msw/node';
import AttributePage from '../../../../components/attribute/AttributePage';

const attributes = [
  {
    id: '0ce2da04-d05d-46cf-8602-ae58ab7ecaaa',
    name: 'Bathrooms',
    category: 'propert',
    type: 'number',
    min: 0,
    max: 20,
  },
  {
    id: '0ce2da04-d05d-46cf-8602-ae58ab7ecaab',
    name: 'Condition',
    category: 'property',
    type: 'set',
    values: ['new', 'used'],
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

test('Renders Categories page', async () => {
  localStorage.setItem(
    'user',
    `{"username":"molly_member","accessToken":"blergh","name":"Molly Member"}`,
  );

  await renderView();
  await screen.findByText('Bathrooms');
});