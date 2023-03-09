import Grid from '@mui/material/Unstable_Grid2';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Textarea from '@mui/joy/Textarea';
import * as React from 'react';
import { TFunction } from 'i18next';

export default function ProductTextarea({
  t,
  data,
}: {
  t: TFunction<'common', undefined, 'common'>;
  data?: string;
}) {
  return (
    <Grid xs={16} md={10}>
      <FormControl required style={{ height: '100%' }}>
        <FormLabel>{t('createNewProduct.form.description')}</FormLabel>
        <Textarea
          aria-label="Enter Description"
          name="description"
          placeholder="Enter product description"
          minRows={8}
          maxRows={8}
          style={{ height: '100%' }}
          defaultValue={data}
        />
      </FormControl>
    </Grid>
  );
}
