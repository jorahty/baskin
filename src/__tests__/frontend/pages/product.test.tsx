import ProductPage, {getServerSideProps} from '../../../pages/product/[id]';
import { render, screen } from '@testing-library/react'
import { CssVarsProvider } from '@mui/joy/styles';
import {graphql} from "msw";
import {setupServer} from "msw/node";
import '../matchMedia';

const product = {
  "name": "Air Jordan 11",
  "date": "2023-02-09T06:43:08.000Z",
  "id": "038b7e70-a5c0-47e6-80f3-5b1772bb4a0d",
  "price": 250,
  "category": "clothing",
  "user": "molly_member",
  "quantity": 1,
  "description": "Never worn"
};

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

const handlers = [

  graphql.query('product', async (req, res, ctx) => {
    const { id } = req.variables;

    if ( id === '038b7e70-a5c0-47e6-80f3-5b1772bb4a0e' ) {

      return res(
        ctx.data({
          product: [product]
        }),
      );

    } else {
      // Error!?
    }
  }),

];

const server = setupServer(...handlers)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

jest.mock('next/router', () => ({
  useRouter() {
    return ({
      query: { id: '123' },
    });
  },
}));


const renderView = async () => {
  const { props } = await getServerSideProps({
    req: { headers: {} },
    query: { id: '038b7e70-a5c0-47e6-80f3-5b1772bb4a0e' },
    res: {},
    resolvedUrl: ''
  });

  render(
    <CssVarsProvider>
      <ProductPage product={props.product}/>
    </CssVarsProvider>
  );
};

test('Renders', async () => {
  await renderView();
  await screen.findByText(product.description);
  await screen.findByText(product.name);
  await screen.findByText(formatter.format(product.price));
  await screen.findByText(product.category);
  await screen.findByText(`Seller: ${product.user}`);
});

test('Click the buy button', async () => {
  await renderView();
  const button = await screen.getByText("Add to Cart!");
  await button.click();
});
