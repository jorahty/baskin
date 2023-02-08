import { render, screen } from '@testing-library/react'

import Index from '../../pages/index';

const renderView = async () => {
  render(<Index />)
};

test('Renders', async () => {
  renderView();
  await screen.findByText('Hello World!');
});
