import { GetServerSideProps } from 'next';
import { Product } from '@/graphql/product/schema';
import { Category } from '../graphql/category/schema';
import Layout from '../components/layout/Layout';
import Sidebar from '../components/layout/Sidebar';
import { ProductService } from '../graphql/product/service';
import { CategoryService } from '../graphql/category/service';
import CategoryContent from '../components/category/content';

// Within `getServerSideProps` we can (and should) query
// micro services directly. https://tinyurl.com/ysfwst5r
export const getServerSideProps: GetServerSideProps = async () => {
  const verboseCategory = {
    name: null,
    ancestors: null,
    children: await new CategoryService().children(),
    products: await new ProductService().list({}),
  };

  return {
    props: { category: verboseCategory },
  };
};

export interface Props {
  category: VerboseCategory;
}

export interface VerboseCategory {
  name: null|string;
  ancestors: Category[];
  children: Category[];
  products: Product[];
}

export default function IndexPage({ category }: Props) {
  return (
    <Layout sidebar={<Sidebar category={category} />}>
      <CategoryContent category={category}/>
    </Layout>
  );
}
