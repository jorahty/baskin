import SimpleLayout from '../../components/layout/SimpleLayout';
import { Box } from '@mui/joy';
import { useRouter } from 'next/router';

export default function ProductPage() {
  const router = useRouter()
  const { id } = router.query

  return (
    <SimpleLayout>
      <Box data-testid="test" p={10}>
        Show detials of product with id {id}
      </Box>
    </SimpleLayout>
  );
}
