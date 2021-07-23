import { faBox, faEllipsisV, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, IconButton, Menu, MenuItem, withStyles, makeStyles, ListItemIcon, ListItemText} from '@material-ui/core';
import React from 'react'
import { useDispatch } from 'react-redux';
import { startDeleteSpace } from '../../actions/space';

export const SpaceRow = ({name, rows, columns, items = 0, uid}) => {

    const dispatch = useDispatch();

    const useStyles = makeStyles({
        root: {
            borderRadius: "20px",
            minWidth: "30px",
            fontSize: "18px"
        },
    })
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleSetEl = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const handleMenuClick = () => {
        dispatch(startDeleteSpace(uid));
    }

    const handleClose = () => {
        setAnchorEl(null);
    }

    return (
        <div className="space-row">    
            <span style={{display:"flex", alignItems:"center"}}><FontAwesomeIcon icon={faBox} style={{marginRight:"6px"}} />{name}</span>
            <div>
                <span className="row-data-margin">{rows} Filas</span>
                <span className="row-data-margin">{columns} Columnas</span>
                <span className="row-data-margin">{items} Objetos</span>
                <Button
                    className={classes.root}
                    aria-controls="simple-menu" 
                    aria-haspopup="true" 
                    onClick={handleSetEl}
                >
                    <FontAwesomeIcon icon={faEllipsisV}/>
                </Button>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem onClick={handleMenuClick}>
                        <ListItemIcon
                            className={classes.root}
                        >
                            <FontAwesomeIcon icon={faTrashAlt}/>
                        </ListItemIcon>
                        <ListItemText primary="Eliminar"/>
                    </MenuItem>
                </Menu>
            </div>
        </div>
    )
}