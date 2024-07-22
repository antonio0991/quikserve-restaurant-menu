import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render, screen } from '@testing-library/react';
import { Section } from '../../../models/IMenu';
import AccordionComponent from './AccordionComponent';

jest.mock('./AccordionItem/AccordionItemComponent', () => (props: any) => (
  <div data-testid="accordion-item" onClick={props.onClick}>
    {props.title}
  </div>
));

const sections: Section[] = [
  {
    description: '',
    images: [],
    position: 1,
    id: 1,
    name: 'Section 1',
    visible: 1,
    items: [
      {
        id: 1,
        name: 'Item 1',
        price: 100,
        alcoholic: 0,
        position: 1,
        availabilityType: 'type',
        available: true,
        visible: 1,
      },
      {
        id: 2,
        name: 'Item 2',
        price: 200,
        alcoholic: 0,
        position: 2,
        availabilityType: 'type',
        available: true,
        visible: 1,
      },
    ],
  },
  {
    description: '',
    images: [],
    position: 2,
    id: 2,
    name: 'Section 2',
    visible: 1,
    items: [
      {
        id: 3,
        name: 'Item 3',
        price: 300,
        alcoholic: 0,
        position: 3,
        availabilityType: 'type',
        available: true,
        visible: 1,
      },
    ],
  },
];

describe('AccordionComponent', () => {
  test('renders AccordionComponent with given sections', () => {
    render(<AccordionComponent sections={sections} />);

    expect(screen.getByText('Section 1')).toBeInTheDocument();
    expect(screen.getByText('Section 2')).toBeInTheDocument();
    expect(screen.queryByText('Section 3')).not.toBeInTheDocument();
  });

  test('toggles section visibility when clicked', () => {
    render(<AccordionComponent sections={sections} />);

    const section1 = screen.getByText('Section 1');
    const section2 = screen.getByText('Section 2');

    fireEvent.click(section1);
    expect(section1).toHaveAttribute('data-testid', 'accordion-item');

    fireEvent.click(section2);
    expect(section2).toHaveAttribute('data-testid', 'accordion-item');

    fireEvent.click(section1);
    expect(section1).toHaveAttribute('data-testid', 'accordion-item');
  });

  test('does not render invisible sections', () => {
    render(<AccordionComponent sections={sections} />);

    expect(screen.queryByText('Section 3')).not.toBeInTheDocument();
  });
});
