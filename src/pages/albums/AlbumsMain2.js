import { useEffect, useState } from "react";
import {Divider, Grid, makeStyles } from "@material-ui/core";
import Album from "./Album2";

const useStyles = makeStyles({
    collectionTitle: {
        fontSize: 36,
        marginTop: 100
    },
    divider: {
        marginTop: 10
    },
    coverImageContainer: {
        padding: 20
    },
})

export default function AlbumsMain() {
    const classes = useStyles();

    const [albums, setAlbums] = useState([])

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

    return (
        <Grid container direction="row">
            {/* LEFT SPACING */}
            <Grid item xs={1}></Grid>
            {/* MAIN CONTENT */}
            <Grid item xs={10} className={classes.collectionTitle}>
                <Grid container direction="column">
                    {/* HEADER */}
                    <Grid>
                        Collections
                        <Divider className={classes.divider} />
                    </Grid>
                    {/* ALBUM ROW */}
                    {
                        albums.length > 0
                        ? 
                            <Grid container direction="row" justify="space-between">
                                 {
                                    albums.map(album => {
                                        return (
                                            <Grid item xs={12} lg={4} className={classes.coverImageContainer} key={album.uuid}>
                                                <Album album={album}/>
                                            </Grid>
                                        )
                                    })
                                }
                            </Grid>
                        : 
                            null
                    }
                    </Grid>
            </Grid>
            {/* RIGHT SPACING */}
            <Grid item xs={1}></Grid>
        </Grid>
    )
}