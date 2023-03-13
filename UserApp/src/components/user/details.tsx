import { User } from '@/graphql/user/schema';
import { Avatar, Box, Stack, Typography } from '@mui/joy';

export default function UserDetails({ user }: { user: User }) {
  return (
    <Stack direction="row" flexWrap="wrap" justifyContent={{ xs: 'center', md: 'normal' }}>
      <Avatar src={`https://robohash.org/${user.username}`} sx={{ width: 280, height: 280 }} />
      <Box p={5}>
        <Typography level="h1" fontWeight={600}>
          {user.name}
        </Typography>
        <Typography level="body2" fontSize="xl">
          {user.username}
        </Typography>
      </Box>
    </Stack>
  );
}
