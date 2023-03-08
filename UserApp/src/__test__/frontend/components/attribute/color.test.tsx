import { Attribute } from '@/graphql/category/schema';
import { useColorScheme } from '@mui/joy';
import { render } from '@testing-library/react';
import AttributeColor from '../../../../components/attribute/color';

const attribute = {
  id: '1',
  name: 'Price',
  category: 'NA',
  type: 'number',
};

const renderView = async (attribute: Attribute) => {
  render(
    <AttributeColor attribute={attribute} />
  );
};

jest.mock('@mui/joy');

const mockUseColorScheme = useColorScheme as jest.MockedFunction<typeof useColorScheme>;

test('Renders', async () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mockUseColorScheme.mockReturnValue({ mode: 'light' } as any);

  renderView(attribute);
});

test('Renders Dark Mode', async () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mockUseColorScheme.mockReturnValue({ mode: 'dark' } as any);

  renderView(attribute);
});
