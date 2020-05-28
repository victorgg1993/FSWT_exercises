import React from 'react';
import '../css/index.css';
import logo_principal from '../img/logo.png';
//import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { BrowserRouter as Router, Link } from 'react-router-dom';


function Inici() {

  let ruta_plats = "/llistatPlats";

  return (
    <Link to={ruta_plats}  className="class_main_img" >
      <img id="id_main_img" src={logo_principal} alt='Click per anar als plats' />
    </Link>
  );
}

export default Inici;
