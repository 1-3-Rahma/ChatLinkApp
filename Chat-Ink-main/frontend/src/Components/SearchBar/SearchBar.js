import React from 'react';
import searchIcon from '../icons/search.png';
import './SearchBar.css'; 

const SearchBar = ({ searchTerm, onSearchChange , className  }) => {
  return (
    <div className={`search-container ${className}`}>
      <input
        type="text"
        id="searchBar"
        placeholder="Search.."
        value={searchTerm}
        onChange={e => onSearchChange(e.target.value)}
      />
      <img src={searchIcon} alt="Search Icon" className="search-icon" />
    </div>
  );
};

export default SearchBar;
