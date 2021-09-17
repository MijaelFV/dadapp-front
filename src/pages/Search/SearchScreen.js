 import React, { useEffect } from 'react'
import { faArrowLeft, faSlidersH } from '@fortawesome/free-solid-svg-icons'
import { InputBase, IconButton, Chip } from '@material-ui/core'
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
            dispatch(getSearch("all", areaId, query))
        } else {
            dispatch(clearSearch())
        }
    }, [query, areaId, dispatch])

    const handleDeleteQuery = () => {
        reset()
    }

    return (
        <div className="text-white bg-gray-900 flex flex-col w-full h-auto min-h-full pb-20" style={{maxWidth:"500px", marginInline:"auto"}}>
            <div className="mt-3 px-1 flex border-b-2 border-solid border-white">
                <IconButton
                    onClick={handleReturnClick}
                    color="primary"
                >
                    <FontAwesomeIcon 
                        icon={faArrowLeft} 
                    />
                </IconButton>
                <div className="w-4"/>
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
                    />}
                />
                <div className="mr-auto"/>
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
                            className="my-1.5 ml-2 font-bold bg-white bg-opacity-10"
                            style={{marginBlock:"6px", marginLeft:"8px", backgroundColor:"rgb(42 50 66)"}}
                            label={query}
                            clickable
                            onDelete={handleDeleteQuery}
                        />
                    </div>
                :   null
            }
            <SearchResults type={"all"} history={history} dispatch={dispatch}/>
        </div>
    )
}
