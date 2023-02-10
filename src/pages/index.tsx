import ModeToggle from "../components/ModeToggle";
import { Button } from "@mui/joy";
import DashboardLayout from "../components/DashboardLayout";

export default function Index() {
  return (
    <DashboardLayout>
      <Button>Hello World!</Button>
      <ModeToggle />
    </DashboardLayout>
  )
}
