import { Box } from '@mui/joy';

export default function BackDrop({ handleClick }: { handleClick: () => void }) {
  return (
    <Box
      onClick={handleClick}
      sx={{
        display: { md: 'none' },
        position: 'absolute',
        width: '100%',
        height: '100%',
        color: 'rgba(0, 0, 0, 0.87)',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      }}
    />
  );
}
