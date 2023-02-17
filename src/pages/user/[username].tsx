import Layout from '../../components/layout/Layout';
import { GetServerSideProps } from 'next';
import { Product } from '@/graphql/product/schema';
import { ProductService } from '../../graphql/product/service';
import { Stack } from '@mui/joy';
import ProductList from '../../components/product/list';
import { UserService } from '../../graphql/user/service';
import { User } from '@/graphql/user/schema';
import UserDetails from '../../components/user/details';

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { username } = query;
  const [user] = await new UserService().list(username as string);
  return {
    props: {
      user: user,
      products: await new ProductService().list({ user: username as string }),
    },
  };
};

export default function UserPage({ user, products }: { user: User; products: Product[] }) {
  return (
    <Layout>
      <Stack maxWidth="lg" margin="auto" alignItems="center" pt={6} gap={4} flexWrap="wrap">
        <UserDetails user={user} />
        <ProductList products={products} showSearch={false} showSorter={false} />
      </Stack>
    </Layout>
  );
}
