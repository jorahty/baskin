import { render } from '@testing-library/react';
import ProductDetails from '../../../../components/product/details';
import { Product } from '../../../../graphql/product/schema';

const product: Product = {
  user: 'string',
  id: 'string',
  category: 'string',
  name: 'string',
  price: 0,
  quantity: 90,
  description: 'string',
  date: 'string',
  discount: 20,
  images: ['https://images.pexels.com/photos/11108129/pexels-photo-11108129.jpeg'],
  attributes: [
    { id: '1', name: 'Condition', value: 'New' },
    { id: '2', name: 'Color', value: '#ffffff' },
  ],
};

const renderView = async () => {
  render(<ProductDetails product={product} />);
};

test('Renders', async () => {
  await renderView();
});

// test('Button Timeout', async () => {
//   const component = shallow(<ProductDetails product={product} />);
//   jest.useFakeTimers();
//   expect(component.state("index")).toEqual(0);
//   component.instance().setTimeoutFn();
//   jest.advanceTimersByTime(1000);
//   expect(component.state("index")).toEqual(1);
//   jest.useRealTimers();
// });
