import LangSelect from '../../../../components/common/LangSelect';
import { fireEvent, render, screen } from '@testing-library/react';


jest.mock('next/router', () => ({ push: jest.fn() }));

const renderView = async () => {
  render(<LangSelect />);
};

test('Renders', async () => {
  renderView();
});

test('Select', async () => {
  renderView();
  fireEvent.click(screen.getByText('English'));
  fireEvent.click(await screen.findByText('Polski'));
});
