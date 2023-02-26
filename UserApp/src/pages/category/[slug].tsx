import ProductList from '../../components/product/list';
import { GetServerSideProps } from 'next';
import { Product } from '@/graphql/product/schema';
import { Category } from '@/graphql/category/schema';
import Layout from '../../components/layout/Layout';
import Sidebar from '../../components/layout/Sidebar';
import request, { gql } from 'graphql-request';

// Within `getServerSideProps`, we can (and should) query micro services directly
export const getServerSideProps: GetServerSideProps = async ({ query: { slug } }) => {
  const query = gql`
    query CategoryPage($category: String) {
      product(category: $category) {
        id, user, category, name, price, discount,
        quantity, description, date, pictures
      }
      category { slug, name }
    }
  `;
  const data = await request(
    'http://localhost:3013/graphql',
    query,
    { category: slug },
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

export default function CategoryPage({ products, categories }: Props) {
  return (
    <Layout sidebar={<Sidebar categories={categories} />}>
      <ProductList products={products} showSearch={true} showSorter={true} />
    </Layout>
  );
}
