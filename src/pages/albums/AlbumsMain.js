import { Fragment, useEffect, useState } from "react";
import {Button, Dialog, DialogContent, Grid, makeStyles, TextField } from "@material-ui/core";
import { Link } from "react-router-dom";
import Album from "./Album";
import SimpleIconButton from "../../components/SimpleIconButton";
import AddIcon from '@material-ui/icons/Add';
import {KeyboardDatePicker, MuiPickersUtilsProvider} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

const useStyles = makeStyles({
    container: {
        paddingTop: 50,
        paddingBottom: 50
    },
    albumContainer: {
        cursor: "pointer"
    },
    link: {
        textDecoration: "none"
    },
    createAlbumButton: {
        color: '#f2f2f2',
        border: '1px solid #f2f2f2',
    },
    albumName: {
        width: '100%',
        marginTop: 10
    },
    albumDescription: {
        width: '100%',
        marginTop: 10
    },
    albumDate: {
        width: '100%'
    },
    input: {
        display: 'none',
    },
    coverImage: {
        marginTop: 20,
        marginBottom: 20
    }
});

export default function AlbumsMain() {
    const classes = useStyles();
    const [showModal, setShowModal] = useState(false)
    const [albums, setAlbums] = useState([])
    const [albumName, setAlbumName] = useState("")
    const [date, setDate] = useState(new Date('2014-08-18T21:11:54'))
    const [description, setDescription] = useState("")
    const [coverPhoto, setCoverPhoto] = useState(null)
    const [formComplete, setFormComplete] = useState(false)

    const fetchAlbums = () => {
        fetch("http://personal-site-api-dev.us-east-2.elasticbeanstalk.com/api/albums/")
            .then((res) => {
                return res.json()
            })
            .then(
            (result) => {
                setAlbums(result)
            },
            (error) => {
                console.log(error)
            }
        )
    }
    
    useEffect(() => {
        fetchAlbums()
      }, [])

      useEffect(() => {
          if (date && albumName && description && coverPhoto) {
                setFormComplete(true)
          }
          else {
                setFormComplete(false)
          }
      }, [albumName, date, description, coverPhoto])

      const createAlbum = () => {
            setFormComplete(false)
            setShowModal(false)
            setAlbumName("")
            setDate(new Date('2014-08-18T21:11:54'))
            setDescription("")
            setCoverPhoto(null)
            
            const data = new FormData()
            data.append('title', albumName)
            data.append('description', description)
            data.append('date', "2014-08-18")
            data.append('cover_photo', coverPhoto)

            fetch('http://personal-site-api-dev.us-east-2.elasticbeanstalk.com/api/albums/', {
                method: 'POST',
                body: data
            })
            .then((res) => {
                fetchAlbums()
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

     return (
        <div className={classes.container}>
            <Fragment>
                <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                >
                    <Grid>
                        <SimpleIconButton
                                className={classes.createAlbumButton}
                                onClickFunction={() => setShowModal(true)}
                                icon={<AddIcon />}
                                toolTipMessage="Create New Album"
                            >
                        </SimpleIconButton>
                    </Grid>
                    {
                        albums 
                        ?
                            albums.map(album => {
                                return (
                                    <Grid 
                                        className={classes.albumContainer}
                                        item 
                                        xs={10} 
                                        md={6}
                                        key={album.uuid}
                                    >
                                        <Link className={classes.link} to={`albums/${album.uuid}/photographs`}>
                                            <Album
                                                coverSrc={album.cover_photo}
                                                title={album.title}
                                                description={album.description}
                                                date={album.date}
                                                key={album.uuid}
                                            />
                                        </Link>
                                    </Grid>
                                )
                            })
                        : null
                    }
                </Grid>
                {/* MODAL */}
                <Dialog 
                    onClose={() => setShowModal(false)} 
                    open={showModal} 
                    maxWidth="xs" 
                    fullWidth={true}
                >
                    <DialogContent>
                        <Grid
                            container
                            direction="column"
                            alignItems="center"
                            justify="center"
                        >
                            <Grid 
                                className={classes.albumName}
                            >
                                <TextField 
                                    fullWidth
                                    id="outlined-basic" 
                                    label="Album Name" 
                                    variant="outlined" 
                                    value={albumName}
                                    onChange={(e) => setAlbumName(e.target.value)}
                                />    
                            </Grid>
                            <Grid className={classes.albumDate}>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDatePicker
                                        fullWidth
                                        disableToolbar
                                        variant="inline"
                                        format="MM/dd/yyyy"
                                        margin="normal"
                                        label="Album Date"
                                        value={date}
                                        onChange={(e) => setDate(e)}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date', 
                                        }}
                                    />
                                </MuiPickersUtilsProvider>
                            </Grid>
                            <Grid className={classes.albumDescription}>
                                <TextField 
                                    fullWidth
                                    id="outlined-basic" 
                                    label="Album Description" 
                                    variant="outlined" 
                                    multiline
                                    rows={4}         
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}   
                                       
                                />
                            </Grid>
                            <Grid className={classes.coverImage}>
                                <input
                                    accept="image/*"
                                    className={classes.input}
                                    id="contained-button-file"
                                    type="file"
                                    onChange={(e) => setCoverPhoto(e.target.files[0])} 
                                />
                                <label htmlFor="contained-button-file">
                                    <Button variant="contained" color="primary" component="span">
                                        Cover Image
                                    </Button>
                                </label>
                                <span>{coverPhoto ? coverPhoto.name : null}</span>
                            </Grid>
                            <Grid>
                                <Button 
                                    variant="contained" 
                                    color="primary"
                                    disabled={!formComplete}
                                    onClick={createAlbum}
                                >
                                    Create Album
                                </Button>
                            </Grid>
                        </Grid>
                        </DialogContent>
                </Dialog>
            </Fragment>
            
        </div>
    )
}