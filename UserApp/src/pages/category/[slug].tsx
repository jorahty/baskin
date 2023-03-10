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
    attributes: await new CategoryService().attributes(context.query.slug as string),
  };

  return {
    props: {
      ...await serverSideTranslations(context.locale ?? 'en', ['common']),
      locale: context.locale ?? 'en',
      category: verboseCategory,
    },
  };
};

interface Props {
  category: VerboseCategory;
  locale: string;
}

export default function CategoryPage({ category, locale }: Props) {
  return (
    <Layout sidebar={<CategoryControls category={category} />} locale={locale}>
      <CategoryContent category={category}/>
    </Layout>
  );
}
