import { Grid, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
    image: {
        maxWidth: '100%',
        maxHeight: 900,
        marginTop: 25,
    },
    albumInfo: {
        backgroundColor: "#5b6973",
        height: 150,
        marginTop: -4,
        marginBottom: 50,
        paddingTop: 10,
        paddingLeft: 15
    },
    albumName: {
        fontSize: 40,
        color: "#ccc"
    },
    albumDate: {
        color: "#ccc",
        marginBottom: 10
    },
    albumDescription: {
        color: "#ccc"
    }
});

export default function Album({imageSrc}) {
    const classes = useStyles();

    return (
        <div>
            <img 
                className={classes.image}
                alt="the_image" 
                src={imageSrc} 
            /> 
            <Grid
                container
                direction="column"
                className={classes.albumInfo}
            >
                <Grid className={classes.albumName} >
                    Album Name
                </Grid>
                <Grid className={classes.albumDate} >
                    02-20-21
                </Grid>
                <Grid className={classes.albumDescription} >
                    Description of the album!
                </Grid>
            </Grid>
        </div>
    )
}