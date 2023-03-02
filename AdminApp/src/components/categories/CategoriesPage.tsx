import { Container, Stack } from '@mui/joy';
import Typography from '@mui/joy/Typography';
import { useEffect, useState } from 'react';
import { Category } from '@/graphql/category/schema';
import { gql, GraphQLClient } from 'graphql-request';
import CategoryTable from './CategoryTable';

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const graphQLClient = new GraphQLClient('http://localhost:3001/api/graphql');

      const query = gql`
        query getAllCategories {
          category {
            name
            slug
          }
        }
      `;

      const data = await graphQLClient.request(query);

      setCategories(data.category);
    };

    fetchData();
  }, []);

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
      >
        All Categories
      </Typography>
      <Stack height={'80vh'}>
        <CategoryTable categories={categories} />
      </Stack>
    </Container>
  );
}