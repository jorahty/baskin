import Layout from '../../components/layout/Layout';
import { GetServerSideProps } from 'next';
import { Product } from '@/graphql/product/schema';
import { Stack } from '@mui/joy';
import ProductList from '../../components/product/list';
import { User } from '@/graphql/user/schema';
import UserDetails from '../../components/user/details';
import { UserService } from '../../graphql/user/service';
import { ProductService } from '../../graphql/product/service';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

// Within `getServerSideProps` we can (and should) query
// micro services directly. https://tinyurl.com/ysfwst5r
export const getServerSideProps: GetServerSideProps = async context => {
  const [user] = await new UserService().list(context.query.username as string);
  return {
    props: {
      ...await serverSideTranslations(context.locale ?? 'en', ['common']),
      user: user,
      products: await new ProductService().list({ user: context.query.username as string }),
    },
  };
};

export default function UserPage({ user, products }: { user: User; products: Product[] }) {
  return (
    <Layout>
      <Stack p={3} gap={3} maxWidth={1200} m="auto">
        <UserDetails user={user} />
        <ProductList products={products} showSearch={false} showSorter={false} />
      </Stack>
    </Layout>
  );
}
