import { render } from '@testing-library/react'

import SimpleLayout from "../../../components/SimpleLayout";

const renderView = async () => {
  render(
    <SimpleLayout>
      <p>Children components go here.</p>
    </SimpleLayout>
  )
};

test('Renders', async () => {
  renderView();
});
