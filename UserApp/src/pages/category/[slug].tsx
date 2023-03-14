import { GetServerSideProps } from 'next';
import Layout from '../../components/layout/Layout';
import CategoryControls from '../../components/category/controls';
import { ProductService } from '../../graphql/product/service';
import { CategoryService } from '../../graphql/category/service';
import CategoryContent from '../../components/category/content';
import { VerboseCategory } from '..';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import * as deepl from 'deepl-node';

const translator: deepl.Translator = new deepl.Translator('9cc0a417-01a3-549d-babd-f22f9a021beb:fx');

// Within `getServerSideProps` we can (and should) query
// micro services directly. https://tinyurl.com/ysfwst5r
export const getServerSideProps: GetServerSideProps = async context => {
  const [category] = await new CategoryService().list(context.query.slug as string);

  if (!category)
    return {
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

  async function translate(locale: string, category: VerboseCategory) {
    const targetLang: deepl.TargetLanguageCode = (locale === 'en') ? 'en-US' :
      (locale === 'pt') ? 'pt-BR' : locale as deepl.TargetLanguageCode;

    let categoryResults: deepl.TextResult[] = [];
    let ancestorsResults : deepl.TextResult[] = [];
    let attributesResults : deepl.TextResult[] = [];

    if (category.name) {
      const result : deepl.TextResult = await translator.translateText(
        category.name, null, targetLang);
      category.name = result.text;
    }

    if (category.children.length !== 0) {
      categoryResults = await translator.translateText(
        category.children.map(child => child.name), null, targetLang);

      categoryResults.forEach((result, i) => {
        category.children[i].name = result.text;
      });
    }

    if (category.ancestors && category.ancestors.length !== 0) {
      ancestorsResults = await translator.translateText(
        category.ancestors.map(ancestor => ancestor.name), null, targetLang);

      ancestorsResults.forEach((result, i) => {
        if (category.ancestors) {
          category.ancestors[i].name = result.text;
        }
      });
    }


    if (category.attributes && category.attributes.length !== 0) {
      attributesResults = await translator.translateText(
        category.attributes.map(attribute => attribute.name), null, targetLang);

      attributesResults.forEach((result, i) => {
        category.attributes[i].name = result.text;
      });
    }
  }

  if (context.locale && context.locale !== 'en') {
    await translate(context.locale, verboseCategory);
  }

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

export default function CategoryPage({ category, locale }: Props) {
  return (
    <Layout sidebar={<CategoryControls category={category} />} locale={locale}>
      <CategoryContent category={category} />
    </Layout>
  );
}
