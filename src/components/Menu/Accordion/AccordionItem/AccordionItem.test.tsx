import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render, screen } from '@testing-library/react';
import { Item } from '../../../../models/IMenu';
import AccordionItem from './AccordionItemComponent';

jest.mock('../../../../hooks/useModal', () => ({
  __esModule: true,
  default: () => ({
    isOpen: false,
    toggle: jest.fn(),
  }),
}));

jest.mock(
  '../../Modal/Modal',
  () => (props: any) =>
    props.isOpen ? <div data-testid="modal">Modal Content</div> : null
);

const items: Item[] = [
  {
    id: 1,
    name: 'Item 1',
    price: 100,
    alcoholic: 0,
    position: 1,
    availabilityType: 'type',
    available: true,
  },
  {
    id: 2,
    name: 'Item 2',
    price: 200,
    alcoholic: 0,
    position: 2,
    availabilityType: 'type',
    available: true,
    images: [{ id: 1, image: 'image-url' }],
  },
];

describe('AccordionItemComponent', () => {
  test('renders AccordionItem with given title and items', () => {
    render(
      <AccordionItem
        title="Test Title"
        items={items}
        isOpen={false}
        onClick={jest.fn()}
      />
    );

    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
    expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
  });

  test('calls onClick when button is clicked', () => {
    const handleClick = jest.fn();
    render(
      <AccordionItem
        title="Test Title"
        items={items}
        isOpen={false}
        onClick={handleClick}
      />
    );

    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('renders item image if present', () => {
    render(
      <AccordionItem
        title="Test Title"
        items={items}
        isOpen={false}
        onClick={jest.fn()}
      />
    );

    const itemImage = screen.getByRole('img');
    expect(itemImage).toHaveAttribute('src', 'image-url');
  });

  test('sets correct height on isOpen change', () => {
    const { rerender, container } = render(
      <AccordionItem
        title="Test Title"
        items={items}
        isOpen={false}
        onClick={jest.fn()}
      />
    );

    rerender(
      <AccordionItem
        title="Test Title"
        items={items}
        isOpen={true}
        onClick={jest.fn()}
      />
    );
    const answerContainer = container.querySelector('.answer-container');
    expect(answerContainer).toHaveStyle('height: 207px'); // 117 + 90 = 207
  });
});
