import React, { useState } from 'react';
import { Section } from '../../../models/IMenu';
import './AccordionComponent.css';
import AccordionItem from './AccordionItem/AccordionItemComponent';

interface AccordionComponentProps {
  sections: Section[];
}

const AccordionComponent: React.FC<AccordionComponentProps> = (
  props: AccordionComponentProps
) => {
  const [activeIndexes, setActiveIndexes] = useState(
    props.sections.map((section) => section.id)
  );

  const handleItemClick = (index: any) => {
    setActiveIndexes(
      activeIndexes.includes(index)
        ? activeIndexes.filter((i) => i !== index)
        : [...activeIndexes, index]
    );
  };

  return (
    <div className="container">
      {props.sections.map((section) => (
        <div key={section.id}>
          {section.visible ? (
            <AccordionItem
              key={section.id}
              items={section.items.filter((item) => item.visible)}
              isOpen={activeIndexes.includes(section.id)}
              onClick={() => handleItemClick(section.id)}
              title={section.name}
            />
          ) : (
            <></>
          )}
        </div>
      ))}
    </div>
  );
};

export default AccordionComponent;
