import { Container, Typography } from '@mui/joy';
import * as React from 'react';
import ProductImageList from '../../components/common/ProductImageList';
import Grid from '@mui/material/Unstable_Grid2';
import ProductInputs from '../../components/common/ProductInputs';
import ProductTextarea from '../../components/common/ProductTextarea';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import { CssVarsProvider } from '@mui/joy/styles';
import { Product } from '../../graphql/product/schema';
import { useTranslation } from 'next-i18next';

interface FormElements extends HTMLFormControlsCollection {
  name: HTMLInputElement;
  description: HTMLInputElement;
  quantity: HTMLInputElement;
  price: HTMLInputElement;
}

interface ProductFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

export default function CreateLayout({
  product,
  handleCancel,
  handleCreate,
}: {
  product?: Product;
  handleCancel: ()=>void;
  handleCreate: (name: string, description: string,
                 price: number, category: string,
                 quantity: number, pictures: File[]) => Promise<void>;
}) {
  const [category, setCategory] = React.useState('Choose Category');
  const [pictures, setPictures] = React.useState<File[]>([]);

  const { t } = useTranslation('common');

  return (
    <CssVarsProvider>
      <Container style={{ margin: '50px auto' }}>
        <Typography aria-label="Create New Product" component="h2" fontSize="xl3" fontWeight="lg">
          {!product ? t('createNewProduct.title') : 'Other'}
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
              pictures,
            );
          }}
        >
          <ProductImageList product={product} updatedImages={setPictures} />

          <Grid container spacing={2} columns={16} sx={{ flexGrow: 1 }}>
            <ProductInputs product={product} t={t} setCategory={setCategory} />

            <ProductTextarea data={product?.description} t={t} />
          </Grid>
          <Box sx={{ display: 'flex', gap: 2, marginTop: { xs: 5, md: 10 } }}>
            <Button onClick={handleCancel} fullWidth aria-label="cancel" variant="soft">
              {t('createNewProduct.form.cancel')}
            </Button>
            <Button type="submit" fullWidth aria-label="create">
              {!product ? t('createNewProduct.form.create') : 'Submit'}
            </Button>
          </Box>
        </form>
      </Container>
    </CssVarsProvider>
  );
}
