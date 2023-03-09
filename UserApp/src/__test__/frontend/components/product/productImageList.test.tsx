import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import ProductImageList from '../../../../components/common/ProductImageList';
import { afterEach } from 'jest-circus';
import { addImage } from './productImage';
import { Product } from '@/graphql/product/schema';
import userEvent from '@testing-library/user-event';

const handleFileUpload = jest.fn();

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

test('Add Supported Image - PNG - Then Nothing', async () => {
  await renderView();

  await addImage('ucsc-logo.png', 'png');
  expect(handleFileUpload).toHaveBeenCalled();

  // const file = new File([], 'imageName.jpeg', { type: `image/${imageType}` });

  // Get the input button
  const input = screen.getByLabelText('add product image');
  await userEvent.upload(input, []);
});

test('OK - With Product', async () => {
  const product: Product = {
    id: '0ce2da04-d05d-46cf-8602-ae58ab7ec215',
    user: 'molly_member',
    category: 'apparel',
    name: 'Surfboard',
    price: 400,
    discount: 0,
    quantity: 120,
    description: 'Brand new.',
    date: '2022-02-09T00:15:08.000Z',
    pictures: ['6d1dd747-8172-4dd1-88b9-093dde1ba612'],
  };

  localStorage.setItem(
    'user',
    '{"accessToken":"whatever","name":"molly","email":"molly_admin@ucsc.edu"}',
  );
  await renderView(product);

  const deleteButton = screen.getByLabelText('existing-remove-0');
  fireEvent.click(deleteButton);
});
