import { fireEvent, render, screen } from '@testing-library/react';
import ProductMenu from '../../../../components/dashboard/product/ProductMenu';
import { graphql } from 'msw';
import { AppContextProvider } from '../../../../context';
import { CssVarsProvider } from '@mui/joy';
import '../../matchMedia';
import { setupServer } from 'msw/node';

const handlers = [
  graphql.query('getAllProducts', async (req, res, ctx) => {
    const { username } = req.variables;

    if (username === 'molly_member') {
      return res(
        ctx.data({
          product: [
            {
              id: 'X0bZdiabcc',
              user: 'molly_member',
              category: 'Toys',
              name: 'Honda Toy Car',
              price: 40,
              discount: 0,
              quantity: 34,
              date: '2023-01-21T21:43:08.000Z',
              images: [
                'https://images.pexels.com/photos/51383/' +
                  'photo-camera-subject-photographer-51383.jp' +
                  'eg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
              ],
            },
          ],
        }),
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

jest.mock('react-i18next', () => ({
  // this mock makes sure any components using the translate hook can use it without a warning being shown
  useTranslation: () => {
    return {
      t: (str: string) => str,
      i18n: {
        changeLanguage: () => new Promise(() => null),
      },
    };
  },
  initReactI18next: {
    type: '3rdParty',
    init: () => null,
  },
}));

const renderView = async () => {
  render(
    <CssVarsProvider>
      <AppContextProvider>
        <ProductMenu />
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
  await screen.getByLabelText('Products');
  await screen.findByText('Honda Toy Car');
});

test('Click new button', async () => {
  localStorage.setItem(
    'user',
    `{"username":"molly_member","accessToken":"blergh","name":"Molly Member"}`,
  );

  await renderView();
  fireEvent.click(screen.getByLabelText('Add Product'));
});
