import React, { useState } from 'react';
import { IoMenu } from 'react-icons/io5';
import useScreenSize from '../../../hooks/useScreenSize';
import { IVenue } from '../../../models/IVenue';
import './NavBar.css';
import SideBar from './SideBar';
interface NavBarProps {
  venue: IVenue | null;
}

const NavBar: React.FC<NavBarProps> = ({ venue }) => {
  const isMobile = useScreenSize();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return isMobile ? (
    <div
      className="navbar-mobile"
      style={{
        backgroundColor: venue?.webSettings.navBackgroundColour,
      }}
    >
      <a className="link-wrapper-mobile">Menu</a>
      <IoMenu
        style={{
          position: 'absolute',
          right: '10px',
          width: '28px',
          height: '28px',
          color: 'white',
        }}
        onClick={handleSidebarToggle}
      />
      {sidebarOpen && <SideBar venue={venue} onClose={handleSidebarToggle} />}
    </div>
  ) : (
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
