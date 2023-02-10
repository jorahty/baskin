import { render } from '@testing-library/react'
import Sidebar from "../../../../components/layout/Sidebar";

const renderView = async () => {
  render(
    <Sidebar />
  )
};

test('Renders', async () => {
  renderView();
});
