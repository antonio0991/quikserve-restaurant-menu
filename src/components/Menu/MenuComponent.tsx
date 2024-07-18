import React, { useEffect, useState } from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';
import { ID } from 'react-accessible-accordion/dist/types/components/ItemContext';
import { IoIosSearch } from 'react-icons/io';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { VenueService } from '../../api/api';
import { IMenu } from '../../models/IMenu';
import { IVenue } from '../../models/IVenue';
import './MenuComponent.css';
interface MenuComponentProps {}

const MenuComponent: React.FC<MenuComponentProps> = ({}) => {
  const [menu, setMenu] = useState<IMenu>();
  const [venue, setVenue] = useState<IVenue>();
  const [preExpanded, setPreExpanded] = useState<ID[]>([]);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 5,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  useEffect(() => {
    VenueService.getMenu()
      .then((res) => {
        setMenu(res);
        setPreExpanded(res.sections.map((section) => section.id));
      })
      .catch((err) => console.log(err));
    VenueService.getVenue()
      .then((res) => setVenue(res))
      .catch((err) => console.log(err));
  }, []);

  console.log(preExpanded);

  return (
    <div>
      {/* NEW_COMPONENT: NAVBAR */}
      <nav
        className="navbar"
        style={{ backgroundColor: venue?.webSettings.navBackgroundColour }}
      >
        <div className="link-wrapper link-open">
          <a href="#menu">Menu</a>
        </div>
        <div className="link-wrapper">
          <a href="#login">Entrar</a>
        </div>
        <div className="link-wrapper">
          <a href="#contact">Contato</a>
        </div>
      </nav>
      <img src={venue?.webSettings.bannerImage}></img>
      <div className="main-body">
        {/* NEW_COMPONENT: SEARCH_BAR */}
        <div className="search">
          <IoIosSearch />
          <input type="text" placeholder="Search menu items"></input>
        </div>
        <div className="menu-wrapper">
          {/* NEW_COMPONENT: menu */}

          <div className="menu">
            {/* NEW_COMPONENT: menu-header */}

            <div className="menu-header">
              <Carousel
                containerClass="carousel-container"
                responsive={responsive}
                swipeable={true}
                draggable={true}
              >
                {menu ? (
                  menu.sections.map((section) => (
                    <div className="section-link" key={section.id}>
                      <div className="section-image-container">
                        <img
                          className="section-image"
                          src={section.images[0].image}
                        ></img>
                      </div>
                      <h5>{section.name}</h5>
                    </div>
                  ))
                ) : (
                  <div></div>
                )}
              </Carousel>
            </div>
            <div className="sections">
              <Accordion preExpanded={preExpanded}>
                {menu ? (
                  menu.sections.map((section) => (
                    <AccordionItem uuid={section.id} key={section.id}>
                      <AccordionItemHeading>
                        <AccordionItemButton>
                          What harsh truths do you prefer to ignore?
                        </AccordionItemButton>
                      </AccordionItemHeading>
                      <AccordionItemPanel>
                        <p>
                          Exercitation in fugiat est ut ad ea cupidatat ut in
                          cupidatat occaecat ut occaecat consequat est minim
                          minim esse tempor laborum consequat esse adipisicing
                          eu reprehenderit enim.
                        </p>
                      </AccordionItemPanel>
                    </AccordionItem>
                  ))
                ) : (
                  <></>
                )}
              </Accordion>
            </div>
            {/* NEW_COMPONENT: cart */}

            <div className="cart"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuComponent;
