import Grid from '@mui/material/Unstable_Grid2';
import FormLabel, { formLabelClasses } from '@mui/joy/FormLabel';
import FormControl from '@mui/joy/FormControl';
import Input from '@mui/joy/Input';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import * as React from 'react';
import { Category } from '../../graphql/category/schema';
import { TFunction } from 'i18next';
import { useEffect } from 'react';
import { gql, GraphQLClient } from 'graphql-request';
import { useAppContext } from '../../context';

export default function ProductInputs({
  t,
  setCategory,
}: {
  t: TFunction<'common', undefined, 'common'>;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
}) {
  const { signedInUser } = useAppContext();
  const [categories, setCategories] = React.useState<Category[]>([]);

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

      console.log(data);

      setCategories(data.category);
    };

    fetchData();
  }, [signedInUser]);

  return (
    <Grid xs={16} md={6}>
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
            <FormLabel>{t('createNewProduct.form.productName')}</FormLabel>
            <Input aria-label="Enter Name" placeholder="Enter Name" type="name" name="name" />
          </FormControl>
        </Grid>
        <Grid sx={{ height: '75px' }}>
          <FormControl required>
            <FormLabel>{t('createNewProduct.form.category')}</FormLabel>
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
            <FormLabel>{t('createNewProduct.form.price')}</FormLabel>
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
            <FormLabel>{t('createNewProduct.form.quantity')}</FormLabel>
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
  );
}
