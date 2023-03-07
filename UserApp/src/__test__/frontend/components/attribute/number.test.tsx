import { AppContextProvider } from '../../../../context';
import { Attribute } from '@/graphql/category/schema';
import { screen, fireEvent, render } from '@testing-library/react';
import AttributeNumber from '../../../../components/attribute/number';

const priceAttribute = {
  id: '1',
  name: 'Price',
  category: 'NA',
  type: 'number',
};

const lengthAttribute = {
  id: '2',
  name: 'Length',
  category: 'NA',
  type: 'number',
  min: 0,
  max: 100,
};

const renderView = async (attribute: Attribute) => {
  render(
    <AppContextProvider>
      <AttributeNumber attribute={attribute} />
    </AppContextProvider>
  );
};

test('Render Range', async () => {
  renderView(priceAttribute);
});

test('Render Slider', async () => {
  renderView(lengthAttribute);
  const sliders = screen.getAllByRole('slider');
  fireEvent.change(sliders[0], { target: { value: 25 } });
});
