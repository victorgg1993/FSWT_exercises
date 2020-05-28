import React from 'react';
import Inici from './inici';
import LlistatPlats from './LlistatPlats';
import Plat from './plat';
import BarraNav from './BarraNav';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {

    return (
        <Router>
            <Switch>
                <Inici path="/" exact component={Inici} />

                <Route path="/llistatPlats">
                    <div className="div_llistat_plats">
                        <BarraNav />
                        <LlistatPlats />
                    </div>
                </Route>

                <Route path="/plat">
                    <div className="div_plat">
                        <BarraNav />
                        <Plat />
                    </div>
                </Route>

            </Switch>
        </Router>
    );
}

export default App;