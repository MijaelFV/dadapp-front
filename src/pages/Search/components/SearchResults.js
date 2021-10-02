import { faSignInAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Avatar, IconButton, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Pagination } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { ItemFeaturesCollapse } from '../../../components/ItemFeaturesCollapse'
import { ShowAvatar } from '../../../components/ShowAvatar'
import { ShowImage } from '../../../components/ShowImage'
import { clearSearch, getSearch } from '../../../redux/actions/search'

export const SearchResults = ({type, query}) => {
    const dispatch = useDispatch();
    const history = useHistory()

    const searchResults = useSelector(state => state.search)
    const totalPagesItems = useSelector(state => state.search.items.totalPages)
    const totalPagesUsers = useSelector(state => state.search.users.totalPages)
    const areaid = useSelector(state => state.area.active.uid)

    const [isCollapseOpen, setIsCollapseOpen] = useState(false)

    const [pageItems, setPageItems] = useState(1);
    const [pageUsers, setPageUsers] = useState(1);
    const [rowsPerPage] = useState(10);

    useEffect(() => {
        if (query.length < 1) {
            dispatch(clearSearch())
        }
    }, [query, dispatch])

    useEffect(() => {
        dispatch(getSearch("items", areaid, query, '', pageItems, rowsPerPage))
    }, [dispatch, areaid, query, pageItems, rowsPerPage])

    useEffect(() => {
        dispatch(getSearch("users", areaid, query, '', pageUsers, rowsPerPage))
    }, [dispatch, areaid, query, pageUsers, rowsPerPage])

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
        if (i !== isCollapseOpen) {
            setIsCollapseOpen(i)
        } else {
            setIsCollapseOpen(false)
        }
    }

    const handleChangePageItems = (e, newPage) => {
        setPageItems(newPage);
    };

    const handleChangePageUsers = (e, newPage) => {
        setPageUsers(newPage);
    };

    const showItems = (result, index) => ([
        <ListItem 
            key={result.uid}
            button 
            onClick={() => handleShowForm(index)} 
            style={isCollapseOpen === index ? {backgroundColor:"rgb(55 65 81)"} : {}}
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
        <ItemFeaturesCollapse item={result} isCollapseOpen={isCollapseOpen} index={index} />
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
                [<List className="mb-5">
                    {
                        searchResults.items.docs.length > 0
                        ? ([
                            <span className="font-semibold ml-3">Articulos</span>,
                            searchResults.items.docs.map((result, index) => (
                                showItems(result, index)
                            )),
                            <div className="flex justify-center my-2">
                                <Pagination count={totalPagesItems} size="small" page={pageItems} onChange={handleChangePageItems} hidden={totalPagesItems < 2} />
                            </div>])
                        : null
                    }
                </List>],
                [<List className="mb-5">
                    {
                        searchResults.users.docs.length > 0
                        ? ([
                            <span className="font-semibold ml-3">Usuarios</span>,
                            searchResults.users.docs.map((result) => (
                                showUsers(result)
                            )),
                            <div className="flex justify-center my-2">
                                <Pagination count={totalPagesUsers} size="small" page={pageUsers} onChange={handleChangePageUsers} hidden={totalPagesUsers < 2} />
                            </div>])
                        : null
                    }
                </List>]
            ]
        } else if (type === "items") {
            return searchResults.items.docs.map((result) => (
                [<span className="font-semibold ml-3">Articulos</span>,
                showItems(result)]
            ))
        } else if (type === "users") {
            return searchResults.users.docs.map((result) => (
                [<span className="font-semibold ml-3">Usuarios</span>,
                showUsers(result)]
            ))
        }
    }

    return (
        <div className="mt-3 p-2">
            {
                searchResults.items.docs.length >= 1 | searchResults.users.docs.length >= 1
                ? showResults()
                : null
            }
        </div>
    )
}
