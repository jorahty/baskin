import { GetServerSideProps } from 'next';
import { Product } from '@/graphql/product/schema';
import { Attribute, Category } from '../graphql/category/schema';
import Layout from '../components/layout/Layout';
import CategoryControls from '../components/category/controls';
import { ProductService } from '../graphql/product/service';
import { CategoryService } from '../graphql/category/service';
import CategoryContent from '../components/category/content';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

// Within `getServerSideProps` we can (and should) query
// micro services directly. https://tinyurl.com/ysfwst5r
export const getServerSideProps: GetServerSideProps = async context => {
  const verboseCategory = {
    name: null,
    ancestors: null,
    children: await new CategoryService().children(),
    products: await new ProductService().list({}),
    attributes: [],
  };

  return {
    props: {
      ...(await serverSideTranslations(context.locale ?? 'en', ['common'])),
      locale: context.locale ?? 'en',
      category: verboseCategory,
    },
  };
};

export interface Props {
  category: VerboseCategory;
  locale: string;
}

export interface VerboseCategory {
  name: null | string;
  ancestors: Category[];
  children: Category[];
  products: Product[];
  attributes: Attribute[];
}

export default function IndexPage({ category, locale }: Props) {
  return (
    <Layout sidebar={<CategoryControls category={category} />} locale={locale} menuIconVisible>
      <CategoryContent category={category} />
    </Layout>
  );
}
