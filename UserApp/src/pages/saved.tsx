import { GetServerSideProps } from 'next';
import Layout from '../components/layout/Layout';
import CategoryControls from '../components/category/controls';
import { ProductService } from '../graphql/product/service';
import { CategoryService } from '../graphql/category/service';
import CategoryContent from '../components/category/content';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { VerboseCategory } from './';
import { useEffect, useState } from 'react';
import { Stack, Typography } from '@mui/joy';
import Image from 'next/image';

// Within `getServerSideProps` we can (and should) query
// micro services directly. https://tinyurl.com/ysfwst5r
export const getServerSideProps: GetServerSideProps = async context => {
  const verboseCategory = {
    name: 'Saved',
    children: await new CategoryService().children(),
    products: await new ProductService().list({}),
    ancestors: null,
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

interface Props {
  category: VerboseCategory;
  locale: string;
}

export default function SavedPage({ category: unfiltered, locale }: Props) {
  const [category, setCategory] = useState<VerboseCategory>(unfiltered);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const item = localStorage.getItem('saved');
    const saved: string[] = item ? JSON.parse(item) : [];
    setCategory({
      ...unfiltered,
      products: unfiltered.products.filter(product => saved.includes(product.id)),
    });
    setMounted(true);
  }, []);

  if (!mounted) return <></>;

  return (
    <Layout sidebar={<CategoryControls category={category} />} locale={locale} menuIconVisible>
      {category.products.length > 0 ? <CategoryContent category={category} /> : <Empty />}
    </Layout>
  );
}

function Empty() {
  return (
    <Stack gap={5} justifyContent="center" alignItems="center" height="100%">
      <Image src="/logo.svg" alt="" width={300} height={70} />
      <Typography level="h4" textColor="#789">
        You do not have any saved products
      </Typography>
    </Stack>
  );
}
