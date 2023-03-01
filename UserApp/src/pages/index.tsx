import ProductList from '../components/product/list';
import { GetServerSideProps } from 'next';
import { Product } from '@/graphql/product/schema';
import { Category } from '../graphql/category/schema';
import Layout from '../components/layout/Layout';
import Sidebar from '../components/layout/Sidebar';
import { ProductService } from '../graphql/product/service';
import { CategoryService } from '../graphql/category/service';
import CategoryNavigate from '../components/category/navigate';
import { Stack } from '@mui/joy';

// Within `getServerSideProps` we can (and should) query
// micro services directly. https://tinyurl.com/ysfwst5r
export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
      products: await new ProductService().list({}),
      categories: await new CategoryService().list(),
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
      <Stack p={2} gap={2}>
        <CategoryNavigate />
        <ProductList products={products} showSearch={true} showSorter={true} />
      </Stack>
    </Layout>
  );
}
