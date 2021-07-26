import { faBoxes, faEllipsisV, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Menu, MenuItem, makeStyles, ListItemIcon, ListItemText} from '@material-ui/core';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { startDeleteSpace } from '../../actions/space';

export const SpaceRow = ({name, rows, columns, items = 0, uid}) => {

    const dispatch = useDispatch();
    const history = useHistory();

    const useStyles = makeStyles({
        root: {
            borderRadius: "20px",
            minWidth: "30px",
            fontSize: "18px"
        },
    })
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = useState(null);

    const handleSetEl = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const handleMenuClick = () => {
        dispatch(startDeleteSpace(uid));
    }

    const handleRowClick = (uid) => {
        history.push(`/space/${uid}`)
    }

    const handleClose = () => {
        setAnchorEl(null);
    }

    return (
        <div className="rowContainer-row">    
            <span style={{display:"flex", alignItems:"center"}}><FontAwesomeIcon icon={faBoxes} style={{marginRight:"6px"}} />{name}</span>
            <div style={{display:"flex", alignItems:"center"}} onClick={() => {
                handleRowClick(uid)
            }}>
                <span className="rowContainer-data-margin">{rows} Filas</span>
                <span className="rowContainer-data-margin">{columns} Columnas</span>
                <span className="rowContainer-data-margin">{items} Objetos</span>
            </div>
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
    )
}