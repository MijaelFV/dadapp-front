import { Button, withStyles } from "@material-ui/core";

export const StyledButton = withStyles({
    root: {
        background: "white",
        height: "40px",
        boxShadow: "rgb(240, 240, 240) 0px 0px 10px 0px",

    },
    label: {
        textTransform: 'capitalize',
        color: 'black'
    },
})(Button);

export const StyledIconButton = withStyles({
    root: {
        background: "#ffad4e",
        height: "40px",
        minWidth: "40px",
        borderRadius: "20px",
        boxShadow: "rgb(240, 240, 240) 0px 0px 10px 0px",
        "&:hover": {
            background: "#ffad4e",
        }
    },
    label: {
        fontSize: "18px",
        textTransform: 'capitalize',
    }
})(Button);