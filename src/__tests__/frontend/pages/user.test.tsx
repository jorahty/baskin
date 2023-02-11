import { render, screen } from '@testing-library/react'
import UserPage from '../../../pages/user/[username]';
import { CssVarsProvider } from '@mui/joy/styles';
import '../matchMedia';

jest.mock('next/router', () => ({
  useRouter() {
    return ({
      query: { username: 'molly42' },
    });
  },
}));

const renderView = async () => {
  render(
    <CssVarsProvider>
      <UserPage />
    </CssVarsProvider>
  );
};

test('Renders', async () => {
  renderView();
  screen.getByText('User profile of user with username molly42');
});
