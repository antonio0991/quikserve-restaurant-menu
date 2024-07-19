import React, { useEffect } from 'react';
import { IoIosSearch } from 'react-icons/io';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { fetchMenu } from '../../slices/menu.slice';
import { fetchVenue } from '../../slices/venue.slice';
import AccordionComponent from '../Accordion/AccordionComponent';
import './Menu.css';
import NavBar from './NavBar/NavBar';
interface MenuComponentProps {}

const MenuComponent: React.FC<MenuComponentProps> = ({}) => {
  const dispatch = useDispatch<AppDispatch>();
  const venueState = useSelector((state: RootState) => state.venue);
  const menuState = useSelector((state: RootState) => state.menu);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 4,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 3,
    },
  };

  useEffect(() => {
    dispatch(fetchMenu());
    dispatch(fetchVenue());
  }, [dispatch]);

  if (venueState.status === 'loading') {
    return <div>Loading...</div>;
  }

  if (venueState.status === 'failed') {
    return <div>Error: {venueState.error}</div>;
  }

  return (
    <div>
      {/* NEW_COMPONENT: NAVBAR */}
      <NavBar venue={venueState.venue}></NavBar>
      <img src={venueState.venue?.webSettings.bannerImage}></img>
      <div className="main-body">
        {/* NEW_COMPONENT: SEARCH_BAR */}
        <div className="search-container">
          <div className="search">
            <IoIosSearch className="search-icon" size={19.74} />
            <input type="text" placeholder="Search menu items"></input>
          </div>
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
                {menuState.menu ? (
                  menuState.menu.sections.map((section) => (
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
              {menuState.menu ? (
                <AccordionComponent sections={menuState.menu?.sections} />
              ) : (
                <></>
              )}
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
