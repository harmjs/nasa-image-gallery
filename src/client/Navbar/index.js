import React from 'react';
import NasaLogo from './NasaLogo';
import SearchBar from './SearchBar/index';
import './styles.scss';

const NavBar = (props) => (
  <div className="navbar">
    <div className="navbar-brand-logo">
      <NasaLogo />
    </div>
    <div className="navbar-brand-name">
      <h1>NASA Image Gallery</h1>
    </div> 
    <div className="navbar-search">
      <SearchBar />
    </div>
  </div> 
)

export default NavBar;