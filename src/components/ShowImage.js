import { Avatar } from '@material-ui/core'
import React from 'react'
import { useDispatch } from 'react-redux';
import { openModal } from '../redux/actions/ui';

export const ShowImage = ({itemId}) => {
    const dispatch = useDispatch();
    
    const baseUrl = process.env.REACT_APP_API_URL;
    const url = `${baseUrl}api/upload/items/${itemId}`;

    return (
        <img src={url} />
    )
}
