import { Grid, makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
    coverImage: {
        minWidth: "100%",
        maxWidth: "100%",
        maxHeight: 300,
        objectFit: "cover"
    },
    coverTitle: {
        fontSize: 26,
        marginBottom: 5,
        color: "black"
    },
    coverDetails: {
        fontSize: 15,
        color: "#858585"
    },
    locationText: {
        marginLeft: 30,
        marginRight: 30
    },
    coverDetailText: {
        marginTop: 5
    },
    albumDescription: {
        fontSize: 15,
        color: "#858585"
    },
    innerAlbumContainer: {
        cursor: "pointer"
    },
    link: {
        textDecoration: "none",
    },
});

export default function Album({album}) {
    const classes = useStyles();

    return (
        <Link className={classes.link} to={`/albums/${album.uuid}/photographs`}>
            <Grid container direction="column" className={classes.innerAlbumContainer}>
                <Grid>
                    <img alt={album.title} src={album.cover_photo} className={classes.coverImage} />
                </Grid>
                <Grid container direction="row" className={classes.coverTitle} justify="space-between" alignItems="center">
                    <Grid item >{album.title}</Grid>
                    <Grid item className={classes.coverDetails}>
                        {album.photographs.length} photos
                    </Grid>
                </Grid>
                <Grid className={classes.albumDescription}>
                    {album.description}
                </Grid>
            </Grid>
        </Link>
    )
}