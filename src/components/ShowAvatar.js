import { Avatar } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux';
import { openModal } from '../redux/actions/ui';

export const ShowAvatar = ({avatarClass, user, profile, variant}) => {
    const dispatch = useDispatch();
    
    // const baseUrl = process.env.REACT_APP_API_URL;
    // const url = `${baseUrl}api/upload/users/${user?.uid}`;
    const url = user?.image;

    const handleProfileClick = () => {
        if (profile === true) {
            dispatch(openModal("ProfileModal"));
        }
    }

    return (
        <Avatar variant={variant} className={avatarClass} style={{width:"100%", height:"100%"}} onClick={handleProfileClick} src={url} alt={user?.name} />
    )
}
