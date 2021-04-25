import { makeStyles } from "@material-ui/core";
import SimpleIconButton from "../../components/SimpleIconButton";
import SystemUpdateAltIcon from '@material-ui/icons/SystemUpdateAlt';

const useStyles = makeStyles({
    photo: {
        maxWidth: "100%",
        maxHeight: 900,
        marginBottom: 30
    },
    imageContainer: {
        position: 'relative'
    },
    downloadIcon: {
        width: 40,
        height:30,
        color: '#f2f2f2'
    },
    iconButton: {
        position: 'absolute',
        bottom: 30,
        right: 0
    }
});

export default function Photograph({photograph, theatreView}) {
    const classes = useStyles();

    const downloadImage = () => {
        fetch(photograph.photo, {
            method: "GET",
            headers: {}
          }).then(response => {
            response.arrayBuffer().then(function(buffer) {
              const link = document.createElement("a");
              link.href = window.URL.createObjectURL(new Blob([buffer]));
              link.setAttribute("download", photograph.title);
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
                <img alt={photograph.title} src={photograph.photo} className={classes.photo}/>
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