import { render } from '@testing-library/react'
import Header from "../../../../components/layout/Header";

const renderView = async () => {
  render(
    <Header />
  )
};

test('Renders', async () => {
  renderView();
});
