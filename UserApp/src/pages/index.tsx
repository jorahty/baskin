import ProductList from '../components/product/list';
import { GetServerSideProps } from 'next';
import { Product } from '@/graphql/product/schema';
import { Category } from '../graphql/category/schema';
import Layout from '../components/layout/Layout';
import Sidebar from '../components/layout/Sidebar';
import request, { gql } from 'graphql-request';

// Within `getServerSideProps`, we can (and should) query micro services directly
export const getServerSideProps: GetServerSideProps = async () => {
  const query = gql`
    query IndexPage {
      product {
        id, user, category, name, price, discount,
        quantity, description, date, pictures
      }
      category { slug, name }
    }
  `;
  const data = await request(
    'http://localhost:3013/graphql',
    query,
  );
  return {
    props: {
      products: data.product,
      categories: data.category,
    },
  };
};

interface Props {
  products: Product[];
  categories: Category[];
}

export default function IndexPage({ products, categories }: Props) {
  return (
    <Layout sidebar={<Sidebar categories={categories} />}>
      <ProductList products={products} showSearch={true} showSorter={true} />
    </Layout>
  );
}
