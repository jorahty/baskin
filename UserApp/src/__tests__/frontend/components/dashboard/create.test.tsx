import { CssVarsProvider } from '@mui/joy/styles';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { graphql } from 'msw';
import { setupServer } from 'msw/node';
import 'whatwg-fetch';
import '../../matchMedia';

import Create from '../../../../components/dashboard/product/Create';
import { AppContextProvider } from '../../../../context';

const handlers = [
  graphql.mutation('create', async (req, res, ctx) => {
    const json = await req.json();
    if (json.query.indexOf('electronics') >= 0) {
      return res(
        ctx.data({
          create: {
            id: '11111',
          },
        }),
      );
    } else {
      return res(
        ctx.errors([
          {
            message: 'Unexpected error.',
          },
        ]),
      );
    }
  }),
  graphql.query('getAllCategories', async (req, res, ctx) => {
    return res(
      ctx.data({
        category: [
          {
            name: 'Electronics',
            slug: 'electronics',
          },
          {
            name: 'Toys',
            slug: 'toys',
          },
        ],
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
      query: { slug: 'toys' },
    };
  },
  push: jest.fn(),
}));

const renderView = async () => {
  render(
    <CssVarsProvider>
      <AppContextProvider>
        <Create />
      </AppContextProvider>
    </CssVarsProvider>,
  );
};

test('Renders', async () => {
  localStorage.setItem(
    'user',
    '{"accessToken":"whatever","name":"molly","email":"molly_admin@ucsc.edu"}',
  );
  await renderView();
  await screen.findByText('Create New Product');
});

test('Click Cancel', async () => {
  localStorage.setItem(
    'user',
    '{"accessToken":"whatever","name":"molly","email":"molly_admin@ucsc.edu"}',
  );
  await renderView();
  await screen.findByText('Create New Product');
  fireEvent.click(screen.getByLabelText('cancel'));
});

test('Click create', async () => {
  localStorage.setItem(
    'user',
    '{"accessToken":"whatever","name":"molly","email":"molly_admin@ucsc.edu"}',
  );
  await renderView();
  let alerted = false;
  window.alert = () => {
    alerted = true;
  };
  await screen.findByText('Create New Product');

  const button = await screen.findByLabelText('category');
  await userEvent.click(button);

  const electronics = await screen.findByText('Electronics');
  await userEvent.click(electronics);

  const name = await screen.getByPlaceholderText('Vintage Hoodie Sweatshirt');
  await userEvent.type(name, 'new');

  const price = screen.getByPlaceholderText('Amount');
  await userEvent.type(price, '1.50');

  const quantity = screen.getByPlaceholderText('1');
  await userEvent.type(quantity, '1');

  const description = screen.getByPlaceholderText('Product description');
  await userEvent.type(description, 'great product');

  await userEvent.click(await screen.findByLabelText('add'));
  const url = await screen.getByLabelText('picture');
  await userEvent.type(
    url,
    'https://images.pexels.com/photos/930398/pexels-photo-930398.jpeg?auto=compress&cs=tinysrgb&w=1600',
  );
  fireEvent.click(screen.getByLabelText('submit'));
  fireEvent.click(screen.getByLabelText('create'));

  await waitFor(() => {
    expect(alerted).toBe(false);
  });
});

test('Click create invalid', async () => {
  localStorage.setItem(
    'user',
    '{"accessToken":"whatever","name":"molly","email":"molly_admin@ucsc.edu"}',
  );
  await renderView();
  let alerted = false;
  window.alert = () => {
    alerted = true;
  };
  await screen.findByText('Create New Product');
  const name = screen.getByPlaceholderText('Vintage Hoodie Sweatshirt');
  await userEvent.type(name, 'new');
  const price = screen.getByPlaceholderText('Amount');
  await userEvent.type(price, '1.50');
  const quantity = screen.getByPlaceholderText('1');
  await userEvent.type(quantity, '1');
  const description = screen.getByPlaceholderText('Product description');
  await userEvent.type(description, 'great product');
  await userEvent.click(screen.getByLabelText('category'));
  fireEvent.click(screen.getByLabelText('create'));
  await waitFor(() => {
    expect(alerted).toBe(true);
  });
});

test('Add image and remove', async () => {
  localStorage.setItem(
    'user',
    '{"accessToken":"whatever","name":"molly","email":"molly_admin@ucsc.edu"}',
  );
  await renderView();
  let alerted = false;
  window.alert = () => {
    alerted = true;
  };
  await screen.findByText('Create New Product');
  await userEvent.click(await screen.findByLabelText('add'));
  const url = await screen.getByLabelText('picture');
  await userEvent.type(
    url,
    'https://images.pexels.com/photos/930398/pexels-photo-930398.jpeg?auto=compress&cs=tinysrgb&w=1600',
  );
  await fireEvent.click(screen.getByLabelText('submit'));
  await fireEvent.click(screen.getByLabelText('remove0'));
  await waitFor(() => {
    expect(alerted).toBe(false);
  });
});

test('Add image and cancel', async () => {
  localStorage.setItem(
    'user',
    '{"accessToken":"whatever","name":"molly","email":"molly_admin@ucsc.edu"}',
  );
  await renderView();
  let alerted = false;
  window.alert = () => {
    alerted = true;
  };
  await screen.findByText('Create New Product');
  await userEvent.click(await screen.findByLabelText('add'));
  const url = await screen.getByLabelText('picture');
  await userEvent.type(
    url,
    'https://images.pexels.com/photos/930398/pexels-photo-930398.jpeg?auto=compress&cs=tinysrgb&w=1600',
  );
  fireEvent.keyDown(screen.getByText('Submit'), {
    key: 'Escape',
    code: 'Escape',
    keyCode: 27,
    charCode: 27,
  });
  await waitFor(() => {
    expect(alerted).toBe(false);
  });
});
