import React from 'react';
import axios from 'axios';
import '../css/llistat_plats.css';
//import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { BrowserRouter as Router, Link } from 'react-router-dom';


export default class LlistatPlats extends React.Component {

    ruta = "/plat";
    state = {
        plats: [[]],
    };

    async componentDidMount() {
        const res = await axios.get("http://localhost:4554/plats");
        this.setState({ plats: res.data });
    }

    // error a arreglar: https://reactjs.org/docs/lists-and-keys.html#keys
    // dins del map, en el return, aprox linia 30

    render() {
        return (
            <table className="table_list_plats">
                <tbody>{
                    this.state.plats.map(
                        (plats) => {
                            return (
                                <Link to={this.ruta + "?id=" + plats.id }  >
                                    <tr key={plats.id} className="tr_list_plats">
                                        <td><img alt="asd" className="img_list_plats" src={plats.imatge}></img></td>
                                        <td className="td_info_nom_plats">{plats.nom}</td>
                                        <td className="td_info_list_plats">{plats.info}</td>
                                    </tr>
                                </Link>
                            );
                        })
                }
                </tbody>
            </table >
        )
    }
}