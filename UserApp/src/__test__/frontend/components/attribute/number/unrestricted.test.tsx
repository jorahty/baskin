import { Attribute } from '@/graphql/category/schema';
import { screen, fireEvent, render } from '@testing-library/react';
import { Unrestricted } from '../../../../../components/attribute/number';

const attribute: Attribute = {
  id: '1',
  name: 'Miles driven',
  category: 'vehicles',
  type: 'number',
  min: 0,
};

const renderView = async (attribute: Attribute) => {
  render(
    <Unrestricted attribute={attribute} />
  );
};

jest.mock('../../../../../context', () => ({
  useAppContext: () => ({
    refinement: {
      search: '',
      sort: 'date-new',
      filters: [
        { id: '1', selection: { min: 0, max: 10 } },
        { id: '2', selection: { min: 0, max: 10 } },
      ],
    },
    setRefinement: () => (null),
  }),
}));

test('Renders', async () => {
  renderView(attribute);
});

test('Change Min and Max', async () => {
  renderView(attribute);
  const minInput = screen.getByPlaceholderText('Min');
  const maxInput = screen.getByPlaceholderText('Max');
  fireEvent.change(minInput, { target: { value: '3' } });
  fireEvent.change(maxInput, { target: { value: '11' } });
  fireEvent.change(minInput, { target: { value: '' } });
});
