import React from 'react';
import { IoMdCloseCircle } from 'react-icons/io';
import { IVenue } from '../../../models/IVenue';
import './SideBar.css'; // Add your styles here

interface SideBarProps {
  venue: IVenue | null;
  onClose: () => void;
}

const SideBar: React.FC<SideBarProps> = ({ venue, onClose }) => {
  return (
    <div
      className="sidebar"
      style={{ backgroundColor: venue?.webSettings.navBackgroundColour }}
    >
      <IoMdCloseCircle className="modal-close-icon" onClick={onClose} />

      <div className="sidebar-link">
        <a href="#menu">Menu</a>
      </div>
      <div className="sidebar-link">
        <a href="#login">Entrar</a>
      </div>
      <div className="sidebar-link">
        <a href="#contact">Contato</a>
      </div>
    </div>
  );
};

export default SideBar;
