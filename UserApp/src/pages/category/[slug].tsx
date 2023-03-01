import { GetServerSideProps } from 'next';
import Layout from '../../components/layout/Layout';
import Sidebar from '../../components/layout/Sidebar';
import { ProductService } from '../../graphql/product/service';
import { CategoryService } from '../../graphql/category/service';
import CategoryContent from '../../components/category/content';
import { VerboseCategory } from '..';

// Within `getServerSideProps` we can (and should) query
// micro services directly. https://tinyurl.com/ysfwst5r
export const getServerSideProps: GetServerSideProps = async ({ query: { slug } }) => {
  const [category] = await new CategoryService().list(slug as string);

  if (!category) return {
    redirect: {
      permanent: false,
      destination: '/',
    },
  };

  const verboseCategory = {
    name: category.name,
    children: await new CategoryService().children(slug as string),
    ancestors: await new CategoryService().ancestors(slug as string),
    products: await new ProductService().list({ category: slug as string }),
    categories: await new CategoryService().list(),
  };
  return {
    props: { category: verboseCategory },
  };
};

interface Props {
  category: VerboseCategory;
}

export default function CategoryPage({ category }: Props) {
  return (
    <Layout sidebar={<Sidebar category={category} />}>
      <CategoryContent category={category}/>
    </Layout>
  );
}
