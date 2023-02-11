import ProductList from "../components/product/list";
import DashboardLayout from "../components/layout/DashboardLayout";
import { GetServerSideProps } from "next";
import { Product } from "@/graphql/product/schema";
import { ProductService } from "../graphql/product/service";

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
      products: await new ProductService().list({}),
    },
  }
}

export default function Index({ products }: { products: Product[] }) {
  return (
    <DashboardLayout>
      <ProductList products={products}/>
    </DashboardLayout>
  )
}
