import React from 'react'

export const ShowImage = ({itemId}) => {    
    const baseUrl = process.env.REACT_APP_API_URL;
    const url = `${baseUrl}api/upload/items/${itemId}`;

    return (
        <img key={Date.now()} src={url} alt="Item" />
    )
}
