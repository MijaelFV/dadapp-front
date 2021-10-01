import { faSignInAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Avatar, IconButton, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText } from '@mui/material'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { ItemFeaturesCollapse } from '../../../components/ItemFeaturesCollapse'
import { ShowAvatar } from '../../../components/ShowAvatar'
import { ShowImage } from '../../../components/ShowImage'

export const SearchResults = ({type, history, dispatch}) => {
    const searchResults = useSelector(state => state.search)

    const [isFormOpen, setIsFormOpen] = useState(false)

    const handleItemClick = async(itemid, spaceid) => {
        if (itemid && spaceid) {
            history.push(`/item/${spaceid}/${itemid}`)
        }
    }

    const handleUserClick = async(userid) => {
        if (userid) {
            history.push(`/user/${userid}`)
        }
    }

    const handleShowForm = (i) => {
        if (i !== isFormOpen) {
            setIsFormOpen(i)
        } else {
            setIsFormOpen(false)
        }
    }

    const showItems = (result, index) => ([
        <ListItem 
            key={result.uid}
            button 
            onClick={() => handleShowForm(index)} 
            style={isFormOpen === index ? {backgroundColor:"rgb(55 65 81)"} : {}}
        >
            <ListItemAvatar>
                <Avatar variant="rounded">
                    <div>
                        <ShowImage item={result}/>
                    </div>
                </Avatar>
            </ListItemAvatar>
            <ListItemText primary={result.name} />
            <ListItemSecondaryAction>
                <IconButton edge="end" onClick={() => handleItemClick(result.uid, result.space._id)}>
                    <FontAwesomeIcon icon={faSignInAlt} />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>,
        <ItemFeaturesCollapse item={result} isFormOpen={isFormOpen} index={index} />
    ])

    const showUsers = (result) => (
            <ListItem key={result.uid} button onClick={() => handleUserClick(result.uid)}>
                <ListItemAvatar>
                    <div className="w-10 h-10">
                        <ShowAvatar user={result} />
                    </div>
                </ListItemAvatar>
                <ListItemText primary={result.name} secondary={result.email}  />
                <IconButton edge="end" style={{color:"#ffffff"}} disableTouchRipple disabled>
                    <FontAwesomeIcon icon={faSignInAlt} />
                </IconButton>
            </ListItem>
    )
    
    const showResults = () => {
        if (type === "all") {
            return [
                [<span className="font-semibold ml-3">Articulos</span>,
                <List className="mb-5">
                    {searchResults.items.map((result, index) => (
                    showItems(result, index)
                ))}
                </List>],
                [<span className="font-semibold ml-3">Usuarios</span>,
                <List className="mb-5">
                    {searchResults.users.map((result) => (
                    showUsers(result)
                ))}
                </List>]
            ]
        } else if (type === "items") {
            return searchResults.items.map((result) => (
                [<span className="font-semibold ml-3">Articulos</span>,
                showItems(result)]
            ))
        } else if (type === "users") {
            return searchResults.users.map((result) => (
                [<span className="font-semibold ml-3">Usuarios</span>,
                showUsers(result)]
            ))
        }
    }

    return (
        <div className="mt-3 p-2">
            {
                searchResults.items.length >= 1 | searchResults.users.length >= 1
                ? showResults()
                : null
            }
        </div>
    )
}
