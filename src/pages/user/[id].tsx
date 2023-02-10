import SimpleLayout from '../../components/layout/SimpleLayout';
import { Box } from '@mui/joy';
import { useRouter } from 'next/router';

export default function UserPage() {
  const router = useRouter()
  const { id } = router.query

  return (
    <SimpleLayout>
      <Box data-testid="test" p={10}>
        User profile of user with id {id}
      </Box>
    </SimpleLayout>
  );
}
