import { screen, fireEvent, render } from '@testing-library/react';
import { AttributePrice } from '../../../../../components/attribute/number';

const renderView = async () => {
  render(
    <AttributePrice />
  );
};

jest.mock('../../../../../context', () => ({
  useAppContext: () => ({
    refinement: {
      search: '',
      sort: 'date-new',
      filters: [
        { id: '1', selection: { min: 0, max: 10 } },
        { id: 'PRICE', selection: { min: 0, max: 10 } },
      ],
    },
    setRefinement: () => (null),
  }),
}));

test('Renders', async () => {
  renderView();
});

test('Change Min and Max', async () => {
  renderView();
  const minInput = screen.getByPlaceholderText('Min');
  const maxInput = screen.getByPlaceholderText('Max');
  fireEvent.change(minInput, { target: { value: '3' } });
  fireEvent.change(maxInput, { target: { value: '11' } });
  fireEvent.change(minInput, { target: { value: '' } });
});
