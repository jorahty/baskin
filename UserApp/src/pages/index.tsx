import ProductList from '../components/product/list';
import { GetServerSideProps } from 'next';
import { Product } from '@/graphql/product/schema';
import { ProductService } from '../graphql/product/service';
import { Category } from '..//graphql/category/schema';
import Layout from '../components/layout/Layout';
import Sidebar from '../components/layout/Sidebar';
import queryGQL from '../queryQGL';

export const getServerSideProps: GetServerSideProps = async () => {
  const { category } = await queryGQL(
    'http://localhost:3000/api/graphql',
    'query category { category { slug, name } }',
  );
  return {
    props: {
      products: await new ProductService().list({}),
      categories: category,
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
