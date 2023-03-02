import { Divider, Option, Select, Sheet, Stack } from '@mui/joy';
import Link from 'next/link';
import Image from 'next/image';
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';
import ClearIcon from '@mui/icons-material/Clear';

export default function CartContent() {
  return (
    <Sheet
      style={{
        padding: '20px',
        borderRadius: '6px',
      }}
    >
      <Typography level={'h1'} fontSize={32}>
        Your Cart
      </Typography>

      <Divider
        style={{
          margin: '15px 0',
        }}
      />

      <Stack
        style={{ padding: '10px 0' }}
        gap={2}
        sx={{
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: { xs: 'center', md: 'flex-start' },
          minWidth: '560px',
        }}
      >
        <Link href={'./'}>
          <Image src={'https://picsum.photos/200'} alt={'Image'} width={200} height={200} />
        </Link>
        <Stack flexGrow={1} rowGap={2}>
          <Typography component={'strong'}>$1,000</Typography>
          <Typography>Resistol Cowboy Hat</Typography>
          <Stack direction={'row'} alignItems={'center'} gap={2}>
            <Typography>Quantity:</Typography>
            <Select
              color="neutral"
              disabled={false}
              size="md"
              variant="outlined"
              value={'1'}
              style={{ maxWidth: '70px' }}
            >
              <Option value={'1'}>1</Option>
            </Select>
          </Stack>
        </Stack>

        <Button
          variant="outlined"
          color={'danger'}
          startDecorator={<ClearIcon />}
          style={{ height: 'fit-content' }}
          sx={{
            width: { xs: '100%', md: 'auto' },
          }}
        >
          Remove
        </Button>
      </Stack>
    </Sheet>
  );
}
