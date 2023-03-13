import { render, screen } from '@testing-library/react';
import OverviewPage from '../../../../components/OverviewPage';
import { AppContextProvider } from '../../../../context';
import { graphql } from 'msw';
import { CssVarsProvider } from '@mui/joy';
import '../../matchMedia';
import { setupServer } from 'msw/node';


const handlers = [
  graphql.query('getStats', async (req, res, ctx) => {
    return res(
      ctx.data({
        stat:
          {
            user: 7,
            message: 5,
            chat: 5,
            product: 5,
            attribute: 5,
            category: 5,
          },
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
        <OverviewPage />
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
  await screen.findByText('7');
});

