import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import ProductImageList from '../../../../components/common/ProductImageList';
import { afterEach } from 'jest-circus';
import { addImage } from './productImage';

const handleFileUpload = jest.fn();

afterEach(() => {
  handleFileUpload.mockReset();
});
const renderView = async () => {
  return render(<ProductImageList updatedImages={handleFileUpload} />);
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
