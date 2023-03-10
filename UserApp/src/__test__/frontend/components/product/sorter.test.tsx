import ProductSorter from '../../../../components/product/sorter';
import { fireEvent, render, screen } from '@testing-library/react';
import { AppContextProvider } from '../../../../context';

const renderView = async () => {
  render(
    <AppContextProvider>
      <ProductSorter />
    </AppContextProvider>
  );
};

test('Renders', async () => {
  renderView();
});

test('Select', async () => {
  renderView();
  fireEvent.click(await screen.findByLabelText('sort'));
  fireEvent.click(await screen.findByLabelText('Oldest'));
});
