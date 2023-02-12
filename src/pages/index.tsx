import ProductList from "../components/product/list";
import DashboardLayout from "../components/layout/DashboardLayout";
import { GetServerSideProps } from "next";
import { Product } from "@/graphql/product/schema";
import { ProductService } from "../graphql/product/service";
import { CategoryService } from "../graphql/category/service";
import { Category } from "..//graphql/category/schema";

interface Props {
  products: Product[];
  categories: Category[];
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
      products: await new ProductService().list({}),
      categories: await new CategoryService().list({}),
    },
  }
}

export default function Index({ products, categories }: Props) {
  return (
    <DashboardLayout categories={categories}>
      <ProductList products={products}/>
    </DashboardLayout>
  )
}
