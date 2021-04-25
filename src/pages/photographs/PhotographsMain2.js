import {Grid, makeStyles, Divider, Button, IconButton } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { saveAs } from 'file-saver';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import Photograph from "./Photograph2";
import { Link } from "react-router-dom";
var JSZip = require("jszip");
var JSZipUtils = require("jszip-utils");

const useStyles = makeStyles({
    collectionTitle: {
        fontSize: 36,
        marginTop: 100
    },
    divider: {
        marginTop: 10,
        marginBottom: 10
    },
    albumDetails: {
        fontSize: 15,
        color: "#858585"
    },
    albumDescription: {
        fontSize: 15,
        color: "#858585",
        marginTop: 10
    },
    albumTitle: {
        marginRight: 50,
        paddingBottom:4
    },
    theatreButton: {
        marginLeft: 10
    },
    theatreContainer: {
        backgroundColor: "#16191B"
    },
    theatreAlbumDetails: {
        color: 'white',
        fontSize: 15,
    },
    theatreAlbumTitle: {
        marginRight: 50,
        paddingBottom:4,
        color: 'white'
    },
    theatreAlbumDescription: {
        fontSize: 15,
        color: "white",
        marginTop: 10
    },
    arrow: {
        cursor: "pointer",
        color: 'black'
    }
})
export default function PhotographsMain() {
    const classes = useStyles();
    const { uuid } = useParams();

    const [album, setAlbum] = useState(null)
    const [theatreView, setTheatreView] = useState(false);

    const fetchAlbum = () => {
        fetch(`http://127.0.0.1:8000/api/albums/${uuid}/`)
            .then((res) => {
                return res.json()
            })
            .then(
            (result) => {
                setAlbum(result)
            },
            (error) => {
                console.log(error)
            }
        )
    }

    useEffect(() => {
        fetchAlbum()
      }, [])

      const urlToPromise = (url) => {
        return new Promise(function(resolve, reject) {
            JSZipUtils.getBinaryContent(url, function (err, data) {
                if(err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }

    const downloadAll = () => {
        var zip = new JSZip();
        for (const photograph of album.photographs){
            zip.file(photograph.title, urlToPromise(photograph.photo), {binary:true});
        }
        zip.generateAsync({type:"blob"})
        .then(function callback(blob) {
            saveAs(blob, `${uuid}.zip`);
        });
    }

    return (
        <Grid 
            container 
            direction="row"
            className={theatreView ? classes.theatreContainer : null}
        >
            {/* LEFT SPACING */}
            <Grid item xs={1}></Grid>
            <Grid item xs={10} className={classes.collectionTitle}>
                {
                    album
                    ?
                        <Grid container direction="column">
                            {/* HEADER */}
                            <Grid>
                                <Link to="/albums/"><KeyboardBackspaceIcon className={classes.arrow} /></Link>
                            </Grid>
                            <Grid>
                                <Grid container direction="row" alignItems="center">
                                    <Grid item className={theatreView ? classes.theatreAlbumTitle : classes.albumTitle}>{album.title}</Grid>
                                    <Grid item xs={12} sm={2} lg={1} className={theatreView ? classes.theatreAlbumDetails : classes.albumDetails}>{album.date}</Grid>
                                    <Grid item xs={12} sm={2} lg={1} className={theatreView ? classes.theatreAlbumDetails : classes.albumDetails}>{album.location}</Grid>
                                    <Grid item xs={12} sm={2} lg={1} className={theatreView ? classes.theatreAlbumDetails : classes.albumDetails}>{album.photographs.length} photos</Grid>
                                    <Grid item md={2} lg={1}></Grid>
                                </Grid>
                                <Grid container direction="row" alignItems="center" justify="space-between">
                                    <Grid className={theatreView ? classes.theatreAlbumDescription : classes.albumDescription}>
                                        {album.description}
                                    </Grid>

                                    <Grid>
                                        <Button 
                                            variant="outlined" 
                                            color="primary"
                                            onClick={() => downloadAll()}
                                        >
                                            Download All
                                        </Button>
                                        <Button 
                                            className={classes.theatreButton} 
                                            variant="outlined" 
                                            color="primary"
                                            onClick={() => setTheatreView(!theatreView)}
                                        >
                                            {theatreView ? "Gallery View" : "Theatre View"}
                                        </Button>
                                    </Grid>
                                </Grid>
                                <Divider className={classes.divider} />
                                <Grid container direction="row" justify="center">
                                    {
                                        album.photographs.map(photograph => {
                                            return (
                                                <Grid key={photograph.uuid} item container xs={12} md={12} lg={8} justify="center">
                                                    <Photograph photograph={photograph} theatreView={theatreView} />
                                                </Grid>
                                            )
                                        })
                                    }
                                </Grid>
                            </Grid>
                        </Grid>
                    : null
                }
            </Grid>
            {/* RIGHT SPACING */}
            <Grid item xs={1}></Grid>
        </Grid>
    )
}