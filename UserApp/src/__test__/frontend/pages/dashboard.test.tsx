import { fireEvent, render, screen } from '@testing-library/react';
import { CssVarsProvider } from '@mui/joy/styles';
import Dashboard, { getServerSideProps } from '../../../pages/dashboard';
import '../matchMedia';
import 'whatwg-fetch';

jest.mock('next/router', () => ({
  useRouter() {
    return {

    };
  },
  push: jest.fn(),
}));

jest.mock('react-i18next', () => ({
  // this mock makes sure any components using the translate hook can use it without a warning being shown
  useTranslation: () => {
    return {
      t: (str: string) => str,
      i18n: {
        changeLanguage: () => new Promise(() => null),
      },
    };
  },
  initReactI18next: {
    type: '3rdParty',
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    init: () => null,
  },
}));

const renderView = async () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { props } = await getServerSideProps({} as any) as any;
  console.log(props);
  render(
    <CssVarsProvider>
      <Dashboard locale={props.locale} />
    </CssVarsProvider>
  );
};


test('Renders', async () => {
  await renderView();
  screen.getByLabelText('Dashboard');
});

test('Clicks on sidebar', async () => {
  await renderView();
  const sidebar = screen.getByLabelText('Products');
  fireEvent.click(sidebar);
});
