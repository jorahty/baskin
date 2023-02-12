import SimpleLayout from "../../components/layout/SimpleLayout";
import { GetServerSideProps } from "next";
import { Product } from "@/graphql/product/schema";
import { ProductService } from "../../graphql/product/service";
import { Avatar, Box, Stack, Typography } from "@mui/joy";
import ProductList from "../../components/product/list";
import { UserService } from "../../graphql/user/service";
import { User } from "@/graphql/user/schema";

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { username } = query;
  const [user] = await new UserService().list(username as string);
  return {
    props: {
      user: user,
      products: await new ProductService().list({ user: username as string })
    },
  }
}

export default function UserPage(
  { user, products }: { user: User, products: Product[] }
) {
  return (
    <SimpleLayout>
      <Stack
        maxWidth="lg"
        margin="auto"
        alignItems="center"
        pt={6}
        gap={4}
        flexWrap="wrap"
      >
        <Stack direction="row">
          <Avatar
            src={`https://robohash.org/${user.username}`}
            sx={{ width: 280, height: 280 }}
          />
          <Box p={6}>
            <Typography level="h1" fontWeight={800}>{user.name}</Typography>
            <Typography level="body2" fontSize="xl">{user.username}</Typography>
          </Box>
        </Stack>
        <Box width="100%">
          <ProductList products={products}/>
        </Box>
      </Stack>
    </SimpleLayout>
  )
}
