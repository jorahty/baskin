import * as React from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import { Container, Typography } from '@mui/joy';
import Button from '@mui/joy/Button';
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/joy/Box';
import { gql, GraphQLClient } from 'graphql-request';
import Router from 'next/router';
import Layout from '../../components/layout/Layout';
import ProductImageList from '../../components/common/ProductImageList';
import AuthGuard from '../../components/common/AuthGuard';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import fetch from 'node-fetch';
import FormData from 'form-data';
import ProductInputs from '../../components/common/ProductInputs';
import ProductTextarea from '../../components/common/ProductTextarea';
import { useAppContext } from '../../context';
import { GetStaticProps } from 'next';

export const getStaticProps: GetStaticProps = async context => {
  return {
    props: {
      ...(await serverSideTranslations(context.locale as string ?? 'en', ['common'])),
      locale: context.locale as string ?? 'en',
    },
  };
};

interface FormElements extends HTMLFormControlsCollection {
  name: HTMLInputElement;
  description: HTMLInputElement;
  quantity: HTMLInputElement;
  price: HTMLInputElement;
}

interface ProductFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

export default function Create({ locale }: { locale: string }) {
  const [category, setCategory] = React.useState('Choose Category');
  const [images, setImages] = React.useState<File[]>([]);

  const { signedInUser } = useAppContext();
  const { t } = useTranslation('common');

  const handleCancel = () => {
    Router.push({
      pathname: '/',
    });
  };

  const handleCreate = async (
    name: string,
    description: string,
    price: number,
    category: string,
    quantity: number,
    images: File[],
  ) => {
    // const bearerToken = signedInUser?.accessToken;
    const formData: FormData = new FormData();
    images.map((picture: File) => {
      formData.append('files', picture, picture.name);
    });

    const imageData = await fetch('http://localhost:4001/api/v0/image', {
      method: 'POST',
      body: formData,
    });

    const imagesIdArr: string[] = await imageData.json();

    const graphQLClient = new GraphQLClient('http://localhost:4002/graphql', {
      // headers: {
      //   Authorization: `Bearer ${bearerToken}`,
      // },
    });
    const query = gql`
        mutation addProduct {
            addProduct (input: {
                user: "${signedInUser?.username}",
                name: "${name}",
                description: "${description}",
                price: ${price},
                category: "${category}",
                quantity: ${quantity},
                images: [${imagesIdArr.map((p: string) => `"${p}"`)}],
                discount: 0,
            }) {id}
        }
    `;

    await graphQLClient
      .request(query)
      .then(() => Router.push({
        pathname: '/',
      }),
      )
      .catch(() => {
        imagesIdArr.forEach((pic: string) => {
          fetch(`http://localhost:4001/api/v0/image/${pic}`, {
            method: 'DELETE',
          });
        });
        alert('Error creating product, Try again');
      });
  };

  return (
    <AuthGuard>
      <Layout locale={locale}>
        <CssVarsProvider>
          <Container style={{ margin: '50px auto' }}>
            <Typography aria-label="Create New Product" component="h2" fontSize="xl3" fontWeight="lg">
              {t('createNewProduct.title')}
            </Typography>
          </Container>
          <Container style={{ paddingBottom: 50 }}>
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
                  images,
                );
              }}
            >
              <ProductImageList updatedImages={setImages} />

              <Grid container spacing={2} columns={16} sx={{ flexGrow: 1 }}>
                <ProductInputs t={t} setCategory={setCategory} />

                <ProductTextarea t={t} />
              </Grid>
              <Box sx={{ display: 'flex', gap: 2, marginTop: { xs: 5, md: 10 } }}>
                <Button onClick={handleCancel} fullWidth aria-label="cancel" variant="soft">
                  {t('createNewProduct.form.cancel')}
                </Button>
                <Button type="submit" fullWidth aria-label="create">
                  {t('createNewProduct.form.create')}
                </Button>
              </Box>
            </form>
          </Container>
        </CssVarsProvider>
      </Layout>
    </AuthGuard>
  );
}
