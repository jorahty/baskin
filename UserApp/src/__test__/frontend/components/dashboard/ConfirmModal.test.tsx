import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import ConfirmModal from '../../../../components/dashboard/ConfirmModal';
import { CssVarsProvider } from '@mui/joy';
import '../../matchMedia';

const renderView = async () => {
  localStorage.setItem('user', `{"username": "molly_member", "accessToken": "blergh"}`);
  const setOpen = jest.fn();
  const changeUsername = jest.fn();
  render(
    <CssVarsProvider>
      <ConfirmModal open={true} setOpen={setOpen} changeUsername={changeUsername} />
    </CssVarsProvider>,
  );
};

test('Renders Product Menu', async () => {
  await renderView();
  expect(screen.getByText('Are you sure?')).toBeTruthy();
});

test('Click new button', async () => {
  await renderView();
  await waitFor(() => {
    fireEvent.click(screen.getByText('Cancel'));
  });
});
