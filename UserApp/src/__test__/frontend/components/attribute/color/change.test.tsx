import { CssVarsProvider } from '@mui/joy';
import { fireEvent, render, screen } from '@testing-library/react';
import AttributeColor from '../../../../../components/attribute/color';
import '../../../matchMedia';

const attribute = {
  id: '1',
  name: 'Price',
  category: 'NA',
  type: 'number',
};

const renderView = async () => {
  render(
    <CssVarsProvider>
      <AttributeColor attribute={attribute} />
    </CssVarsProvider>
  );
};

jest.mock('../../../../../context', () => ({
  useAppContext: () => ({
    refinement: {
      search: '',
      sort: 'date-new',
      filters: [
        { id: '1', selection: undefined },
        { id: '2', selection: undefined },
      ],
    },
    setRefinement: () => (null),
  }),
}));

test('Renders', async () => {
  renderView();
});

test('Change Color', async () => {
  renderView();
  const input = screen.getByLabelText('color-input');
  fireEvent.change(input, { target: { value: '#ff0000' } });
});
