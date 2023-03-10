import { render } from '@testing-library/react';
import  { CssVarsProvider }  from '@mui/joy/styles';
import AboutPage, { getServerSideProps } from '../../../pages/about';
import '../matchMedia';

jest.mock('next/router', () => ({
  useRouter() {
    return {
      query: { slug: 'toys' },
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
  },
}));

const renderView = async () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { props } = await getServerSideProps({} as any) as any;
  render(
    <CssVarsProvider>
      <AboutPage locale={props.locale} />
    </CssVarsProvider>
  );
};

test('Renders', async () => {
  await renderView();
});