import { AspectRatio, IconButton } from '@mui/joy';
import Image from 'next/image';
import { useState } from 'react';
import ArrowForwardIosRounded from '@mui/icons-material/ArrowForwardIosRounded';
import ArrowBackIosRounded from '@mui/icons-material/ArrowBackIosRounded';

interface Props {
  images: string[];
}

export default function ImageGallery({ images }: Props) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  function handleChange(type: string) {
    if (type === 'previous') {
      if (selectedIndex > 0) {
        setSelectedIndex(selectedIndex - 1);
      } else {
        setSelectedIndex(images.length - 1);
      }
    } else {
      setSelectedIndex((selectedIndex + 1) % images.length);
    }
  }

  return (
    <>
      {['previous', 'next'].map(type => (
        <IconButton
          key={type}
          aria-label={type}
          onClick={() => handleChange(type)}
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
      ))}
      <AspectRatio
        ratio="1"
        sx={{
          borderRadius: {
            md: 'var(--joy-radius-xl) 0 0 var(--joy-radius-xl)',
          },
        }}>
        <Image alt="" src={`http://localhost:4001/${images[selectedIndex]}.jpeg`} fill />
      </AspectRatio>
    </>
  );
}
