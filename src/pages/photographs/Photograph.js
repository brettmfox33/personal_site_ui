import { makeStyles } from "@material-ui/core";
import SimpleIconButton from "../../components/SimpleIconButton";
import SystemUpdateAltIcon from '@material-ui/icons/SystemUpdateAlt';

const useStyles = makeStyles({
    image: {
        maxWidth: '100%',
        maxHeight: 900,
        marginTop: 25,
        marginBottom: 25,
        border: ".5px solid white",
    },
    theatreImage: {
        maxWidth: '100%',
        maxHeight: 900,
        marginTop: 25,
        marginBottom: 25,
    },
    downloadIcon: {
        width: 40,
        height:30,
        color: '#f2f2f2'
    },
    imageContainer: {
        position: 'relative'
    },
    iconButton: {
        position: 'absolute',
        bottom: 30,
        right: 0
    }
});

export default function Photograph({imageSrc, theatreView, imageTitle}) {
    const classes = useStyles();
    
    const downloadImage = () => {
        fetch(imageSrc, {
            method: "GET",
            headers: {}
          }).then(response => {
            response.arrayBuffer().then(function(buffer) {
              const link = document.createElement("a");
              link.href = window.URL.createObjectURL(new Blob([buffer]));
              link.setAttribute("download", imageTitle);
              document.body.appendChild(link);
              link.click();
            });
          })
          .catch(err => {
            console.log(err);
          });
    }

    return (
        <div className={classes.imageContainer}>
            <img 
                className={theatreView ? classes.theatreImage : classes.image} 
                alt="the_image" 
                src={imageSrc} 
            /> 
            {
                theatreView
                ? 
                    null
                :   
                    <SimpleIconButton
                        className={classes.iconButton}
                        onClickFunction={() => downloadImage()}
                        icon={<SystemUpdateAltIcon className={classes.downloadIcon} />}
                        toolTipMessage="Download Image"
                    >
                    </SimpleIconButton>
            }
        </div>
    )
}