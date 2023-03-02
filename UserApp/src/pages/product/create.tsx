import * as React from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import { Typography } from '@mui/joy';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel, { formLabelClasses } from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/joy/Box';
import Textarea from '@mui/joy/Textarea';
import { GraphQLClient, gql } from 'graphql-request';
import { Category } from '@/graphql/category/schema';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Sheet from '@mui/joy/Sheet';
import Card from '@mui/joy/Card';
import AspectRatio from '@mui/joy/AspectRatio';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/joy/IconButton';
import CardCover from '@mui/joy/CardCover';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import Stack from '@mui/joy/Stack';
import { useAppContext } from '../../context';
import Image from 'next/image';
import { useEffect } from 'react';
import Router from 'next/router';
import Layout from '../../components/layout/Layout';
import { useTranslation } from 'react-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSideProps } from "next";


interface FormElements extends HTMLFormControlsCollection {
  name: HTMLInputElement;
  description: HTMLInputElement;
  quantity: HTMLInputElement;
  price: HTMLInputElement;
}

interface ProductFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

interface PictureFormElements extends HTMLFormControlsCollection {
  picture: HTMLInputElement;
}

interface PictureFormElement extends HTMLFormElement {
  readonly elements: PictureFormElements;
}

export const getServerSideProps: GetServerSideProps = async (context) => ({
  props: {
    ...await serverSideTranslations(context.locale as string ?? 'en', ['common']),
  },
});

