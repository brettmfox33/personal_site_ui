import './App.css';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import { Grid } from '@material-ui/core';
import PhotographsMain from './pages/photographs/PhotographsMain2';
import AlbumsMain from './pages/albums/AlbumsMain2';

export default function App() {
  return (
    <Router>
        <Grid>
            <Switch>
                <Route exact path="/albums">
                    <AlbumsMain />
                </Route>
                <Route exact path="/albums/:uuid/photographs">
                    <PhotographsMain />
                </Route>
                <Route exact path="/">
                    <AlbumsMain />
                </Route>
            </Switch>
        </Grid>
    </Router>
  );
}