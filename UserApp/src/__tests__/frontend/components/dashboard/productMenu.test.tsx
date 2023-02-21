import { fireEvent, render, screen } from '@testing-library/react';
import ProductMenu from '../../../../components/dashboard/ProductMenu';
import { graphql } from 'msw';
import { AppContextProvider } from '../../../../context';
import { CssVarsProvider } from '@mui/joy';
import '../../matchMedia';

const handlers = [
  graphql.query('getAllProducts', async (req, res, ctx) => {
    const { username } = req.variables;

    if (username === 'molly_member') {
      return res(
        ctx.data({
          product: [
            {
              id: '2759559e-84f2-4c41-9512-932589163f4f',
              user: 'molly_member',
              category: 'Toys',
              name: 'Honda Toy Car',
              price: 40,
              discount: 0,
              quantity: 34,
              date: '2023-01-21T21:43:08.000Z',
              pictures: [
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

const renderView = async () => {
  localStorage.setItem('user', `{"username": "molly_member", "accessToken": "blergh"}`);
  render(
    <CssVarsProvider>
      <AppContextProvider>
        <ProductMenu />
      </AppContextProvider>
    </CssVarsProvider>,
  );
};

test('Renders Product Menu', async () => {
  await renderView();
  await screen.getByText('Products');
});

test('Click new button', async () => {
  await renderView();
  fireEvent.click(screen.getByText('Add Product'));
});
