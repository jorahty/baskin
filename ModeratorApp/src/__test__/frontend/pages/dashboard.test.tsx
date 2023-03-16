import { render } from '@testing-library/react';
import { CssVarsProvider } from '@mui/joy/styles';
import '../matchMedia';

import { setupServer } from 'msw/node';
import { graphql } from 'msw';

import Dashboard, { getServerSideProps } from '../../../pages/dashboard';

const server = setupServer(
  graphql.query('ListProducts', (req, res, ctx) => {
    return res(
      ctx.data({
        product: [{
          id: 'string',
          user: 'string',
          category: 'string',
          name: 'string',
          price: 0,
          discount: 0,
          quantity: 0,
          description: 'string',
          date: 'string',
          images: [],
          attributes: [],
        }],
      }),
    );
  }),
);

beforeAll(() => { server.listen(); });
afterAll(() => { server.close(); });

const renderView = async () => {
  const { props } = await getServerSideProps();
  render(
    <CssVarsProvider>
      <Dashboard products={props.products}/>
    </CssVarsProvider>,
  );
};

test('Render page', async () => {
  await renderView();
});