import ProductList from '../../components/product/list';
import { GetServerSideProps } from 'next';
import { Product } from '@/graphql/product/schema';
import { ProductService } from '../../graphql/product/service';
import { Category } from '@/graphql/category/schema';
import Layout from '../../components/layout/Layout';
import Sidebar from '../../components/layout/Sidebar';
import queryGQL from '../../queryQGL';

interface Props {
  products: Product[];
  categories: Category[];
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { slug } = query;
  const { category } = await queryGQL(
    'http://localhost:3000/api/graphql',
    'query category { category { slug, name } }',
  );
  return {
    props: {
      products: await new ProductService().list({ category: slug as string }),
      categories: category,
    },
  };
};

export default function CategoryPage({ products, categories }: Props) {
  return (
    <Layout sidebar={<Sidebar categories={categories} />}>
      <ProductList products={products} showSearch={true} showSorter={true} />
    </Layout>
  );
}
