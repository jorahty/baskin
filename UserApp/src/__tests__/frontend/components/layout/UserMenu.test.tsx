import { render, screen } from '@testing-library/react';
import UserMenu from '../../../../components/layout/UserMenu';
import { CssVarsProvider } from '@mui/joy';
import '../../matchMedia';
import { AppContextProvider } from '../../../../context';

const user = {
  username: 'nobby_nobody',
  name: 'Nobby Nobody',
  accessToken: 'whatever',
};

jest.mock('next/router', () => ({
  useRouter() {
    return {
      query: { username: '123' },
    };
  },
}));

jest.mock('react-i18next', () => ({
  // this mock makes sure any components using the translate hook can use it without a warning being shown
  useTranslation: () => {
    return {
      t: (str: string) => str,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
    };
  },
  initReactI18next: {
    type: '3rdParty',
    init: () => {},
  },
}));

const renderView = async () => {
  localStorage.setItem('user', JSON.stringify(user));
  render(
    <CssVarsProvider>
      <AppContextProvider>
        <UserMenu />
      </AppContextProvider>
    </CssVarsProvider>
  );
};

test('Renders', async () => {
  renderView();
  await screen.findByLabelText(/user-avatar/i);
});
