import { render } from '@testing-library/react'

import Layout from "../../components/Layout";

const renderView = async () => {
  render(<Layout />)
};

test('Layout Renders', async () => {
  renderView();
});
