import { render } from '@testing-library/react'

import DashboardLayout from "../../../../components/layout/DashboardLayout";

const renderView = async () => {
  render(
    <DashboardLayout>
      <p>Children components go here.</p>
    </DashboardLayout>
  )
};

test('Renders', async () => {
  renderView();
});
