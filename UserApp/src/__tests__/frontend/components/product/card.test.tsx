import { render } from '@testing-library/react';
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
  pictures: [
    'https://images.pexels.com/photos/930398/pexels-photo-930398.jpeg?auto=compress&cs=tinysrgb&w=1600',
  ],
  discount: 0,
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
