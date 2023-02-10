import ModeToggle from "../components/layout/ModeToggle";
import { Button } from "@mui/joy";
import DashboardLayout from "../components/layout/DashboardLayout";

export default function Index() {
  return (
    <DashboardLayout>
      <Button>Hello World!</Button>
      <ModeToggle />
      All the main content can go here!
    </DashboardLayout>
  )
}
