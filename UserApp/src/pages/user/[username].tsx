import Layout from '../../components/layout/Layout';
import { GetServerSideProps } from 'next';
import { Product } from '@/graphql/product/schema';
import { Container } from '@mui/joy';
import ProductList from '../../components/product/list';
import { User } from '@/graphql/user/schema';
import UserDetails from '../../components/user/details';
import { UserService } from '../../graphql/user/service';
import { ProductService } from '../../graphql/product/service';

// Within `getServerSideProps`, we can (and should) query
// micro services directly. https://tinyurl.com/ysfwst5r
export const getServerSideProps: GetServerSideProps = async ({ query: { username } }) => {
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
      <Container style={{ margin: '10px auto' }}>
        <UserDetails user={user} />
        <ProductList products={products} showSearch={false} showSorter={false} />
      </Container>
    </Layout>
  );
}
