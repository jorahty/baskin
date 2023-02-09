import { render } from '@testing-library/react'

import Layout from "../../components/Layout";

const renderView = async () => {
  render(
    <>
      <Layout>
        <p>Children components go here.</p>
      </Layout>
    </>
  )
};

test('Layout Renders', async () => {
  renderView();
});
