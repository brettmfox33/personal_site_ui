import { Fragment, useState } from "react";
import {Button, Dialog, DialogContent, Grid, makeStyles, Modal, TextField } from "@material-ui/core";
import { Link } from "react-router-dom";
import Album from "./Album";
import SimpleIconButton from "../../components/SimpleIconButton";
import AddIcon from '@material-ui/icons/Add';
import {KeyboardDatePicker, MuiPickersUtilsProvider} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import FormControl from '@material-ui/core/FormControl';

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

const images = [
    "https://brettmfox33-personal-website.s3.us-east-2.amazonaws.com/photographs/Bookstore/DSCF0002.JPG",
    "https://brettmfox33-personal-website.s3.us-east-2.amazonaws.com/photographs/Bookstore/DSCF0067+2.JPG",
    "https://brettmfox33-personal-website.s3.us-east-2.amazonaws.com/photographs/Bookstore/DSCF0065.JPG"
]

export default function AlbumsMain() {
    const classes = useStyles();
    const [showModal, setShowModal] = useState(false)

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
                        images.map(image_url => {
                            return (
                                <Grid 
                                    className={classes.albumContainer}
                                    item 
                                    xs={10} 
                                    md={6}
                                >
                                    <Link className={classes.link} to={`/photographs`}>
                                        <Album
                                            imageSrc={image_url}
                                            albumName="AlbumName"
                                            key={image_url}
                                        />
                                    </Link>
                                </Grid>
                            )
                        })
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
                                        // value={selectedDate}
                                        // onChange={handleDateChange}
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
                                />
                            </Grid>
                            <Grid className={classes.coverImage}>
                                <input
                                    accept="image/*"
                                    className={classes.input}
                                    id="contained-button-file"
                                    multiple
                                    type="file"
                                />
                                <label htmlFor="contained-button-file">
                                    <Button variant="contained" color="primary" component="span">
                                    Cover Image
                                    </Button>
                                </label>
                            </Grid>
                            <Grid>
                                <Button variant="contained" color="primary">Create Album</Button>
                            </Grid>
                        </Grid>
                        </DialogContent>
                </Dialog>
            </Fragment>
            
        </div>
    )
}