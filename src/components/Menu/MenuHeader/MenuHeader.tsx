import React, { useState } from 'react';
import { Image, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import { Section } from '../../../models/IMenu';
import './MenuHeader.css';

interface MenuHeaderProps {
  sections: Section[] | undefined;
  setSection: React.Dispatch<React.SetStateAction<Section[] | null>>;
}

const MenuHeader: React.FC<MenuHeaderProps> = ({ sections, setSection }) => {
  const [radioValue, setRadioValue] = useState('0');

  function isChecked(idx: number) {
    return radioValue === idx.toString();
  }

  function selectSection(section: Section) {
    if (section) {
      sections = [];
      console.log(section);
      sections.push(section);
      setSection(sections);
    }
  }

  return sections ? (
    <div className="menu-header">
      <ToggleButtonGroup
        className="button-group"
        name="options"
        type="radio"
        defaultValue={0}
      >
        {sections.map((section, idx) => (
          <ToggleButton
            key={idx}
            value={idx}
            id={`radio-${idx}`}
            checked={isChecked(idx)}
            onChange={(e) => {
              setRadioValue(e.currentTarget.value);
              selectSection(section);
            }}
          >
            <div
              className={
                isChecked(idx) ? 'section-link-active' : 'section-link'
              }
            >
              <div
                className={
                  isChecked(idx)
                    ? 'section-image-container-active'
                    : 'section-image-container'
                }
              >
                <Image
                  className="section-image"
                  src={section.images[0].image}
                ></Image>
              </div>
              <h5>{section.name}</h5>
            </div>
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </div>
  ) : (
    <></>
  );
};

export default MenuHeader;
