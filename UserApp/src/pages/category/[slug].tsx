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
  const categoryPayload = {
    name: category.name,
    children: await new CategoryService().children(slug as string),
    products: await new ProductService().list({ category: slug as string }),
    categories: await new CategoryService().list(),
  };
  return {
    props: { categoryPayload },
  };
};

interface Props {
  categoryPayload: VerboseCategory
}

export default function CategoryPage({ categoryPayload }: Props) {
  return (
    <Layout sidebar={<Sidebar category={categoryPayload} />}>
      <CategoryContent category={categoryPayload}/>
    </Layout>
  );
}
