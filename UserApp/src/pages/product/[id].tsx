import ProductDetails from '../../components/product/details';
import { GetServerSideProps } from 'next';
import { Product } from '@/graphql/product/schema';
import { ProductService } from '../../graphql/product/service';
import Layout from '../../components/layout/Layout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

// Within `getServerSideProps` we can (and should) query
// micro services directly. https://tinyurl.com/ysfwst5r
export const getServerSideProps: GetServerSideProps = async context => {
  const [product] = await new ProductService().list({ id: context.query.id as string });
  return {
    props: {
      ...(await serverSideTranslations(context.locale ?? 'en', ['common'])),
      product: product,
    },
  };
};

export default function ProductPage({ product }: { product: Product }) {
  return (
    <Layout>
      <ProductDetails product={product} />
    </Layout>
  );
}
