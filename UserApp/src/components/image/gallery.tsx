import { AspectRatio, Box, IconButton, Tooltip } from '@mui/joy';
import Image from 'next/image';
import { useState } from 'react';
import ArrowForwardIosRounded from '@mui/icons-material/ArrowForwardIosRounded';
import ArrowBackIosRounded from '@mui/icons-material/ArrowBackIosRounded';

interface Props {
  images: string[];
}

export default function ImageGallery({ images }: Props) {
  const [selected] = useState(images[0]);

  return (
    <Box>
      {['previous', 'next'].map(type => (
        <Tooltip title={`View ${type} image`} key={type}>
          <IconButton
            variant="outlined"
            color="neutral"
            sx={{
              zIndex: 10,
              bgcolor: 'background.surface',
              borderRadius: '50%',
              position: 'absolute',
              right: type === 'next' ? '1rem' : 'auto',
              left: type === 'next' ? 'auto' : '1rem',
              top: '50%',
              transform: 'translateY(-50%)',
            }}
          >
            {type === 'next' ? <ArrowForwardIosRounded /> : <ArrowBackIosRounded />}
          </IconButton>
        </Tooltip>
      ))}
      <AspectRatio ratio="1" sx={{ borderTopRightRadius: 0 }}>
        <Image alt="" src={`http://localhost:4001/${selected}.jpeg`} fill />
      </AspectRatio>
    </Box>
  );
}
