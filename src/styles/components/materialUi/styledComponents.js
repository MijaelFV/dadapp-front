import { TableRow, withStyles } from "@material-ui/core";

export const StyTableRow = withStyles({
    root: {
        '&.MuiTableRow-root': {
            '&.Mui-selected, .Mui-selected:hover': {
                backgroundColor: 'rgba(255, 135, 71, 0.12) !important'
            },
        }
    }
})(TableRow);