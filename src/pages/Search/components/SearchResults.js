import { faSignInAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Avatar, Divider, IconButton, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText } from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux'
import { ShowAvatar } from '../../../components/ShowAvatar'
import { ShowImage } from '../../../components/ShowImage'

export const SearchResults = ({type}) => {

    const searchResults = useSelector(state => state.search)

    const showItems = (result) => (
        <ListItem key={result.uid} button>
            <ListItemAvatar>
                <Avatar variant="rounded">
                    <div className="itemImage">
                        <ShowImage itemId={result.uid}/>
                    </div>
                </Avatar>
            </ListItemAvatar>
            <ListItemText primary={result.name} secondary={`${result.space.name} | Fila ${result.row} - Columna ${result.column}`}  />
            <ListItemSecondaryAction>
                <IconButton edge="end" color="primary">
                    <FontAwesomeIcon icon={faSignInAlt} />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    )

    const showUsers = (result) => (
            <ListItem key={result.uid} button>
                <ListItemAvatar>
                    <ShowAvatar userId={result.uid} username={result.name} />
                </ListItemAvatar>
                <ListItemText primary={result.name} secondary={result.email}  />
                <ListItemSecondaryAction>
                    <IconButton edge="end" color="primary">
                        <FontAwesomeIcon icon={faSignInAlt} />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
    )
    
    const showResults = () => {
        if (type === "all") {
            return [
                [<span className="searchLabel">Articulos</span>,
                <List className="list">
                    {searchResults.items.map((result) => (
                    showItems(result)
                ))}
                </List>],
                [<span className="searchLabel">Usuarios</span>,
                <List className="list">
                    {searchResults.users.map((result) => (
                    showUsers(result)
                ))}
                </List>]
            ]
        } else if (type === "items") {
            return searchResults.items.map((result) => (
                [<span className="searchLabel">Articulos</span>,
                showItems(result)]
            ))
        } else if (type === "users") {
            return searchResults.users.map((result) => (
                [<span className="searchLabel">Usuarios</span>,
                showUsers(result)]
            ))
        }
    }

    return (
        <div className="searchResults-container">
            {
                searchResults.items.length >= 1 | searchResults.users.length >= 1
                ? showResults()
                : null
            }
        </div>
    )
}
