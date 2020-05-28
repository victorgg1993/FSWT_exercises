import React from 'react';
import axios from 'axios';
import '../css/plat.css';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

import img_temps from '../img/temps.png'
import img_altramuces from '../img/altramuces.png'
import img_apio from '../img/apio.png'
import img_cacahuetes from '../img/cacahuetes.png'
import img_crustaceos from '../img/crustaceos.png'
import img_frutos_cascara from '../img/frutos_cascara.png'
import img_gluten from '../img/gluten.png'
import img_huevos from '../img/huevos.png'
import img_lacteos from '../img/lacteos.png'
import img_molsucos from '../img/molsucos.png'
import img_mostaza from '../img/mostaza.png'
import img_pescado from '../img/pescado.png'
import img_sesamo from '../img/sesamo.png'
import img_soja from '../img/soja.png'
import img_sulfitos from '../img/sulfitos.png'


/*
  És un sistema chapucero, fer de 9
*/

export default class Plat extends React.Component {

  url_api_plats = "http://localhost:4554/plats";
  url_api_alim = "http://localhost:4554/aliments";

  state = {
    info_plat: [],
    info_nutr: [],
  };


  async componentDidMount() {
    let _id = this.mirar_id_plat_desde_la_url();
    let res_plats = await axios.get(this.url_api_plats); // api => variable, informació del plat

    this.setState({ info_plat: res_plats.data[_id] });
  }

  render() {

    return (
      <table className="table_plat">

        <tr>
          <td className="espai_lateral"></td>
          <td className="espai_altura" colspan="2"></td>
          <td className="espai_altura" className="espai_lateral"></td>
          <td className="espai_altura" colspan="5"></td>
          <td className="espai_altura" className="espai_lateral"></td>
        </tr>

        <tr>
          <td className="espai_lateral"></td>
          <td className="casella_img_plat" colspan="2"><img className="img_plat" src={this.state.info_plat.imatge}></img></td>
          <td className="espai_lateral"></td>
          <td colspan="5">{ReactHtmlParser(this.state.info_plat.comentarios)}</td>
          <td className="espai_lateral"></td>
        </tr>

        <tr>
          <td className="espai_lateral"></td>
          <td className="espai_altura" colspan="2"></td>
          <td className="espai_altura"></td>
          <td className="espai_altura" colspan="5"></td>
          <td className="espai_lateral"></td>
        </tr>

        <tr>
          <td className="espai_lateral"></td>
          <td className="casella_titol_plat" colspan="2">{this.state.info_plat.nom}</td>
          <td className="espai_lateral"></td>

          <td className={
            (this.state.info_plat.halal ? "casella_restricc_alim_true" : "casella_restricc_alim_false")
          }>Halal</td>

          <td className="espai_entre_restriccions"></td>

          <td className={
            (this.state.info_plat.kosher ? "casella_restricc_alim_true" : "casella_restricc_alim_false")
          }>Kosher</td>

          <td colSpan="2" className="casella_alergenos">
            <img style={(this.state.info_plat.altramuces ? { display: 'inline' } : { display: 'none' })}
              className="imgs_alergias" src={img_altramuces}>
            </img>

            <img style={(this.state.info_plat.apio ? { display: 'inline' } : { display: 'none' })}
              className="imgs_alergias" src={img_apio}>
            </img>

            <img style={(this.state.info_plat.cacahuetes ? { display: 'inline' } : { display: 'none' })}
              className="imgs_alergias" src={img_cacahuetes}>
            </img>

            <img style={(this.state.info_plat.crustaceos ? { display: 'inline' } : { display: 'none' })}
              className="imgs_alergias" src={img_crustaceos}>
            </img>

            <img style={(this.state.info_plat.frutos_cascara ? { display: 'inline' } : { display: 'none' })}
              className="imgs_alergias" src={img_frutos_cascara}>
            </img>

            <img style={(this.state.info_plat.gluten ? { display: 'inline' } : { display: 'none' })}
              className="imgs_alergias" src={img_gluten}
              alt="contiene gluten">
            </img>

            <img style={(this.state.info_plat.huevos ? { display: 'inline' } : { display: 'none' })}
              className="imgs_alergias" src={img_huevos}
              alt="contiene huevo">
            </img>

          </td>
          <td className="espai_lateral"></td>
        </tr>

        <tr>
          <td className="espai_lateral"></td>
          <td className="casella_temps_plat">{this.state.info_plat.temps} h</td>
          <td className="casella_img_temps_plat"><img className="img_temps_plat" src={img_temps}></img></td>
          <td className="espai_lateral"></td>

          <td className={
            (this.state.info_plat.vegano ? "casella_restricc_alim_true" : "casella_restricc_alim_false")
          }>Vegano</td>

          <td className="espai_entre_restriccions"></td>

          <td className={
            (this.state.info_plat.vegetariano ? "casella_restricc_alim_true" : "casella_restricc_alim_false")
          }>Vegetariano</td>

          <td colSpan="2" className="casella_alergenos">
            <img style={(this.state.info_plat.lacteos ? { display: 'inline' } : { display: 'none' })} className="imgs_alergias" src={img_lacteos}></img>
            <img style={(this.state.info_plat.moluscos ? { display: 'inline' } : { display: 'none' })} className="imgs_alergias" src={img_molsucos}></img>
            <img style={(this.state.info_plat.mostaza ? { display: 'inline' } : { display: 'none' })} className="imgs_alergias" src={img_mostaza}></img>
            <img style={(this.state.info_plat.pescado ? { display: 'inline' } : { display: 'none' })} className="imgs_alergias" src={img_pescado}></img>
            <img style={(this.state.info_plat.sesamo ? { display: 'inline' } : { display: 'none' })} className="imgs_alergias" src={img_sesamo}></img>
            <img style={(this.state.info_plat.soja ? { display: 'inline' } : { display: 'none' })} className="imgs_alergias" src={img_soja}></img>
            <img style={(this.state.info_plat.sulfitos ? { display: 'inline' } : { display: 'none' })} className="imgs_alergias" src={img_sulfitos}></img>
          </td>
          <td className="espai_lateral"></td>
        </tr>

        <tr>
          <td className="espai_lateral"></td>
          <td className="espai_altura" colspan="2"></td>
          <td className="espai_altura"></td>
          <td className="espai_altura" colspan="5"></td>
          <td className="espai_lateral"></td>
        </tr>

        <tr>
          <td className="espai_lateral"></td>

          <td className="fila_pestanyes_opcions">
            Receta
          </td>

          <td className="fila_pestanyes_opcions_blanc" colspan="7"></td>
          <td className="espai_lateral"></td>
        </tr>

        <tr>
          <td className="espai_lateral"></td>
          <td colspan="8">{ReactHtmlParser(this.state.info_plat.receta)}</td>
          <td className="espai_lateral"></td>
        </tr>

      </table>

    )
  }

  mirar_id_plat_desde_la_url() {
    let current_url = new URL(window.location.href); // a futur anirà fora, mirem la ID donada i fem consulta a la API
    let search_params = current_url.searchParams;
    return (search_params.get('id'));
  }
}