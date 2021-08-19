import { Button, TableRow, withStyles } from "@material-ui/core";

export const StyBtn = withStyles({
    root: {
        height: "40px",
        boxShadow: "rgb(240, 240, 240) 0px 0px 0px 0px",
    },
})(Button);

export const StyledIconButton = withStyles({
    root: {
        background: "#FF8747",
        height: "40px",
        minWidth: "40px",
        borderRadius: "15px",
        boxShadow: "rgb(240, 240, 240) 0px 0px 0px 0px",
        "&:hover": {
            background: "#FF8747",
        }
    },
    label: {
        fontSize: "18px",
        textTransform: 'capitalize',
    }
})(Button);

export const StySpaceBtnDel = withStyles({
    root: {
        background: "grey",
        height: "40px",
        boxShadow: "rgb(240, 240, 240) 0px 0px 0px 0px",
        "&:hover": {
            background: "#565656"
        }
    },
    label: {
        textTransform: 'capitalize',
        color: 'white'
    },
})(Button);

export const StyTableRow = withStyles({
    root: {
        '&.MuiTableRow-root': {
            '&.Mui-selected, .Mui-selected:hover': {
                backgroundColor: 'rgba(255, 135, 71, 0.12) !important'
            },
        }
    }
})(TableRow);