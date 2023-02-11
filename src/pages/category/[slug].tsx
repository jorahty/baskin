import ProductList from "../../components/product/list";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { GetServerSideProps } from "next";
import { Product } from "@/graphql/product/schema";
import { ProductService } from "../../graphql/product/service";

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { slug } = query;
  return {
    props: {
      products: await new ProductService().list({ category: slug as string }),
    },
  }
}

export default function CategoryPage({ products }: { products: Product[] }) {
  return (
    <DashboardLayout>
      <ProductList products={products}/>
    </DashboardLayout>
  )
}
