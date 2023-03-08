import { useEffect, useState } from 'react';
import Typography from '@mui/joy/Typography';
import Stack from '@mui/joy/Stack';
import Container from '@mui/joy/Container';
import AttributeTable from './AttributeTable';

import { useAppContext } from '../../context';
import { Attribute } from '@/graphql/attribute/schema';
import { gql, GraphQLClient } from 'graphql-request';

export default function AttributePage() {
  const { signedInUser } = useAppContext();
  const [attributes, setAttributes] = useState<Attribute[]>([]);

  useEffect(() => {
    if (!signedInUser) return;
    const fetchData = async () => {
      const graphQLClient = new GraphQLClient('http://localhost:3001/api/graphql', {
        headers: {
          Authorization: `Bearer ${signedInUser?.accessToken}`,
        },
      });

      const query = gql`
        query getAllAttributes {
          attribute {
            id
            category
            name
            type
            min
            max
            step
            symbol
            values
          }
        }
      `;

      const data = await graphQLClient.request(query);

      setAttributes(data.attribute);
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
      >
        All Attributes
      </Typography>
      <Stack height={'80vh'}>
        <AttributeTable attributes={attributes} />
      </Stack>
    </Container>
  );
}