import { fireEvent, render, screen } from '@testing-library/react';
import { AppContextProvider } from '../../../../context';
import ProductSearch from '../../../../components/product/search';

const renderView = async () => {
  render(
    <AppContextProvider>
      <ProductSearch />
    </AppContextProvider>
  );
};

test('Renders', async () => {
  renderView();
});

test('Search', async () => {
  renderView();
  const input = screen.getByPlaceholderText('Search...');
  fireEvent.change(input, { target: { value: 'Air' } });
});

test('Clear Search', async () => {
  renderView();
  const input = screen.getByPlaceholderText('Search...');
  fireEvent.change(input, { target: { value: 'Air' } });
  fireEvent.click(screen.getByRole('button', { name: /clear-search/ }));
});
