import { render, screen, fireEvent, act } from '@testing-library/react';
import { CssVarsProvider } from '@mui/joy/styles';
import { graphql } from 'msw';
import { setupServer } from 'msw/node';
import 'whatwg-fetch';
import '../matchMedia';

import IndexPage from '../../../pages/index';
import { getServerSideProps } from '../../../pages/index';

const handlers = [
  graphql.query('IndexPage', async (req, res, ctx) => {
    return res(
      ctx.data({
        category: [{
          slug: 'vehicles',
          name: 'Vehicles',
        }, {
          slug: 'apparel',
          name: 'Apparel',
        }],
        product: [{
          id: '038b7e70-a5c0-47e6-80f3-5b1772bb4a0d',
          user: 'molly_member',
          category: 'clothing',
          name: 'Air Jordan 15',
          price: 250,
          date: '2023-02-09T06:43:08.000Z',
          discount: 0,
          quantity: 1,
          description: 'Never worn',
          pictures: [
            'https://images.pexels.com/whatever',
          ],
        }],
      }),
    );
  }),
];

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

jest.mock('next/router', () => ({
  useRouter() {
    return {
      query: { id: '123' },
    };
  },
}));

const renderView = async () => {
  const { props } = await getServerSideProps(
    { req: { headers: { host: 'localhost:3000' } } });
  render(
    <CssVarsProvider>
      <IndexPage
        categories={props.categories}
        products={props.products}
      />
    </CssVarsProvider>
  );
};

test('Renders', async () => {
  renderView();
  await new Promise(resolve => setTimeout(resolve, 500));
});

function setWidth(width: number) {
  global.innerWidth = width;
  act(() => {
    global.dispatchEvent(new Event('resize'));
  });
}

test('Resize Layout and Open Mobile Menu', async () => {
  renderView();
  await screen.findByLabelText(/menu-icon/i);
  setWidth(550);
  fireEvent.click(screen.getByRole('button', { name: /menu-icon/i }));
});
