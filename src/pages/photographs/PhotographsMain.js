import {Grid, makeStyles } from "@material-ui/core";
import Photograph from "./Photograph";
import { useState } from "react";
import { Fragment } from "react";
import SimpleIconButton from "../../components/SimpleIconButton";
import LibraryAddCheckIcon from '@material-ui/icons/LibraryAddCheck';
import SystemUpdateAltIcon from '@material-ui/icons/SystemUpdateAlt';
import Brightness2Icon from '@material-ui/icons/Brightness2';
import BrightnessLow from '@material-ui/icons/BrightnessLow';

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
    selectAllButton: {
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
    }
});

const images = [
    "https://brettmfox33-personal-website.s3.us-east-2.amazonaws.com/photographs/Bookstore/DSCF0002.JPG",
    "https://brettmfox33-personal-website.s3.us-east-2.amazonaws.com/photographs/Bookstore/DSCF0035.JPG",
    "https://brettmfox33-personal-website.s3.us-east-2.amazonaws.com/photographs/Bookstore/DSCF0054+1.JPG",
    "https://brettmfox33-personal-website.s3.us-east-2.amazonaws.com/photographs/Bookstore/DSCF0067+2.JPG",
    "https://brettmfox33-personal-website.s3.us-east-2.amazonaws.com/photographs/Bookstore/DSCF0065.JPG"
]

export default function PhotographsMain() {
    const classes = useStyles();
    const [theatreView, setTheatreView] = useState(false);
    const [selectAll, setSelectAll] = useState(false);


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
                        Cats & Bookstores
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
                                {/* SELECT ALL */}
                                <SimpleIconButton 
                                    icon={<LibraryAddCheckIcon />}
                                    className={classes.selectAllButton}
                                    onClickFunction={() => setSelectAll(!selectAll)}
                                    toolTipMessage={selectAll ? "Deselect All": "Select All"}
                                />
                                {/* DOWNLOAD */}
                                <SimpleIconButton 
                                    icon={<SystemUpdateAltIcon />}
                                    className={classes.downloadButton}
                                    toolTipMessage="Download Selected Photographs"
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
                    images.map(image_url => {
                         return (
                            <Grid item xs={10} md={8}>
                                <Photograph 
                                    imageSrc={image_url} 
                                    key={image_url} 
                                    theatreView={theatreView}
                                    selectAll={selectAll}
                                />
                            </Grid>
                         )
                    })
                }
        </Grid>
    )
}