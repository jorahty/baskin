import {Container, Stack} from "@mui/joy";
import CartContent from "../components/cart/CartContent";
import CartCharge from "../components/cart/CartCharge";
import Layout from "../components/layout/Layout";

/* How to change the icon of the dropdown
* https://stackoverflow.com/questions/74671428/mui-v412-4-override-default-icon-for-component-like-select-chevron-or-chip-on */
export default function Cart() {

  return(
    <Layout>
      <Container>
        <Stack
          sx={{
            flexDirection: {md: "row"},
            rowGap: {xs: "20px", md: "0"},
            columnGap: {xs: "0", md: "20px"},
            margin: "20px auto",
            alignItems: {md: "flex-start"},
          }}
        >
          <CartContent />

          <CartCharge />
        </Stack>
      </Container>
    </Layout>
  );
}
