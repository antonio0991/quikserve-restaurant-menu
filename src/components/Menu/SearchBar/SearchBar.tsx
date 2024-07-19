import React from 'react';
import { IoIosSearch } from 'react-icons/io';
import './SearchBar.css';

interface SearchBarProps {
  filter: string;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
}

const SearchBar: React.FC<SearchBarProps> = ({ filter, setFilter }) => (
  <div className="search-container">
    <div className="search">
      <IoIosSearch className="search-icon" size={19.74} />
      <input
        type="text"
        placeholder="Search menu items"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
    </div>
  </div>
);

export default SearchBar;
