import * as React from 'react';
import Sheet from '@mui/joy/Sheet';
import Box from '@mui/joy/Box';
import { CardCover, IconButton } from '@mui/joy';
import Card from '@mui/joy/Card';
import AspectRatio from '@mui/joy/AspectRatio';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import Input from '@mui/joy/Input';
import Grid from '@mui/material/Unstable_Grid2';
import CloseIcon from '@mui/icons-material/Close';
import Image from 'next/image';
import { useEffect } from 'react';
import { Product } from '../../graphql/product/schema';
import fetch from 'node-fetch';

export default function ProductImageList({
  updatedImages,
  product,
}: {
  updatedImages: React.Dispatch<React.SetStateAction<File[]>>;
  product?: Product;
}) {
  const [pictures, setPictures] = React.useState<File[]>([]);
  const [existingPictures, setExistingPictures] = React.useState<string[]>([]);
  const validTypes = ['image/jpeg', 'image/png', 'image/webp'];

  // Update existingPictures ONLY IF `product` exists
  useEffect(() => {
    if (product) {
      setExistingPictures(product.images);
    }
  }, []);

  // Update parent with the latest images
  useEffect(() => {
    updatedImages(pictures);
  }, [pictures]);

  // Removes an image based off the index
  const removePicture = (index: number) => {
    const temp = [...pictures];
    temp.splice(index, 1);
    setPictures(temp);
  };

  // Deletes the picture from the DB and updates `product` pictures
  // array to have the latest array
  const deletePicture = (index: number) => {
    if (product) {
      const temp = [...existingPictures];
      temp.splice(index, 1);
      fetch(`http://localhost:4001/api/v0/image/${temp[index]}`, {
        method: 'DELETE',
      });
      setExistingPictures(temp);
      product.images = temp;
    }
  };

  return (
    <Grid xs={10}>
      <Sheet
        variant="outlined"
        sx={{
          minHeight: '150px',
          borderRadius: 'sm',
          p: 2,
          mb: 3,
        }}
      >
        <Box
          sx={theme => ({
            display: 'flex',
            flexWrap: 'wrap',
            gap: 2,
            '& > div': {
              boxShadow: 'none',
              '--Card-padding': '0px',
              '--Card-radius': theme.vars.radius.sm,
            },
          })}
        >
          {product &&
            existingPictures.map((id: string, index: number) => (
              <Card variant="outlined" key={index}>
                <AspectRatio ratio="1" sx={{ minWidth: 150 }}>
                  <Image src={`http://localhost:4001/${id}.jpeg`} alt="Picture not available" fill />
                </AspectRatio>
                <CardCover>
                  <Box>
                    <Box
                      sx={{
                        p: 1,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1.5,
                        flexGrow: 1,
                        alignSelf: 'flex-start',
                      }}
                    >
                      <IconButton
                        aria-label={'existing-remove-' + index}
                        value="pict"
                        size="sm"
                        color="neutral"
                        onClick={() => deletePicture(index)}
                      >
                        <CloseIcon />
                      </IconButton>
                    </Box>
                  </Box>
                </CardCover>
              </Card>
            ))}
          {pictures.map((picture, index) => (
            <Card variant="outlined" key={index}>
              <AspectRatio ratio="1" sx={{ minWidth: 150 }}>
                <Image src={URL.createObjectURL(picture)} alt="Picture not available" fill />
              </AspectRatio>
              <CardCover>
                <Box>
                  <Box
                    sx={{
                      p: 1,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1.5,
                      flexGrow: 1,
                      alignSelf: 'flex-start',
                    }}
                  >
                    <IconButton
                      aria-label={'remove' + index}
                      value="pict"
                      size="sm"
                      color="neutral"
                      onClick={() => removePicture(index)}
                    >
                      <CloseIcon />
                    </IconButton>
                  </Box>
                </Box>
              </CardCover>
            </Card>
          ))}

          <Card variant="outlined">
            <AspectRatio ratio="1" sx={{ minWidth: 150 }}>
              <FormControl sx={{}}>
                <FormLabel sx={{ margin: 'auto', flex: 1, width: '100%', cursor: 'pointer' }}>
                  <PhotoCameraIcon />
                  Add Picture
                </FormLabel>
                <Input
                  aria-label={'add product image'}
                  type={'file'}
                  sx={{ display: 'none' }}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    if (e.target.files) {
                      const uploadedFile = e.target.files[0];
                      if (!uploadedFile) return;

                      // File checks
                      if (uploadedFile.size / 1024 / 1024 > 6) {
                        // Has to be smaller than ~6MB
                        alert('File too large!');
                      } else if (!validTypes.find((img: string) => img === uploadedFile.type)) {
                        alert('Image type not supported.');
                      } else {
                        setPictures([...pictures, e.target.files[0]]);
                      }
                    }
                  }}
                />
              </FormControl>
            </AspectRatio>
          </Card>
        </Box>
      </Sheet>
    </Grid>
  );
}
