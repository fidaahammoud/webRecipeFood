import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import classes from '../css/SearchBar.module.css';

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== '') {
      navigate(`/search/${searchTerm}`);
    }
  };

  return (
    <div className={classes.search}>
      <form onSubmit={handleSubmit} className={classes.searchForm}>
        <div className={classes.searchContainer}>
          <input
            type="text"
            placeholder="Search for recipes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={classes.searchInput}
          />
          <button type="submit" className={classes.searchButton}>
            <FontAwesomeIcon icon={faSearch} className={classes.searchIcon} />
          </button>
        </div>
      </form>
    </div>
  );
}

export default SearchBar;
