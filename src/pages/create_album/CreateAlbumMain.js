import { makeStyles, TextField } from "@material-ui/core";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

const useStyles = makeStyles({

});

export default function CreateAlbumMain() {
    const classes = useStyles();

    return (
        <div>
            <form noValidate autoComplete="off">
                <TextField 
                    id="outlined-basic" 
                    label="Album Name" 
                    variant="outlined" 
                />    
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
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
                    <TextField 
                        id="outlined-basic" 
                        label="Album Descritption" 
                        variant="outlined" 
                        multiline
                        rows={4}               
                    />
                    </MuiPickersUtilsProvider>
            </form>
        </div>
    )
}