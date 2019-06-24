import React from 'react';
import NasaLogo from './NasaLogo';
import SearchBar from './SearchBar/index';
import './style.scss';

const NavBar = (props) => {
  const { search, waiting } = props;
  return (
    <div className="container">
      <div className="navbar">
        <div className="navbar-brand-logo">
          <NasaLogo />
        </div>
        <div className="navbar-brand-name">
          <h1>NASA Gallery</h1>
        </div> 
        <div className="navbar-search">
          <SearchBar waiting={ waiting} search={ search } />
        </div>
      </div> 
    </div>
  )
}


export default NavBar;