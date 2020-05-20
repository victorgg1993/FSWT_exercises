import React from 'react';
import '../css/index.css';
import logo_principal from '../img/logo.png';

function Inici() {

  let ruta_plats = "/llistat_plats.html";

  function handlerBotoInici()
  {
    window.location.href =ruta_plats;
  }

  return (
    <img onClick={handlerBotoInici} src={logo_principal} alt='Fes click en la imatge per anar al llistat de productes' />
  );
}

export default Inici;
