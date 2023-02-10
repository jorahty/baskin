import DashbaordLayout from '../../components/layout/DashboardLayout';
import { Box } from '@mui/joy';
import { useRouter } from 'next/router';

export default function CategoryPage() {
  const router = useRouter()
  const { id } = router.query

  return (
    <DashbaordLayout>
      <Box data-testid="test" p={10}>
        List by category id: {id}
      </Box>
    </DashbaordLayout>
  );
}
