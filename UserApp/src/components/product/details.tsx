import { Product } from '@/graphql/product/schema';
import {
  AspectRatio,
  Avatar,
  Box,
  Button,
  Card,
  CardOverflow,
  Chip,
  Divider,
  Input,
  Stack,
  Typography,
} from '@mui/joy';
import Image from 'next/image';
import Link from 'next/link';
import { gql, GraphQLClient } from 'graphql-request';
import { useAppContext } from '../../context';
import { Chat } from '../../graphql/chat/schema';

interface FormElements extends HTMLFormControlsCollection {
  message: HTMLInputElement;
}

interface MessageFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

export default function ProductDetails({ product }: { product: Product }) {
  const { signedInUser } = useAppContext();

  const handleSubmit = async (message: string) => {
    const graphQLClient = new GraphQLClient('http://localhost:3000/api/graphql', {
      headers: {
        Authorization: `Bearer ${signedInUser?.accessToken}`,
      },
    });

    const mutation = gql`
        mutation addChat {
          addChat (name: "${product.name}") { 
            id
            name
          }
        }
      `;

    const data: { addChat: Chat } = await graphQLClient.request(mutation);
    console.log(message, data.addChat);
  };

  return (
    <Box maxWidth="lg" margin="auto" p={4}>
      <Typography pb={2} level="h2">
        {product.name}
      </Typography>
      <Card
        variant="outlined"
        sx={{
          borderRadius: 'xl',
          gap: 4,
          pb: 0,
          flexDirection: {
            md: 'row',
            sm: 'column',
          },
        }}
      >
        <CardOverflow sx={{ flexGrow: 1 }}>
          <AspectRatio ratio="1" sx={{ borderTopRightRadius: 0 }}>
            <Image alt={product.name} src={`http://localhost:4001/${product.images[0]}.jpeg`} fill />
          </AspectRatio>
        </CardOverflow>
        <Stack
          gap={2}
          pb={2}
          sx={{
            width: {
              md: 'min(500px, 30vw)',
              sm: '100%',
            },
          }}
        >
          {product.discount > 0 ? (
            <Box>
              <Typography level="h2">
                {`$${(product.price - product.price * product.discount).toFixed(2)} `}
              </Typography>
              <Typography level="h6">
                {`Listed Price: `}
                <Typography sx={{ textDecoration: 'line-through' }}>
                  ${product.price.toFixed(2)}
                </Typography>
                <Typography color="danger" fontWeight="lg">
                  {` Save ${product.discount * 100}% off!`}
                </Typography>
              </Typography>
            </Box>
          ) : (
            <Typography level="h2">${product.price.toFixed(2)}</Typography>
          )}
          <Link href={`/user/${product.user}`}>
            <Stack direction="row" alignItems="center" gap={1}>
              <Avatar src={`https://robohash.org/${product.user}`} />
              <Typography>{product.user}</Typography>
            </Stack>
          </Link>
          <Stack direction="row" alignItems="center" gap={1}>
            <Link href={`/category/${product.category}`}>
              <Chip variant="soft">{product.category}</Chip>
            </Link>
            <Typography level="body2">{new Date(product.date).toLocaleDateString('en-US')}</Typography>
          </Stack>
          <Divider />
          <Typography>{product.description.slice(0, 280)}</Typography>
          <form
            onSubmit={(event: React.FormEvent<MessageFormElement>) => {
              event.preventDefault();
              const formElements = event.currentTarget.elements;
              handleSubmit(formElements.message.value);
            }}
            style={{ marginTop: 'auto', backgroundColor: 'background.body' }}
          >
            <Stack direction="column" spacing={1}>
              <Input
                name="message"
                placeholder="Hi, is this available?"
                defaultValue="Hi, is this available?"
              />
              <Button size="lg" type="submit">
                Send
              </Button>
            </Stack>
          </form>
        </Stack>
      </Card>
    </Box>
  );
}
