import { render, screen, fireEvent } from '@testing-library/react';
import { CssVarsProvider } from '@mui/joy/styles';
import '../matchMedia';
import { setupServer } from 'msw/node';
import { graphql } from 'msw';

import Dashboard from '../../../pages/dashboard';

jest.mock('next/router', () => ({
  push: jest.fn(),
}));

const handlers = [
  graphql.query('getAllCategories', async (req, res, ctx) => {
    return res(
      ctx.data({
        category: [
          {
            name: 'Vehicles',
            slug: 'vehicles',
          },
        ],
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
      <Dashboard />
    </CssVarsProvider>,
  );
};

test('Render page', async () => {
  await renderView();
});

test('Clicks on sidebar', async () => {
  renderView();
  const sidebar = await screen.findByText('Category');
  fireEvent.click(sidebar);
});


test('Shows differnt menu', async () => {
  renderView();
  fireEvent.click(screen.getByText('Welcome to the dashboard'));
  const sidebar = await screen.findByText('Category');
  fireEvent.click(sidebar);
  expect(screen.queryByText('Welcome to the dashboard')).not.toBeInTheDocument();
  fireEvent.click(screen.getByText('All Categories'));
});