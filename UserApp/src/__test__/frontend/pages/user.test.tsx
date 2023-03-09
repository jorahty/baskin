import { render, screen } from '@testing-library/react';
import { CssVarsProvider } from '@mui/joy/styles';
import '../matchMedia';
import { graphql } from 'msw';
import { setupServer } from 'msw/node';

import UserPage from '../../../pages/user/[username]';
import { getServerSideProps } from '../../../pages/user/[username]';
import { AppContextProvider } from '../../../context';

jest.mock('next/router', () => ({
  useRouter() {
    return {
      query: { username: '123' },
    };
  },
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

const handlers = [
  graphql.query('listUser', async (req, res, ctx) => {
    return res(ctx.data({
      user: [{
        username: 'johndoes1',
        name: 'Molly Member',
        email: 'jd@books.com',
      }],
    },
    ));
  }),
  graphql.query('ListProducts', async (req, res, ctx) => {
    return res(
      ctx.data({
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
          images: [
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

const renderView = async () => {
  const { props } = await getServerSideProps({
    query: { username: 'molly_member' },
  } as any) as any; // eslint-disable-line @typescript-eslint/no-explicit-any
  render(
    <CssVarsProvider>
      <AppContextProvider>
        <UserPage user={props.user} products={props.products} />
      </AppContextProvider>
    </CssVarsProvider>
  );
};

test('Renders', async () => {
  renderView();
  await screen.findByText(`Molly Member`);
});
