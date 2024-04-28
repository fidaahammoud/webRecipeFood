import React from 'react';

import classes from '../css/MainNavigation.module.css';
import logo from "../images/logo.jpeg";

function HeaderLogo() {

  return (
    <img src={logo} alt="Logo" className={classes.logo} />

  );
}

export default HeaderLogo;
