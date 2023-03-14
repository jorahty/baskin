import { GetServerSideProps } from 'next';
import { Product } from '@/graphql/product/schema';
import { Attribute, Category } from '../graphql/category/schema';
import Layout from '../components/layout/Layout';
import CategoryControls from '../components/category/controls';
import { ProductService } from '../graphql/product/service';
import { CategoryService } from '../graphql/category/service';
import CategoryContent from '../components/category/content';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import * as deepl from 'deepl-node';

const translator: deepl.Translator = new deepl.Translator('d138d914-080f-f266-18d0-f12135025563:fx');

// Within `getServerSideProps` we can (and should) query
// micro services directly. https://tinyurl.com/ysfwst5r
export const getServerSideProps: GetServerSideProps = async context => {
  const verboseCategory : VerboseCategory = {
    name: null,
    ancestors: null,
    children: await new CategoryService().children(),
    products: await new ProductService().list({}),
    attributes: [],
  };

  async function translate(locale: string, category: VerboseCategory) {
    const targetLang: deepl.TargetLanguageCode = (locale === 'en') ? 'en-US' :
      (locale === 'pt') ? 'pt-BR' : locale as deepl.TargetLanguageCode;
    const results = await translator.translateText(
      category.children.map(child => child.name), null, targetLang);

    results.forEach((result, i) => {
      category.children[i].name = result.text;
    });
  }
  if (context.locale && context.locale !== 'en') {
    !verboseCategory.ancestors && await translate(context.locale, verboseCategory);
  }

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
  ancestors: Category[] | null;
  children: Category[];
  products: Product[];
  attributes: Attribute[];
}

export default function IndexPage({ category, locale }: Props) {
  return (
    <Layout sidebar={<CategoryControls category={category} />} locale={locale}>
      <CategoryContent category={category} />
    </Layout>
  );
}
