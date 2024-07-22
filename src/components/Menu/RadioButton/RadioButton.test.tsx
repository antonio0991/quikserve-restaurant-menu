import { fireEvent, render, screen } from '@testing-library/react';
import { ModifierItem } from '../../../models/IMenu';
import RadioButton from './RadioButton';

const mockItem: ModifierItem = {
  id: 1,
  name: 'Item 1',
  price: 10,
  position: 1,
  visible: 1,
  availabilityType: 'available',
  available: true,
  maxChoices: 1,
};

describe('RadioButton', () => {
  test('renders correctly', () => {
    const onChange = jest.fn();
    render(<RadioButton item={mockItem} checked={false} onChange={onChange} />);

    expect(screen.getByText(/item 1/i)).toBeInTheDocument();
  });

  test('calls onChange when clicked', () => {
    const onChange = jest.fn();
    render(<RadioButton item={mockItem} checked={false} onChange={onChange} />);

    fireEvent.click(screen.getByLabelText(/item 1/i));

    expect(onChange).toHaveBeenCalledWith(mockItem);
  });
});
