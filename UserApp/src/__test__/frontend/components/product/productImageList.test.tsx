import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import ProductImageList from '../../../../components/common/ProductImageList';
import { afterEach } from 'jest-circus';
import { addImage } from './productImage';
import { Product } from '@/graphql/product/schema';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

const handleFileUpload = jest.fn();

const product: Product = {
  id: '038b7e70-a5c0-47e6-80f3-5b1772bb4a0d',
  user: 'molly_member',
  category: 'toys',
  name: 'Honda Civic Toy Car',
  price: 23,
  discount: 0,
  quantity: 23,
  images: [
    '038b7e70-a5c0-47e6-80f3-5b1772bb4a0d',
    '038b7e70-a5c0-47e6-80f3-5b1772bb4a1d',
  ],
  description: 'something',
  date: '2022-07-28T01:00:08.000Z',
  attributes: [],
};

const handlers = [
  rest.delete('http://localhost:4001/api/v0/image/:id', (req, res, ctx) => {
    return res(ctx.json({ login: req.params.login }));
  })
];

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterAll(() => server.close());

afterEach(() => {
  handleFileUpload.mockReset();
});

const renderView = async (product?: Product) => {
  return render(<ProductImageList updatedImages={handleFileUpload} product={product} />);
};

test('OK', async () => {
  localStorage.setItem(
    'user',
    '{"accessToken":"whatever","name":"molly","email":"molly_admin@ucsc.edu"}',
  );
  await renderView();
});

test('Add image', async () => {
  await renderView();

  await addImage('valid.jpeg', 'jpeg');
  expect(handleFileUpload).toHaveBeenCalled();
  fireEvent.click(screen.getByLabelText('remove0'));
});

test('Add image and Remove', async () => {
  await renderView();

  await addImage('valid.jpeg', 'jpeg');
  expect(handleFileUpload).toHaveBeenCalled();

  fireEvent.click(screen.getByLabelText('remove0'));
  expect(handleFileUpload).toHaveBeenCalled();
});

test('Add Large Image', async () => {
  const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => null);

  await renderView();

  await addImage('invalid.jpg', 'jpeg');

  await waitFor(() => {
    expect(alertMock).toHaveBeenCalledWith('File too large!');
  });
});

test('Add Unsupported Image', async () => {
  const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => null);

  await renderView();

  await addImage('earth.gif', 'gif');

  await waitFor(() => {
    expect(alertMock).toHaveBeenCalledWith('Image type not supported.');
  });
});

test('Add Supported Image - PNG', async () => {
  await renderView();

  await addImage('ucsc-logo.png', 'png');
  expect(handleFileUpload).toHaveBeenCalled();
});

test('OK - Render Product', async () => {
  localStorage.setItem(
    'user',
    '{"accessToken":"whatever","name":"molly","email":"molly_admin@ucsc.edu"}',
  );
  await renderView(product);
});

test('Add Supported Image - PNG - Then None', async () => {
  await renderView();

  await addImage('ucsc-logo.png', 'png');
  expect(handleFileUpload).toHaveBeenCalled();

  // Get the input button
  const input = screen.getByLabelText('add product image');
  await userEvent.upload(input, []);
});

test('Delete existing picture', async () => {
  await renderView(product);
  fireEvent.click(screen.getByLabelText('existing-remove-0'));
});
