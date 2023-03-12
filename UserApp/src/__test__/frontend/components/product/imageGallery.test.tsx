import { Product } from '@/graphql/product/schema';
import { render, screen } from '@testing-library/react';
import ImageGallery from '../../../../components/product/ImageGallery';
import userEvent from '@testing-library/user-event';

const product: Product = {
  id: 'X0bZdiabca',
  user: 'molly_member',
  category: 'apparel',
  name: 'Air Jordan 15',
  price: 250,
  discount: 0,
  quantity: 1,
  description: 'Never worn.',
  date: '2023-02-09T06:43:08.000Z',
  images: [
    'acc44792-f0f3-4970-8dda-d20c0423c305',
    '4753ffeb-56a2-42c5-9cac-2237900cc825',
    '0bf9f3cf-66eb-4f33-be64-1d5214a78351',
    'e64a7015-da60-40b0-803a-ade19d4b2edf',
  ],
  attributes: [],
};

const renderView = async () => {
  render(<ImageGallery product={product} />);
};

test('OK', async () => {
  await renderView();
  const mainImageWrapper = screen.getByLabelText('Main Image');
  const mainImage = mainImageWrapper.querySelector('img');
  expect(mainImage).not.toBeNull();
  const mainImageSource = mainImage?.getAttribute('src');
  expect(mainImageSource).toContain(product.images[0]);
});

test('Changing product image', async () => {
  await renderView();
  const otherImage = screen.getByLabelText('image-2');
  await userEvent.click(otherImage);

  const mainImageWrapper = screen.getByLabelText('Main Image');
  const mainImage = mainImageWrapper.querySelector('img');
  expect(mainImage).not.toBeNull();
  const mainImageSource = mainImage?.getAttribute('src');
  expect(mainImageSource).toContain(product.images[1]);
});