export default function Create() {
  const { signedInUser } = useAppContext();
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [category, setCategory] = React.useState('Choose Category');
  const array: string[] = [];
  const [pictures, setPictures] = React.useState(array);
  const [open, setOpen] = React.useState(false);

  const { t } = useTranslation('common');
  const productNamePlaceholder = t('createNewProduct.form.productNamePlaceholder');
  const categoryPlaceholder = t('createNewProduct.form.categoryPlaceholder');
  const descriptionPlaceholder = t('createNewProduct.form.descriptionPlaceholder');
  const pricePlaceholder = t('createNewProduct.form.pricePlaceholder');

  const handleCancel = (() => {
    Router.push({
      pathname: '/',
    });
  });

  useEffect(() => {
    const fetchData = async () => {
      if (!signedInUser) return;

      const graphQLClient = new GraphQLClient('http://localhost:3000/api/graphql', {
        headers: {
          Authorization: `Bearer ${signedInUser?.accessToken}`,
        },
      });

      const query = gql`
          query getAllCategories {
              category {
                  name
                  slug
              }
          }
      `;

      const data = await graphQLClient.request(query, {
        username: `${signedInUser.username}`,
      });

      setCategories(data.category);
    };

    fetchData();
  }, [signedInUser]);

  const removePicture = (index: number) => {
    const temp = [...pictures];
    temp.splice(index, 1);
    setPictures(temp);
  };

  const handleCreate = async (
    name: string,
    description: string,
    price: number,
    category: string,
    quantity: number,
    pictures: string[],
  ) => {
    const bearerToken = signedInUser?.accessToken;
    const graphQLClient = new GraphQLClient('http://localhost:3000/api/graphql', {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    });
    const query = gql`
        mutation addProduct {
            addProduct (
                name: "${name}",
                description: "${description}",
                price: ${price},
                category: "${category}",
                quantity: ${quantity},
                pictures: [${pictures.map(x => '"' + x + '"')}]
            ) {id}
        }
    `;

    await graphQLClient
      .request(query)
      .then(() => Router.push({
        pathname: '/',
      }))
      .catch(() => alert('Error creating product, Try again'));
  };

  return (
    <Layout>
      <CssVarsProvider>
        <form
          onSubmit={(event: React.FormEvent<ProductFormElement>) => {
            event.preventDefault();
            const formElements = event.currentTarget.elements;
            handleCreate(
              formElements.name.value,
              formElements.description.value,
              parseFloat(formElements.price.value),
              category,
              parseInt(formElements.quantity.value),
              pictures,
            );
          }}
        >
          <Grid container spacing={2} columns={16} sx={{ maxWidth: '100%', paddingTop: '50px' }}>
            <Grid xs={6} sx={{ paddingLeft: '50px' }}>
              <Typography aria-label="Create New Product" component="h2" fontSize="xl3" fontWeight="lg">
                {t('createNewProduct.title')}
              </Typography>
            </Grid>
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
                  {pictures.map((picture, index) => (
                    <Card variant="outlined" key={index}>
                      <AspectRatio ratio="1" sx={{ minWidth: 150 }}>
                        <Image src={picture} alt="Picture not availabe" fill />
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
                      <Button
                        size="lg"
                        variant="soft"
                        color="neutral"
                        aria-label="add"
                        onClick={() => setOpen(true)}
                        startDecorator={<PhotoCameraIcon />}
                      >
                        {t('createNewProduct.form.image')}
                      </Button>
                    </AspectRatio>
                  </Card>
                </Box>
              </Sheet>
            </Grid>
          </Grid>
          <Grid container spacing={2} columns={16} sx={{ maxWidth: '100%' }}>
            <Grid xs={6} sx={{ paddingLeft: '25px' }}>
              <Grid
                container
                direction="column"
                alignItems="stretch"
                sx={{
                  '& form': {
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                  },
                  [`& .${formLabelClasses.asterisk}`]: {
                    visibility: 'hidden',
                  },
                }}
              >
                <Grid sx={{ height: '75px' }}>
                  <FormControl required>
                    <FormLabel>
                      {t('createNewProduct.form.productName')}
                    </FormLabel>
                    <Input 
                      aria-label="Enter Name"
                      placeholder="Enter Name" type="name" name="name"
                    />
                  </FormControl>
                </Grid>
                <Grid sx={{ height: '75px' }}>
                  <FormControl required>
                    <FormLabel>
                      {t('createNewProduct.form.category')}
                    </FormLabel>
                    <Select
                      id={'category'}
                      placeholder="Choose category"
                      data-testid="category"
                      aria-label="category"
                      name="category"
                      onChange={(_, value) => setCategory(value as string)}
                    >
                      {categories?.map(({ name, slug }) => (
                        <Option value={slug} key={slug} aria-label={name}>
                          {name}
                        </Option>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid sx={{ height: '75px' }}>
                  <FormControl required>
                    <FormLabel>
                      {t('createNewProduct.form.price')}
                    </FormLabel>
                    <Input
                      type="number"
                      name="price"
                      placeholder="Enter amount"
                      aria-label="Enter Price"
                      startDecorator="$"
                      slotProps={{
                        input: {
                          min: 0,
                          step: 0.01,
                        },
                      }}
                    />
                  </FormControl>
                </Grid>
                <Grid sx={{ height: '75px' }}>
                  <FormControl required>
                    <FormLabel>
                      {t('createNewProduct.form.quantity')}
                    </FormLabel>
                    <Input
                      placeholder="1"
                      name="quantity"
                      type="number"
                      aria-label="Enter Quantity"
                      defaultValue={1}
                      slotProps={{
                        input: {
                          min: 1,
                          step: 1,
                        },
                      }}
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
            <Grid xs={10}>
              <Grid
                container
                direction="column"
                alignItems="stretch"
                sx={{
                  '& form': {
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                  },
                  [`& .${formLabelClasses.asterisk}`]: {
                    visibility: 'hidden',
                  },
                }}
              >
                <Grid sx={{ height: '250px' }}>
                  <FormControl required>
                    <FormLabel>
                      {t('createNewProduct.form.description')}
                    </FormLabel>
                    <Textarea
                      aria-label="Enter Description"
                      name="description"
                      placeholder="Enter product description"
                      minRows={8}
                      maxRows={8}
                    />
                  </FormControl>
                </Grid>
                <Grid>
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button onClick={handleCancel} fullWidth aria-label="cancel" variant="soft">
                      {t('createNewProduct.form.cancel')}
                    </Button>
                    <Button type="submit" fullWidth aria-label="create">
                      {t('createNewProduct.form.create')}
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </form>
        <Modal open={open} onClose={() => setOpen(false)}>
          <ModalDialog
            aria-labelledby="basic-modal-dialog-title"
            aria-describedby="basic-modal-dialog-description"
            sx={{ maxWidth: 500 }}
          >
            <Typography id="basic-modal-dialog-title" component="h2">
              Add new picture
            </Typography>
            <Typography id="basic-modal-dialog-description" textColor="text.tertiary">
              Fill in the url of picture
            </Typography>
            <form
              onSubmit={(event: React.FormEvent<PictureFormElement>) => {
                event.preventDefault();
                const formElements = event.currentTarget.elements;
                const picture: string = formElements.picture.value;
                setPictures([...pictures, picture]);
                setOpen(false);
              }}
            >
              <Stack spacing={2}>
                <FormControl>
                  <FormLabel>URL</FormLabel>
                  <Input autoFocus required aria-label="picture" name="picture" type="string" />
                </FormControl>
                <Button type="submit" aria-label="submit">
                  Submit
                </Button>
              </Stack>
            </form>
          </ModalDialog>
        </Modal>
      </CssVarsProvider>
    </Layout>
  );
}
