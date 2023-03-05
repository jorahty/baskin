import { Input, Button, Stack } from '@mui/joy';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SendRoundedIcon from '@mui/icons-material/SendRounded';

export default function MessageInput() {
  return (
    <Stack direction="row" spacing={1}>
      <Button variant="plain" sx={{ p: 1, borderRadius: '50%' }}>
        <AddCircleIcon />
      </Button>
      <Input fullWidth size="md" placeholder="Aa" sx={{ borderRadius: '120px' }} />
      <Button variant="plain" sx={{ p: 1, borderRadius: '50%' }}>
        <SendRoundedIcon />
      </Button>
    </Stack>
  );
}
