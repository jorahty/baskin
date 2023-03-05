import { render } from '@testing-library/react';

import AuthGuard from '../../../../components/common/AuthGuard';
import { AppContextProvider } from '../../../../context';

jest.mock('next/router', () => ({
  push: jest.fn(),
}));


const renderView = async () => {
  render(
    <AppContextProvider>
      <AuthGuard><div>dummy children</div></AuthGuard>
    </AppContextProvider>
  );
};

test('Renders', async () => {
  await renderView();
});

test('With User', async () => {
  localStorage.setItem('user', '["whatever"]')
  await renderView();
});
