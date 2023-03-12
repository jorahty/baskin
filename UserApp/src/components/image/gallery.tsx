import { AspectRatio, Box } from '@mui/joy';
import Image from 'next/image';
import { useState } from 'react';

interface Props {
  images: string[];
}

export default function ImageGallery({ images }: Props) {
  const [selected] = useState(images[0]);

  return (
    <Box>
      <AspectRatio ratio="1" sx={{ borderTopRightRadius: 0 }}>
        <Image alt="" src={`http://localhost:4001/${selected}.jpeg`} fill />
      </AspectRatio>
    </Box>
  );
}
