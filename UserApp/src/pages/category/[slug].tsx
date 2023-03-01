import ProductList from '../../components/product/list';
import { GetServerSideProps } from 'next';
import { Product } from '@/graphql/product/schema';
import { Category } from '@/graphql/category/schema';
import Layout from '../../components/layout/Layout';
import Sidebar from '../../components/layout/Sidebar';
import { ProductService } from '../../graphql/product/service';
import { CategoryService } from '../../graphql/category/service';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

// Within `getServerSideProps` we can (and should) query
// micro services directly. https://tinyurl.com/ysfwst5r
export const getServerSideProps: GetServerSideProps = async context => {
  return {
    props: {
      ...await serverSideTranslations(context.locale ?? 'en', ['common']),
      products: await new ProductService().list({ category: context.query.slug as string }),
      categories: await new CategoryService().list(),
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
