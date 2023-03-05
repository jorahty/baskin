import { useAppContext } from '../../../../context';
import { render } from '@testing-library/react';
import ProductList from '../../../../components/product/list';

const products = [{
  user: 'molly_member',
  id: '123',
  category: 'cars',
  name: 'Used Truck',
  price: 0,
  quantity: 1,
  description: 'Heavy-duty',
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

jest.mock('../../../../context');

const mockUseAppContext = useAppContext as jest.MockedFunction<typeof useAppContext>;

test('Renders (By Newest)', async () => {
  mockUseAppContext.mockReturnValue({
    refinement: {
      sort: 'date-new',
      search: '',
    },
  } as any); // eslint-disable-line @typescript-eslint/no-explicit-any
  renderView();
});

test('Renders (By Oldest)', async () => {
  mockUseAppContext.mockReturnValue({
    refinement: {
      sort: 'date-old',
      search: '',
    },
  } as any); // eslint-disable-line @typescript-eslint/no-explicit-any
  renderView();
});

test('Renders (By Highest Price)', async () => {
  mockUseAppContext.mockReturnValue({
    refinement: {
      sort: 'price-high',
      search: '',
    },
  } as any); // eslint-disable-line @typescript-eslint/no-explicit-any
  renderView();
});

test('Renders (By Lowest Price)', async () => {
  mockUseAppContext.mockReturnValue({
    refinement: {
      sort: 'price-low',
      search: '',
    },
  } as any); // eslint-disable-line @typescript-eslint/no-explicit-any
  renderView();
});

test('Search by name', async () => {
  mockUseAppContext.mockReturnValue({
    refinement: {
      sort: 'date-new',
      search: 'Used Truck',
    },
  } as any); // eslint-disable-line @typescript-eslint/no-explicit-any
  renderView();
});

test('Search by user', async () => {
  mockUseAppContext.mockReturnValue({
    refinement: {
      sort: 'date-new',
      search: 'molly_member',
    },
  } as any); // eslint-disable-line @typescript-eslint/no-explicit-any
  renderView();
});

test('Search by category', async () => {
  mockUseAppContext.mockReturnValue({
    refinement: {
      sort: 'date-new',
      search: 'cars',
    },
  } as any); // eslint-disable-line @typescript-eslint/no-explicit-any
  renderView();
});
