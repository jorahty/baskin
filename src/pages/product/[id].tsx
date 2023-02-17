import ProductDetails from '../../components/product/details';
import { GetServerSideProps } from 'next';
import { Product } from '@/graphql/product/schema';
import { ProductService } from '../../graphql/product/service';
import Layout from '../../components/layout/Layout';

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { id } = query;
  const [product] = await new ProductService().list({ id: id as string });
  return {
    props: {
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
