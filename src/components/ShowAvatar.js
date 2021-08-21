import { Avatar } from '@material-ui/core'
import React from 'react'
import { useDispatch } from 'react-redux';
import { openModal } from '../redux/actions/ui';

export const ShowAvatar = ({avatarClass, username, userId}) => {
    const dispatch = useDispatch();
    
    const baseUrl = process.env.REACT_APP_API_URL;
    const url = `${baseUrl}api/upload/users/${userId}`;

    const handleProfileClick = () => {
        dispatch(openModal("ProfileModal"));
    }

    return (
        <Avatar className={avatarClass} onClick={handleProfileClick} src={url} alt={username} />
    )
}
