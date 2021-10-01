import React from 'react'
import noImage from '../assets/no-image.jpg'

export const ShowImage = ({item}) => {    
    // const baseUrl = process.env.REACT_APP_API_URL;
    // const url = `${baseUrl}api/upload/items/${item?.uid}`;
    const url = item?.image || noImage;


    return (
        <img key={Date.now()} src={url} alt="Item" />
    )
}
