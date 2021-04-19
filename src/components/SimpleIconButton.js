import { IconButton, Tooltip, withStyles } from "@material-ui/core";

const NoHoverColorIconButton = withStyles((theme) => ({
    root: {
      '&:hover': {
        backgroundColor: 'transparent',
      },
    },
  }))(IconButton);

export default function SimpleIconButton({icon, className, onClickFunction, toolTipMessage}) {
    return (
        <Tooltip title={toolTipMessage}>
            <NoHoverColorIconButton 
                onClick={
                    onClickFunction
                    ? () => onClickFunction()
                    : null
                }
                disableRipple={true}
                className={className}
            >
                {icon}
            </NoHoverColorIconButton>
        </Tooltip>
    )
}