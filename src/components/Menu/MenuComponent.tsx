import React, { useEffect, useState } from 'react';
import { IoIosSearch } from 'react-icons/io';
import { VenueService } from '../../api/api';
import { IMenu } from '../../models/IMenu';
import { IVenue } from '../../models/IVenue';
import './MenuComponent.css';
interface MenuComponentProps {}

const MenuComponent: React.FC<MenuComponentProps> = ({}) => {
  const [menu, setMenu] = useState<IMenu>();
  const [venue, setVenue] = useState<IVenue>();

  useEffect(() => {
    VenueService.getMenu()
      .then((res) => setMenu(res))
      .catch((err) => console.log(err));
    VenueService.getVenue()
      .then((res) => setVenue(res))
      .catch((err) => console.log(err));
  }, []);
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
      {/* NEW_COMPONENT: SEARCH_BAR */}
      <div className="search">
        <IoIosSearch />
        <input type="text" placeholder="Search menu items"></input>
      </div>
    </div>
  );
};

export default MenuComponent;
