import SimpleLayout from '../../components/layout/SimpleLayout';
import { Box } from '@mui/joy';
import { useRouter } from 'next/router';

export default function UserPage() {
  const router = useRouter()
  const { username } = router.query

  return (
    <SimpleLayout>
      <Box p={10}>
        User profile of user with username {username}
      </Box>
    </SimpleLayout>
  );
}
