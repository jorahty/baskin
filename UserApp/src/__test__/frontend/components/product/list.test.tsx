import { render } from '@testing-library/react';
import ProductList from '../../../../components/product/list';

const products = [{
  user: 'string',
  id: 'string',
  category: 'string',
  name: 'string',
  price: 0,
  quantity: 1,
  description: 'string',
  date: new Date().toISOString(),
  discount: 0,
  pictures: [
    'https://images.pexels.com/photos' +
    '/930398/pexels-photo-930398.jpeg?auto=compress&cs=tinysrgb&w=1600',
  ],
}, {
  user: 'string',
  id: 'string',
  category: 'string',
  name: 'string',
  price: 1,
  quantity: 1,
  description: 'string',
  date: new Date().toISOString(),
  discount: 0,
  pictures: [
    'https://images.pexels.com/photos' +
    '/930398/pexels-photo-930398.jpeg?auto=compress&cs=tinysrgb&w=1600',
  ],
}];

jest.mock('react-i18next', () => ({
  // this mock makes sure any components using the translate hook can use it without a warning being shown
  useTranslation: () => {
    return {
      t: (str: string) => str,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
    };
  },
  initReactI18next: {
    type: '3rdParty',
    init: () => {},
  },
}));

const renderView = async () => {
  render(
    <ProductList products={products} />
  );
};

let sort = 'date-new';

jest.mock('../../../../context', () => ({
  useAppContext: () => ({
    refinement: {
      sort: sort,
    },
  }),
}));

test('Renders (By Newest)', async () => {
  renderView();
});

test('By Oldest', async () => {
  sort = 'date-old';
  renderView();
});

test('By Highest Price', async () => {
  sort = 'price-high';
  renderView();
});

test('By Lowest Price', async () => {
  sort = 'price-low';
  renderView();
});
