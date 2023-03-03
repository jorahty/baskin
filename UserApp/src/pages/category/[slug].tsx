import { GetServerSideProps } from 'next';
import Layout from '../../components/layout/Layout';
import CategoryControls from '../../components/category/controls';
import { ProductService } from '../../graphql/product/service';
import { CategoryService } from '../../graphql/category/service';
import CategoryContent from '../../components/category/content';
import { VerboseCategory } from '..';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

// Within `getServerSideProps` we can (and should) query
// micro services directly. https://tinyurl.com/ysfwst5r
export const getServerSideProps: GetServerSideProps = async context => {
  const [category] = await new CategoryService().list(context.query.slug as string);

  if (!category) return {
    redirect: {
      permanent: false,
      destination: '/',
    },
  };

  const verboseCategory = {
    name: category.name,
    children: await new CategoryService().children(context.query.slug as string),
    ancestors: await new CategoryService().ancestors(context.query.slug as string),
    products: await new ProductService().list({ category: context.query.slug as string }),
    categories: await new CategoryService().list(),
  };

  return {
    props: {
      ...await serverSideTranslations(context.locale ?? 'en', ['common']),
      category: verboseCategory,
    },
  };
};

interface Props {
  category: VerboseCategory;
}

export default function CategoryPage({ category }: Props) {
  return (
    <Layout sidebar={<CategoryControls category={category} />}>
      <CategoryContent category={category}/>
    </Layout>
  );
}
