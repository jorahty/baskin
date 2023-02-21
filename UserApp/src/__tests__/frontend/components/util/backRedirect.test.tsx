import { render, screen } from '@testing-library/react';
import BackRedirect from '../../../../components/util/BackRedirect';
import Router from 'next/router';

jest.mock('next/router', () => ({
  push: jest.fn(),
  back: jest.fn(),
}));

const renderView = async (url?: string) => {
  render(<BackRedirect url={url} />);
};

test('Renders', async () => {
  await renderView();
  const button = await screen.findByLabelText('back');
  await button.click();
});

test('Renders with link', async () => {
  await renderView('/dashboard');
  const button = await screen.findByLabelText('back');
  button.click();
  expect(Router.push).toHaveBeenCalledWith('/dashboard');
});
