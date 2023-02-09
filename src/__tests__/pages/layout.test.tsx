import { render, screen } from '@testing-library/react'

import Index from '../../pages/index';
import Layout from "../../components/Layout";

const renderView = async () => {
  render(<Layout />)
};

test('Layout Renders', async () => {
  renderView();
});
