import React from 'react';
import Inici from './inici';
import Llistat_plats from './llistat_plats';
import Plat from './plat';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
    return (

        <Router>
            <div className="App">
                <Switch>
                    <Inici path="/" exact component={Inici} />
                    <Llistat_plats path="/llistat_plats" exact component={Llistat_plats} />
                    <Plat path="/Plat" exact component={Plat} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;