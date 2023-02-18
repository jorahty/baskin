import * as React from 'react';
import { Product } from '@/graphql/product/schema';
import AspectRatio from '@mui/joy/AspectRatio';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import Chip from '@mui/joy/Chip';
import Image from 'next/image';
import Link from 'next/link';
import SellIcon from '@mui/icons-material/Sell';
import Typography from '@mui/joy/Typography';
import { CardOverflow, Stack, Tooltip } from '@mui/joy';
import IconButton from '@mui/joy/IconButton';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { GraphQLClient, gql } from 'graphql-request';
import { useAppContext } from '../../context';

export default function ProductCard({ product }: { product: Product }) {
  const [selected, setSelected] = React.useState(false);
  const [hide, setHide] = React.useState(true);
  const { signedInUser } = useAppContext();

  React.useEffect(() => {
    const fetchData = async () => {
      if (!signedInUser) {
        setHide(true);
        return;
      } else {
        const bearerToken = signedInUser.accessToken;
        const graphQLClient = new GraphQLClient('http://localhost:3000/api/graphql', {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
        });

        const query = gql`query getFavorites {getFavorites (product: "${product.id}") { product }}`;
        const data = await graphQLClient.request(query);

        if (data.getFavorites.length != 0) {
          setSelected(true);
        }
        setHide(false);
      }
    };
    fetchData();
  }, [signedInUser, product.id]);

  const setFavorite = async () => {
    const bearerToken = signedInUser?.accessToken;
    const graphQLClient = new GraphQLClient('http://localhost:3000/api/graphql', {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    });
    if (!selected) {
      setSelected(!selected);
      const query = gql`mutation favorite {favorite (product: "${product.id}") { product }}`;
      await graphQLClient.request(query);
    } else {
      setSelected(!selected);
      const query = gql`mutation unfavorite {unfavorite (product: "${product.id}") { product }}`;
      await graphQLClient.request(query);
    }
  };

  return (
    <Card variant="outlined">
      <CardOverflow>
        <Link href={`/product/${product.id}`}>
          <AspectRatio minHeight="269px">
            <Image
              alt={product.name}
              src={product.pictures[0]}
              fill
            />
          </AspectRatio>
        </Link>
        {product.discount > 0 && (
          <Box
            sx={{
              position: 'absolute',
              zIndex: 2,
              left: '5px',
              top: '5px',
            }}
          >
            <Chip variant="solid" color="danger" startDecorator={<SellIcon />}>
              {product.discount * 100}% off!
            </Chip>
          </Box>
        )}
        {hide ? (
          <></>
        ) : (
          <IconButton
            aria-label="favorite"
            size="md"
            // variant="solid"
            color="danger"
            onClick={setFavorite}
            sx={{
              position: 'absolute',
              zIndex: 2,
              borderRadius: '50%',
              right: '1rem',
              top: 0,
              transform: 'translateY(40%)',
            }}
          >
            {selected ? (
              <FavoriteIcon aria-label="favorited" />
            ) : (
              <FavoriteBorderIcon aria-label="notfavorited" />
            )}
          </IconButton>
        )}
      </CardOverflow>
      <Stack direction="row" pt={1} alignItems="flex-end">
        <Box flexGrow={1}>
          {product.discount ? (
            <Typography fontSize="lg" fontWeight="lg" color="danger">
              {`$${(product.price - product.price * product.discount).toFixed(2)} `}
              <Typography fontWeight="md" color="neutral" sx={{ textDecoration: 'line-through' }}>
                ${product.price.toFixed(2)}
              </Typography>
            </Typography>
          ) : (
            <Typography fontSize="lg" fontWeight="lg">
              ${product.price.toFixed(2)}
            </Typography>
          )}
          <Typography>{product.name}</Typography>
        </Box>
        <Tooltip title={`${product.user}`} variant="outlined">
          <Link href={`/user/${product.user}`}>
            <Avatar src={`https://robohash.org/${product.user}`} />
          </Link>
        </Tooltip>
      </Stack>
    </Card>
  );
}
