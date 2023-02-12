import ProductList from "../../components/product/list";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { GetServerSideProps } from "next";
import { Product } from "@/graphql/product/schema";
import { ProductService } from "../../graphql/product/service";
import { CategoryService } from "../../graphql/category/service";

interface Props {
  products: Product[];
  categories: Category[];
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { slug } = query;
  return {
    props: {
      products: await new ProductService().list({ category: slug as string }),
      categories: await new CategoryService().list({})
    },
  }
}

export default function CategoryPage({ products, categories }: Props) {
  return (
    <DashboardLayout categories={categories}>
      <ProductList products={products}/>
    </DashboardLayout>
  )
}
