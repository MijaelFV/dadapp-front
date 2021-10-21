 import React from 'react'
import { faArrowLeft, faSlidersH } from '@fortawesome/free-solid-svg-icons'
import { InputBase, IconButton, Chip, LinearProgress } from '@mui/material'
import { useHistory } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSelector } from 'react-redux'
import { SearchResults } from './components/SearchResults'
import { Controller, useForm, useWatch } from 'react-hook-form'


export const SearchScreen = () => {
    const history = useHistory()
    const isLoading = useSelector(state => state.ui.isLoading)

    const handleReturnClick = () => {
        history.push("/home")
    }

    const { control, reset } = useForm({
        defaultValues: {
            query: ''
        }
    })
    const query = useWatch({control, name: 'query'})

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
                    disabled
                    // onClick={handleShowFiltersClick}
                >
                    <FontAwesomeIcon 
                        icon={faSlidersH} 
                    />
                </IconButton>
            </div>
            {
                isLoading === true
                ? <LinearProgress />
                : null
            }
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
            <SearchResults type={"all"} query={query}/>
        </div>
    )
}
