import Layout from '../../components/layout/Layout';
import { GetServerSideProps } from 'next';
import { Product } from '@/graphql/product/schema';
import { Container } from '@mui/joy';
import ProductList from '../../components/product/list';
import { UserService } from '../../graphql/user/service';
import { User } from '@/graphql/user/schema';
import UserDetails from '../../components/user/details';
import request, { gql } from 'graphql-request';

// Within `getServerSideProps`, we can (and should) query micro services directly
export const getServerSideProps: GetServerSideProps = async ({ query: { username } }) => {
  const query = gql`
    query UserPage($user: String!) {
      product(user: $user) {
        id, user, category, name, price, discount,
        quantity, description, date, pictures
      }
    }
  `;
  const data = await request(
    'http://localhost:3013/graphql',
    query,
    { user: username },
  );
  const [user] = await new UserService().list(username as string);
  return {
    props: {
      user: user,
      products: data.product,
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
