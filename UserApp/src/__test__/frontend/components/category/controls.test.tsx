import { useAppContext } from '../../../../context';
import { render } from '@testing-library/react';
import CategoryControls from '../../../../components/category/controls';
import { CssVarsProvider } from '@mui/joy';
import '../../matchMedia';

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

jest.mock('../../../../context');

const mockUseAppContext = useAppContext as jest.MockedFunction<typeof useAppContext>;

const renderView = async () => {
  render(
    <CssVarsProvider>
      <CategoryControls category={category} />
    </CssVarsProvider>
  );
};

test('Renders', async () => {
  mockUseAppContext.mockReturnValue({
    refinement: {
      sort: 'date-new',
      search: '',
      filters: [],
    },
    setRefinement: jest.fn(),
  } as any); // eslint-disable-line @typescript-eslint/no-explicit-any

  renderView();
});

test('Renders with existing filter', async () => {
  mockUseAppContext.mockReturnValue({
    refinement: {
      sort: 'date-new',
      search: '',
      filters: [{
        id: '1',
        selection: [],
      }],
    },
    setRefinement: jest.fn(),
  } as any); // eslint-disable-line @typescript-eslint/no-explicit-any

  renderView();
});
