import { Button, Container, Link, Stack } from '@mui/joy';
import Typography from '@mui/joy/Typography';
import { AddCircle } from '@mui/icons-material';
import { useAppContext } from '../../../context';
import { useEffect, useState } from 'react';
import { Product } from '@/graphql/product/schema';
import { gql, GraphQLClient } from 'graphql-request';
import ProductTable from './ProductTable';
// import Create from './Create';
import { useTranslation } from 'next-i18next';

export default function ProductMenu() {
  const { signedInUser } = useAppContext();
  const [products, setProducts] = useState<Product[]>([]);

  const { t } = useTranslation('common');

  useEffect(() => {
    if (!signedInUser) return;
    const fetchData = async () => {
      const graphQLClient = new GraphQLClient('http://localhost:3000/api/graphql', {
        headers: {
          Authorization: `Bearer ${signedInUser?.accessToken}`,
        },
      });

      const query = gql`
        query getAllProducts($username: String!) {
          product(user: $username) {
            price
            pictures
            date
            description
            name
            category
            quantity
            discount
            id
          }
        }
      `;

      const data = await graphQLClient.request(query, {
        username: `${signedInUser.username}`,
      });

      setProducts(data.product);
    };

    fetchData();
  }, [signedInUser]);

  return (
    <Container sx={{ margin: '16px auto' }}>
      <Typography
        component="h1"
        sx={{
          fontSize: '2rem',
          fontWeight: 'bold',
          color: 'primary',
          mb: 4,
        }}
        aria-label="Products"
      >
        {t('dashboard.products.title')}
      </Typography>
      <Stack>
        <Button
          startDecorator={<AddCircle />}
          sx={{
            width: { md: 'fit-content' },
          }}
          component={Link}
          aria-label="Add Product"
          href={'/product/create'}
        >
          {t('dashboard.products.addProduct')}
        </Button>
        <ProductTable products={products} />
      </Stack>
    </Container>
  );
}
