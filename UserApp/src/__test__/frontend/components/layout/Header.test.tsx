import { fireEvent, render, screen } from '@testing-library/react';
import Header from '../../../../components/layout/Header';
import { CssVarsProvider } from '@mui/joy';
import '../../matchMedia';
import { AppContextProvider } from '../../../../context';

let handleSidebarOpen: () => void;

let pathname = '/';

jest.mock('next/router', () => ({
  useRouter() {
    return {
      query: { username: '123' },
      pathname: pathname,
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
  render(
    <CssVarsProvider>
      <AppContextProvider>
        <Header handleSidebarOpen={handleSidebarOpen} />
      </AppContextProvider>
    </CssVarsProvider>
  );
};

test('Sign in', async () => {
  renderView();
  fireEvent.click(screen.getByLabelText('Sign in'));
});

test('Sign up', async () => {
  renderView();
  fireEvent.click(screen.getByLabelText('Sign up'));
});

test('Toggle Dark Mode', async () => {
  renderView();
  fireEvent.click(screen.getByRole('button', { name: /mode-toggle/i }));
  fireEvent.click(screen.getByRole('button', { name: /mode-toggle/i }));
});

test('User Menu', async () => {
  localStorage.setItem('user', `{"username": "nobby_nobody", "accessToken": "blergh"}`);
  renderView();
  fireEvent.click(screen.getByLabelText(/user-avatar/i));
});

test('Close User Menu', async () => {
  // this test is kinda scuffed. I spent so long trying to make it disappear.
  // The only way I got it to close was by clicking a button on the menu.
  // Clicking away or on other elements NEVER triggered its handleClose()
  renderView();
  fireEvent.click(screen.getByLabelText(/user-avatar/i));
  fireEvent.click(screen.getByLabelText('Profile'));
  expect(screen.queryByText('Profile')).not.toBeInTheDocument();
});

test('Log Out in User Menu', async () => {
  renderView();
  fireEvent.click(screen.getByLabelText(/user-avatar/i));
  screen.getByLabelText('Sign out');
  fireEvent.click(screen.getByLabelText('Sign out'));
});

test('Without Search', async () => {
  pathname = '/whatever';
  renderView();
});
