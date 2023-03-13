import { render, screen, fireEvent } from '@testing-library/react';
import { AppContextProvider } from '../../../../context';
import 'whatwg-fetch';
import '../../matchMedia';
import ImageGallery from '../../../../components/image/gallery';

const renderView = async () => {
  render(
    <AppContextProvider>
      <ImageGallery images={['1', '2', '3']} />
    </AppContextProvider>
  );
};

test('Render', async () => {
  renderView();
});

test('Click', async () => {
  renderView();

  const next = await screen.findByLabelText('next');
  fireEvent.click(next);
  fireEvent.click(next);
  fireEvent.click(next);

  const previous = await screen.findByLabelText('previous');
  fireEvent.click(previous);
  fireEvent.click(previous);
  fireEvent.click(previous);
});
