import { render, screen, fireEvent } from '@testing-library/react';
import ProductCard from '../../../../components/product/card';
import { AppContextProvider } from '../../../../context';
import 'whatwg-fetch';
import '../../matchMedia';

const product = {
  user: 'string',
  id: 'string',
  category: 'string',
  name: 'string',
  price: 0,
  quantity: 90,
  description: 'string',
  date: 'string',
  images: [
    'https://images.pexels.com/photos/930398/pexels-photo-930398.jpeg?auto=compress&cs=tinysrgb&w=1600',
  ],
  discount: 0,
  attributes: [
    { id: '1', name: 'Condition', value: 'New' },
    { id: '1', name: 'Condition', value: '#ff0000' },
  ],
};

const renderView = async () => {
  render(
    <AppContextProvider>
      <ProductCard product={product} />
    </AppContextProvider>
  );
};

test('Renders', async () => {
  renderView();
});

test('Render Discount', async () => {
  product.discount = 0.2;
  renderView();
});

test('Click Save', async () => {
  renderView();
  const save = await screen.findByLabelText('Save');
  fireEvent.click(save);
  fireEvent.click(save);
});

test('Already Saved', async () => {
  localStorage.setItem('undefined-saved', '[]');
  renderView();
});
