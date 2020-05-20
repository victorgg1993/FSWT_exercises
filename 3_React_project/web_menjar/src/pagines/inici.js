import React from 'react';
import '../css/index.css';
import logo_principal from '../img/logo.png';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';


function Inici() {

  let ruta_plats = "/llistat_plats";

  return (
    <Link to={ruta_plats}>
      <img src={logo_principal} alt='Click per anar als plats' />
    </Link>
  );
}

export default Inici;
