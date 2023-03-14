import { render, screen, fireEvent, act } from '@testing-library/react';
import { CssVarsProvider } from '@mui/joy/styles';
import { graphql } from 'msw';
import { setupServer } from 'msw/node';
import 'whatwg-fetch';
import '../matchMedia';

import IndexPage from '../../../pages/index';
import { getServerSideProps } from '../../../pages/index';
import { AppContextProvider } from '../../../context';

const handlers = [
  graphql.query('ListProducts', async (req, res, ctx) => {
    return res(
      ctx.data({
        product: [{
          id: 'X0bZdiabca',
          user: 'molly_member',
          category: 'clothing',
          name: 'Air Jordan 15',
          price: 250,
          date: '2023-02-09T06:43:08.000Z',
          discount: 0,
          quantity: 1,
          description: 'Never worn',
          images: [
            'https://images.pexels.com/whatever',
          ],
          attributes: [
            { id: '1', name: 'Condition', value: 'New' },
          ],
        }],
      }),
    );
  }),
  graphql.query('ListCategories', async (req, res, ctx) => {
    return res(
      ctx.data({
        category: [{
          slug: 'cars',
          name: 'Cars',
        },
        {
          slug: 'electronics',
          name: 'Electronics',
        }],
      }),
    );
  }),
  graphql.query('CategoryChildren', async (req, res, ctx) => {
    return res(
      ctx.data({
        categoryChildren: [{
          slug: 'cars',
          name: 'Cars',
        },
        {
          slug: 'electronics',
          name: 'Electronics',
        }],
      }),
    );
  }),
];

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterAll(() => server.close());

jest.mock('next/router', () => ({
  useRouter() {
    return {

    };
  },
  push: jest.fn(),
}));

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
  const { props } = await getServerSideProps({
    locale: 'en',
    category: 'cars',
  } as any) as any; // eslint-disable-line @typescript-eslint/no-explicit-any
  render(
    <CssVarsProvider>
      <AppContextProvider>
        <IndexPage
          locale={props.locale}
          category={props.category}
        />
      </AppContextProvider>
    </CssVarsProvider>
  );
};

test('Renders', async () => {
  await renderView();
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
