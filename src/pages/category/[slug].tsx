import DashbaordLayout from '../../components/layout/DashboardLayout';
import { useRouter } from 'next/router';
import ProductList from '../../components/product/list';

export default function CategoryPage() {
  const router = useRouter();
  const slug = router.query.slug as string;

  return (
    <DashbaordLayout>
      <ProductList category={slug}/>
    </DashbaordLayout>
  );
}
