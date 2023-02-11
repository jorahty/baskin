import ProductList from "../components/product/list";
import DashboardLayout from "../components/layout/DashboardLayout";

const products = [{
  user: "string",
  id: "string",
  category: "string",
  name: "string",
  price: 0,
  quantity: 1,
  description: "string",
  date: "string",
}];

export default function Index() {
  return (
    <DashboardLayout>
      <ProductList products={products}/>
    </DashboardLayout>
  )
}
