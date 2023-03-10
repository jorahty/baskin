import { Container, Stack } from '@mui/joy';
import CartContent from '../components/cart/CartContent';
import CartCharge from '../components/cart/CartCharge';
import Layout from '../components/layout/Layout';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export const getServerSideProps: GetServerSideProps = async context => {
  return {
    props: {
      ...await serverSideTranslations(context.locale as string ?? 'en', ['common']),
      locale: context.locale as string ?? 'en',
    },
  };
};

interface Props {
  locale: string;
}

/* How to change the icon of the dropdown
 * https://stackoverflow.com/questions/74671428/mui-v412-4-override-default-icon-for-component-like-select-chevron-or-chip-on */
export default function Cart({ locale }: Props) {
  return (
    <Layout locale={locale}>
      <Container>
        <Stack
          sx={{
            flexDirection: { md: 'row' },
            rowGap: { xs: '20px', md: '0' },
            columnGap: { xs: '0', md: '20px' },
            margin: '20px auto',
            alignItems: { md: 'flex-start' },
          }}
        >
          <CartContent />

          <CartCharge />
        </Stack>
      </Container>
    </Layout>
  );
}
