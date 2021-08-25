import React from 'react'
import { useDispatch } from 'react-redux';
import { activeArea } from '../../../redux/actions/area';

export const AreaRow = ({area}) => {

    const dispatch = useDispatch();

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