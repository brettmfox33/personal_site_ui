import {Grid, IconButton, makeStyles, Tooltip, withStyles } from "@material-ui/core";
import Photograph from "./Photograph";
import { useEffect, useState } from "react";
import { Fragment } from "react";
import SimpleIconButton from "../../components/SimpleIconButton";
import AddIcon from '@material-ui/icons/Add';
import Brightness2Icon from '@material-ui/icons/Brightness2';
import BrightnessLow from '@material-ui/icons/BrightnessLow';
import { useParams } from "react-router";
import GetAppIcon from '@material-ui/icons/GetApp';
import { saveAs } from 'file-saver';
var JSZip = require("jszip");
var JSZipUtils = require("jszip-utils");

const useStyles = makeStyles({
    container: {
        paddingTop: 50,
        paddingBottom: 50
    },
    theatreContainer: {
        backgroundColor: "#16191B",
        paddingTop: 50,
        paddingBottom: 50
    },
    addButton: {
        color: '#f2f2f2',
        border: '1px solid #f2f2f2',
    },
    downloadButton: {
        color: '#f2f2f2',
        border: '1px solid #f2f2f2',
        marginLeft: 20
    },
    theatreButton: {
        color: '#f2f2f2',
        border: '1px solid #f2f2f2',
        marginLeft: 20,
    },
    galleryButton: {
        color: '#919191',
        border: '1px solid #919191'
    },
    albumName: {
        color: "#f2f2f2",
        fontSize: 30,
        marginBottom: 20
    },
    input: {
        display: 'none',
    },
});

const NoHoverColorIconButton = withStyles((theme) => ({
    root: {
      '&:hover': {
        backgroundColor: 'transparent',
      },
    },
  }))(IconButton);

export default function PhotographsMain() {
    const classes = useStyles();
    const { uuid } = useParams();

    const [theatreView, setTheatreView] = useState(false);
    const [photographs, setPhotographs] = useState([])
    const [album, setAlbum] = useState(null)

    const fetchPhotographs = () => {
        fetch(`http://personal-site-api-dev.us-east-2.elasticbeanstalk.com/api/albums/${uuid}/photographs/`)
            .then((res) => {
                return res.json()
            })
            .then(
            (result) => {
                setPhotographs(result)
            },
            (error) => {
                console.log(error)
            }
        )
    }

    const fetchAlbum = () => {
        fetch(`http://personal-site-api-dev.us-east-2.elasticbeanstalk.com/api/albums/${uuid}/`)
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
        for (const photograph of photographs){
            zip.file(photograph.title, urlToPromise(photograph.photo), {binary:true});
        }
        zip.generateAsync({type:"blob"})
        .then(function callback(blob) {
            saveAs(blob, `${uuid}.zip`);
        });
    }
    
    const uploadImage = (files) => {
        for (const file of files){
            const data = new FormData()
            data.append('title', file.name)
            data.append('album', uuid)
            data.append('photo', file)
            fetch(`hhttp://personal-site-api-dev.us-east-2.elasticbeanstalk.com/api/albums/${uuid}/photographs/`, {
                    method: 'POST',
                    body: data
            })
            .then((res) => {
                fetchPhotographs()
            })
            .then(
                (result) => {
                    console.log(result)
                },
                (error) => {
                    console.log(error)
                }
            )
        }  
    }

    useEffect(() => {
        fetchPhotographs()
        fetchAlbum()
      }, [])

    return(
        <Grid 
            className={theatreView ? classes.theatreContainer : classes.container }
            container 
            direction="column" 
            justify="center" 
            alignItems="center"
        >
                <Grid
                    container
                    direction="row"
                    justify="flex-end"
                >
                    <Grid 
                        container 
                        item 
                        lg={2}
                        xs={12}
                        justify="center" 
                        alignItems="center"
                        className={classes.albumName}
                    >
                        {album ? album.description : null}
                    </Grid>
                </Grid>
            <Grid
                container
                direction="row"
                justify="flex-end"
            >
                <Grid 
                    container
                    item
                    lg={2}
                    xs={12}
                    justify="center" 
                    alignItems="center"
                >
                    {
                        theatreView
                        ? 
                            <SimpleIconButton 
                                icon={<BrightnessLow />}
                                className={classes.galleryButton}
                                onClickFunction={() => setTheatreView(!theatreView)}
                                toolTipMessage="Gallery Mode"
                            />
                        : 
                            <Fragment>
                                {/* ADD */}
                                <input
                                    accept="image/*"
                                    className={classes.input}
                                    id="contained-button-file"
                                    multiple
                                    type="file"
                                    onChange={(e) => uploadImage(e.target.files)} 
                                />
                                <label htmlFor="contained-button-file">
                                    <Tooltip title="Add Images to Album">
                                        <NoHoverColorIconButton  
                                            component="span"
                                            className={classes.addButton}
                                            disableRipple={true}
                                        >
                                            <AddIcon />
                                        </NoHoverColorIconButton>
                                    </Tooltip>
                                </label>
                                
                                {/* DOWNLOAD */}
                                <SimpleIconButton 
                                    icon={<GetAppIcon />}
                                    className={classes.downloadButton}
                                    onClickFunction={() => downloadAll()}
                                    toolTipMessage={"Download All"}
                                />
                                {/* THEATRE */}
                                <SimpleIconButton 
                                    icon={<Brightness2Icon />}
                                    className={classes.theatreButton}
                                    onClickFunction={() => setTheatreView(!theatreView)}
                                    toolTipMessage="Theatre Mode"
                                />
                            </Fragment>
                    }
                </Grid>

            </Grid>
                {
                    photographs.map(photograph => {
                         return (
                            <Grid item xs={10} md={8} key={photograph.uuid}>
                                <Photograph 
                                    imageSrc={photograph.photo}
                                    imageTitle={photograph.title}
                                    theatreView={theatreView}
                                />
                            </Grid>
                         )
                    })
                }
        </Grid>
    )
}