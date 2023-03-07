import { render, screen } from '@testing-library/react';
import ProductInputs from '../../../../components/common/ProductInputs';
import { useTranslation } from 'react-i18next';
import { afterEach } from 'jest-circus';
import { graphql } from 'msw';
import { setupServer } from 'msw/node';
import userEvent from '@testing-library/user-event';
import { AppContextProvider } from '../../../../context';
import { CssVarsProvider } from '@mui/joy';
import '../../matchMedia';

const handleSetCategories = jest.fn();

const handlers = [
  graphql.query('getAllCategories', async (req, res, ctx) => {
    return res(
      ctx.data({
        category: [
          {
            name: 'Electronics',
            slug: 'electronics',
          },
          {
            name: 'Toys',
            slug: 'toys',
          },
        ],
      }),
    );
  }),
];

const server = setupServer(...handlers);
beforeAll(() => server.listen());
afterEach(() => {
  handleSetCategories.mockReset();
  server.resetHandlers();
});
afterAll(() => server.close());
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
    init: () => null,
  },
}));
const ProductInputsWrapper = () => {
  const { t } = useTranslation('common');

  return <ProductInputs t={t} setCategory={handleSetCategories} />;
};

const renderView = async () => {
  return render(
    <CssVarsProvider>
      <AppContextProvider>
        <ProductInputsWrapper />
      </AppContextProvider>
    </CssVarsProvider>,
  );
};

test('OK', async () => {
  localStorage.setItem(
    'user',
    '{"accessToken":"whatever","name":"molly","email":"molly_admin@ucsc.edu"}',
  );
  await renderView();
});

test('Categories appear', async () => {
  localStorage.setItem(
    'user',
    '{"accessToken":"whatever","name":"molly","email":"molly_admin@ucsc.edu"}',
  );
  await renderView();

  const button = await screen.findByLabelText('category');
  await userEvent.click(button);

  const electronics = await screen.findByLabelText('Electronics');
  await userEvent.click(electronics);

  expect(handleSetCategories).toHaveBeenCalled();
});
