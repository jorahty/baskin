import UserPage from '../../../pages/user/[username]';
import { getServerSideProps } from '../../../pages/user/[username]';
import { render, screen } from '@testing-library/react'
import { CssVarsProvider } from '@mui/joy/styles';
import '../matchMedia';

jest.mock('next/router', () => ({
  useRouter() {
    return ({
      query: { id: '123' },
    });
  },
}));

const renderView = async () => {
  const { props } = await getServerSideProps({
    req: { headers: { host: 'localhost:3000' } },
    query: { username: 'molly_member' },
  });
  render(
    <CssVarsProvider>
      <UserPage user={props.user} products={props.products} />
    </CssVarsProvider>
  );
};

test('Renders', async () => {
  renderView();
  await screen.findByText(`Molly Member`);
});
