import Typography from "@mui/joy/Typography";
import {Divider, Sheet, Stack} from "@mui/joy";
import Button from "@mui/joy/Button";

export default function CartCharge() {

  return (
    <Sheet
      style={{
        padding: "20px",
        borderRadius: "6px",
        flexGrow: 1
      }}
    >
      <Typography
        level={"h2"}
        fontSize={32}
      >
        Total
      </Typography>

      <Divider style={{
        margin: "15px 0"
      }} />

      <Stack rowGap={2} >
        <Stack direction={"row"} justifyContent={"space-between"}>
          <Typography>2 items</Typography>
          <Typography>$5,000.00</Typography>
        </Stack>
        <Stack direction={"row"} justifyContent={"space-between"}>
          <Typography>Sales Tax</Typography>
          <Typography>$10.00</Typography>
        </Stack>
        <Stack direction={"row"} justifyContent={"space-between"}>
          <Typography>Delivery</Typography>
          <Typography>$12.90</Typography>
        </Stack>
      </Stack>

      <Divider style={{
        margin: "15px 0"
      }} />

      <Stack direction={"row"} justifyContent={"space-between"}>
        <Typography>Sub-Total</Typography>
        <Typography>$5.022.90</Typography>
      </Stack>

      <Button
        color={"primary"}
        fullWidth={true}
        style={{
          marginTop: "20px"
        }}
      >
        Checkout
      </Button>
    </Sheet>
  );
}
