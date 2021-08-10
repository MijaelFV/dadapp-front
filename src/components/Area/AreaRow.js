import { Button, Menu, MenuItem, makeStyles, ListItemIcon, ListItemText} from '@material-ui/core';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { activeArea } from '../../actions/area';

export const AreaRow = ({area}) => {

    const dispatch = useDispatch();
    const history = useHistory();

    const handleRowClick = () => {
        area = {
            name: area.name,
            uid: area.uid
        }
        dispatch(activeArea(area))
    }

    return (
        <div 
            className="areaRow" 
            onClick={() => {
                handleRowClick()
            }}
        >   
            <div className="areaName">
                <span>{area.name}</span>
            </div> 
        </div>
    )
}