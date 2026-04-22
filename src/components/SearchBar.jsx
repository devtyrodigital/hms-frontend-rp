import React from 'react';
import '../styles/search-bar.css';

const SearchBar = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleSearch = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="search-container">
      <span className="search-icon-btn" onClick={toggleSearch}>
        🔍︎
      </span>
      {isOpen && (
        <div className="search-dropdown">
          <input type="text" placeholder="Search..." autoFocus />
        </div>
      )}
    </div>
  );
};

export default SearchBar;
