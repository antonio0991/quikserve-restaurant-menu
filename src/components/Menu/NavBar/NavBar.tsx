import React from 'react';
import { IVenue } from '../../../models/IVenue';
interface NavBarProps {
  venue: IVenue | null;
}

const NavBar: React.FC<NavBarProps> = ({ venue }) => {
  return (
    <nav
      className="navbar"
      style={{
        backgroundColor: venue?.webSettings.navBackgroundColour,
      }}
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
  );
};

export default NavBar;
