import { fireEvent, render, screen } from '@testing-library/react';
import SearchBar from './SearchBar';

describe('SearchBar', () => {
  test('renders correctly', () => {
    const setFilter = jest.fn();
    render(<SearchBar filter="" setFilter={setFilter} />);

    expect(
      screen.getByPlaceholderText(/search menu items/i)
    ).toBeInTheDocument();
  });

  test('calls setFilter on input change', () => {
    const setFilter = jest.fn();
    render(<SearchBar filter="" setFilter={setFilter} />);

    fireEvent.change(screen.getByPlaceholderText(/search menu items/i), {
      target: { value: 'new value' },
    });

    expect(setFilter).toHaveBeenCalledWith('new value');
  });
});
