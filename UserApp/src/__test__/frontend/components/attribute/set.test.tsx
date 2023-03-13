import { useAppContext } from '../../../../context';
import { Attribute } from '@/graphql/category/schema';
import { screen, fireEvent, render } from '@testing-library/react';
import AttributeSet from '../../../../components/attribute/set';

const attribute = {
  id: '1',
  category: 'NA',
  name: 'Condition',
  type: 'set',
  values: ['New', 'Used'],
};

const renderView = async (attribute: Attribute) => {
  render(
    <AttributeSet attribute={attribute} />
  );
};

jest.mock('../../../../context');

const mockUseAppContext = useAppContext as jest.MockedFunction<typeof useAppContext>;

test('Renders', async () => {
  mockUseAppContext.mockReturnValue({
    refinement: {
      search: '',
      sort: 'date-new',
      filters: [
        { id: '1', selection: [] },
        { id: '2', selection: [] },
      ],
    },
    setRefinement: () => (null),
  } as any); // eslint-disable-line @typescript-eslint/no-explicit-any

  renderView(attribute);
});

test('Renders with selection', async () => {
  mockUseAppContext.mockReturnValue({
    refinement: {
      search: '',
      sort: 'date-new',
      filters: [
        { id: '1', selection: ['New'] },
        { id: '2', selection: [] },
      ],
    },
    setRefinement: () => (null),
  } as any); // eslint-disable-line @typescript-eslint/no-explicit-any

  renderView(attribute);
});

test('Click', async () => {
  mockUseAppContext.mockReturnValue({
    refinement: {
      search: '',
      sort: 'date-new',
      filters: [
        { id: '1', selection: ['New'] },
        { id: '2', selection: [] },
      ],
    },
    setRefinement: () => (null),
  } as any); // eslint-disable-line @typescript-eslint/no-explicit-any

  renderView(attribute);

  fireEvent.click(screen.getByText('New'));

  fireEvent.pointerDown(await screen.findByTestId('New'));
  fireEvent.pointerDown(await screen.findByTestId('Used'));
});
