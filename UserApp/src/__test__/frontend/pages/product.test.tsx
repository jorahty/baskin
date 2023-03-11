import ProductPage, { getServerSideProps } from '../../../pages/product/[id]';
import { render, screen, cleanup, fireEvent, waitFor } from '@testing-library/react';
import { CssVarsProvider } from '@mui/joy/styles';
import '../matchMedia';
import { setupServer } from 'msw/node';
import { graphql } from 'msw';

jest.mock('../../../context', () => ({
  useAppContext: () => ({
    signIn: jest.fn(),
    signOut: jest.fn(),
    signedInUser: {
      name: 'Anna Admin',
      username: 'anna_admin',
      accessToken: 'whatever',
    },
  }),
}));

const product = {
  name: 'Air Jordan 11',
  date: '2023-02-09T06:43:08.000Z',
  id: '038b7e70-a5c0-47e6-80f3-5b1772bb4a0d',
  price: 250,
  discount: 0,
  category: 'clothing',
  user: 'molly_member',
  quantity: 1,
  description: 'Never worn',
};

const discountProduct = {
  name: 'Baseballs',
  date: '2022-01-21T15:43:08.000Z',
  id: '2759559e-84f2-4c41-9512-932589163f4f',
  price: 2,
  discount: 0.2,
  category: 'toys',
  user: 'molly_member',
  quantity: 40,
  description: 'something not too long',
  images: ['https://images.pexels.com/whatever'],
  attributes: [
    { id: '1', name: 'Condition', value: 'New' },
    { id: '2', name: 'Color', value: '#ffffff' },
  ],
};

jest.mock('next/router', () => ({
  useRouter() {
    return {
      query: { id: '123' },
    };
  },
  push: jest.fn(),
  pathname: '',
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
  graphql.query('ListProducts', async (req, res, ctx) => {
    const { id } = req.variables;
    if (id === '2759559e-84f2-4c41-9512-932589163f4f')
      return res(
        ctx.data({
          product: [discountProduct],
        })
      );
    return res(
      ctx.data({
        product: [
          {
            id: '038b7e70-a5c0-47e6-80f3-5b1772bb4a0d',
            user: 'molly_member',
            category: 'clothing',
            name: 'Air Jordan 11',
            price: 250,
            date: '2023-02-09T06:43:08.000Z',
            discount: 0,
            quantity: 1,
            description: 'Never worn',
            images: ['https://images.pexels.com/whatever'],
            attributes: [
              { id: '1', name: 'Condition', value: 'New' },
              { id: '2', name: 'Color', value: '#ffffff' },
            ],
          },
        ],
      })
    );
  }),
  graphql.mutation('addChat', async (req, res, ctx) => {
    return res(
      ctx.data({
        addChat: {
          id: '038b7e70-a5c0-47e6-80f3-5b1772bb4a0g',
          name: 'Air Jordan 11',
        },
      })
    );
  }),
  graphql.mutation('addChatMember', async (req, res, ctx) => {
    const username = req.variables.username;
    if (username === 'anna_admin') {
      return res(
        ctx.data({
          addChatMember: {
            username: 'anna_admin',
          },
        })
      );
    }
    return res(
      ctx.data({
        addChatMember: {
          username: 'molly_member',
        },
      })
    );
  }),
  graphql.mutation('sendMessage', async (req, res, ctx) => {
    return res(
      ctx.data({
        sendMessage: {
          sender: 'anna_admin',
          content: 'Hey is this available?',
          date: new Date().toISOString(),
        },
      })
    );
  }),
];

const server = setupServer(...handlers);

beforeAll(() => server.listen());
beforeEach(() => {
  // Removes render
  cleanup();
  // Removes localStorage
  localStorage.clear();
});
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const renderView = async (id: string) => {
  const { props } = (await getServerSideProps({
    query: { id },
  } as any)) as any; // eslint-disable-line @typescript-eslint/no-explicit-any

  render(
    <CssVarsProvider>
      <ProductPage product={props.product} locale={props.locale} />
    </CssVarsProvider>
  );
};

const renderDiscountView = async () => {
  const { props } = (await getServerSideProps({
    query: { id: '2759559e-84f2-4c41-9512-932589163f4f' },
    locale: 'en',
  } as any)) as any; // eslint-disable-line @typescript-eslint/no-explicit-any

  render(
    <CssVarsProvider>
      <ProductPage product={props.product} locale={props.locale} />
    </CssVarsProvider>
  );
};

test('Renders', async () => {
  await renderView('038b7e70-a5c0-47e6-80f3-5b1772bb4a0d');
  await screen.findByText(product.name);
  await screen.findByText('$' + product.price.toFixed(2));
  await screen.findByText(product.category);
  await screen.findByText(`${product.user}`);
});

test('Renders (Discount Item)', async () => {
  const price = discountProduct.price - discountProduct.discount * discountProduct.price;
  await renderDiscountView();
  await screen.findByText(discountProduct.name);
  await screen.findByText('$' + price.toFixed(2));
  await screen.findByText(discountProduct.category);
  await screen.findByText(`${discountProduct.user}`);
});

test('Send User Message', async () => {
  await renderView('038b7e70-a5c0-47e6-80f3-5b1772bb4a0d');
  await screen.findByText('Send');
  fireEvent.click(screen.getByText('Send'));
  await waitFor(() => {
    expect(screen.getByText('Sent')).toBeDefined();
  });
});
