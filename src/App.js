import './App.css';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import { Grid } from '@material-ui/core';
import PhotographsMain from './pages/photographs/PhotographsMain';
import AlbumsMain from './pages/albums/AlbumsMain';

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
            </Switch>
        </Grid>
    </Router>
  );
}