import React, { useEffect } from 'react'
import { faArrowLeft, faCross, faSlidersH, faTimes } from '@fortawesome/free-solid-svg-icons'
import { AppBar, makeStyles, TextField, Toolbar, InputBase, IconButton, Chip } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useDispatch, useSelector } from 'react-redux'
import { clearSearch, getSearch } from '../../redux/actions/search'
import { SearchResults } from './components/SearchResults'
import { Controller, useForm, useWatch } from 'react-hook-form'


export const SearchScreen = () => {
    const dispatch = useDispatch();
    const areaId = useSelector(state => state.area.active.uid)

    const history = useHistory()
    const handleReturnClick = () => {
        history.push("/home")
    }

    const { control, reset } = useForm({
        defaultValues: {
            query: ''
        }
    })
    const query = useWatch({control, name: 'query'})

    useEffect(() => {
        if (query.length >= 1) {
            console.log('buscando');
            dispatch(getSearch("all", areaId, query))
        } else {
            dispatch(clearSearch())
        }
    }, [query])

    const handleDeleteQuery = () => {
        reset()
    }

    return (
        <div className="search-container">
            <div className="search-column">
                <div className="topBar">
                    <IconButton
                        onClick={handleReturnClick}
                        color="primary"
                    >
                        <FontAwesomeIcon 
                            icon={faArrowLeft} 
                        />
                    </IconButton>
                    <Controller 
                        name="query"
                        control={control}
                        render={({ field }) => 
                        <InputBase 
                            {...field} 
                            placeholder="Buscar..."
                            size="small"
                            variant="outlined"
                            autoFocus={true}
                            className="topBar-searchField"
                        />}
                    />
                    <IconButton
                        color="primary"
                        // onClick={handleShowFiltersClick}
                    >
                        <FontAwesomeIcon 
                            icon={faSlidersH} 
                        />
                    </IconButton>
                </div>
                {
                    query.length >= 1 
                    ?   <div>
                            <Chip
                                className="chip"
                                label={query}
                                clickable
                                onDelete={handleDeleteQuery}
                            />
                        </div>
                    :   null
                }
                <SearchResults type={"all"} />
            </div>
        </div>
    )
}
