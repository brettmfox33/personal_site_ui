import './App.css';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import { Grid } from '@material-ui/core';
import PhotographsMain from './pages/photographs/PhotographsMain';
import AlbumsMain from './pages/albums/AlbumsMain';
import CreateAlbumMain from './pages/create_album/CreateAlbumMain';

export default function App() {
  return (
    <Router>
        <Grid>
            <Switch>
                <Route exact path="/photographs">
                    <PhotographsMain />
                </Route>
                <Route exact path="/albums">
                    <AlbumsMain />
                </Route>
                <Route exact path="/create_album">
                    <CreateAlbumMain />
                </Route>
            </Switch>
        </Grid>
    </Router>
  );
}