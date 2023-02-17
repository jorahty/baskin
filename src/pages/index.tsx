import ProductList from "../components/product/list";
import { GetServerSideProps } from "next";
import { Product } from "@/graphql/product/schema";
import { ProductService } from "../graphql/product/service";
import { CategoryService } from "../graphql/category/service";
import { Category } from "..//graphql/category/schema";
import Layout from "../components/layout/Layout";
import Sidebar from "../components/layout/Sidebar";

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
    <Layout
      sidebar={
        <Sidebar categories={categories}/>
      }
    >
      <ProductList
        products={products}
        showSearch={true}
        showSorter={true}
      />
    </Layout>
  )
}
