import { AppContextProvider } from '../../../../context';
import { render } from '@testing-library/react';
import CategoryControls from '../../../../components/category/controls';

const category = {
  name: null,
  ancestors: [],
  children: [],
  products: [],
  categories: [],
  attributes: [
    {
      id: '1',
      name: 'Condition',
      category: 'vehciles',
      type: 'set',
    },
    {
      id: '2',
      name: 'Color',
      category: 'vehciles',
      type: 'color',
    },
    {
      id: '3',
      name: 'Seats',
      category: 'vehciles',
      type: 'number',
    },
  ],
};

const renderView = async () => {
  render(
    <AppContextProvider>
      <CategoryControls category={category} />
    </AppContextProvider>
  );
};

test('Renders', async () => {
  renderView();
});
