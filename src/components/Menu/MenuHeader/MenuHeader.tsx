import React from 'react';
import Carousel from 'react-multi-carousel';
import { Section } from '../../../models/IMenu';
import { RESPONSIVE } from '../../../utils/consts';
import './MenuHeader.css';

interface MenuHeaderProps {
  sections: Section[] | undefined;
}

const MenuHeader: React.FC<MenuHeaderProps> = ({ sections }) => {
  return sections ? (
    <div className="menu-header">
      <Carousel
        containerClass="carousel-container"
        responsive={RESPONSIVE}
        swipeable={true}
        draggable={true}
      >
        {sections.map((section) => (
          <div className="section-link" key={section.id}>
            <div className="section-image-container">
              <img
                className="section-image"
                src={section.images[0].image}
              ></img>
            </div>
            <h5>{section.name}</h5>
          </div>
        ))}
      </Carousel>
    </div>
  ) : (
    <></>
  );
};

export default MenuHeader;
