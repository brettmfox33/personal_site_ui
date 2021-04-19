import { makeStyles } from "@material-ui/core";
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import { useEffect, useState } from "react";
import SimpleIconButton from "../../components/SimpleIconButton";

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
    checkBox: {
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

export default function Photograph({imageSrc, theatreView, selectAll}) {
    const classes = useStyles();
    const [selected, setSelected] = useState(selectAll)

    useEffect(() => {
        setSelected(selectAll)
    }, [selectAll])
    
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
                        onClickFunction={() => setSelected(!selected)}
                        icon={
                            selected
                            ? <CheckCircleOutlineIcon className={classes.checkBox} />
                            : <RadioButtonUncheckedIcon className={classes.checkBox} />
                        }
                        toolTipMessage="Select Image"
                    >
                    </SimpleIconButton>
            }
        </div>
    )
}