import SimpleLayout from "../../components/layout/SimpleLayout";
import { GetServerSideProps } from "next";
import { Product } from "@/graphql/product/schema";
import { ProductService } from "../../graphql/product/service";
import { Box, Stack, Typography } from "@mui/joy";
import ProductList from "../../components/product/list";

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { username } = query;
  // const [user] = await new UserService().list(username);
  return {
    props: {
      user: username,
      products: await new ProductService().list({ user: username as string })
    },
  }
}

export default function UserPage({ user, products }: { user: string, products: Product[] }) {
  return (
    <SimpleLayout>
      <Stack maxWidth="lg" margin="auto" alignItems="center">
        <Typography sx={{ pb: 40 }} level="h1">User details for {user}</Typography>
        {/* <UserDetails user={user}/> */}
        <Typography level="h3">This user&apos;s stuff:</Typography>
        <Box maxWidth={1060}>
          <ProductList products={products}/>
        </Box>
      </Stack>
    </SimpleLayout>
  )
}
