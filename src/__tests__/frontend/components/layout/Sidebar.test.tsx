import { render } from '@testing-library/react'
import Sidebar from "../../../../components/layout/Sidebar";

jest.mock('next/router', () => ({
  useRouter() {
    return ({
      query: { id: '123' },
    });
  },
}));

const renderView = async () => {
  render(
    <Sidebar />
  )
};

test('Renders', async () => {
  renderView();
});
