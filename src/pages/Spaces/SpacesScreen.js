import { faArrowsAltH, faArrowsAltV, faChevronDown, faChevronUp, faFolderPlus, faPlus, faSadTear, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar, Collapse, IconButton, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, TextField, FormControl, InputLabel, Select, Divider } from '@mui/material';
import React, { useMemo, useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { showOptionsColRow } from '../../helpers/showOptionsColRow';
import { clearInventory } from '../../redux/actions/inv';
import { startCreateSpace, startLoadingSpaces } from '../../redux/actions/space';

export const SpaceScreen = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const spaces = useSelector(state => state.space.spaces);
    const area = useSelector(state => state.area.active);
    
    const [isFormOpen, setIsFormOpen] = useState(false)
    
    useMemo(() => {
        dispatch(clearInventory());
        dispatch(startLoadingSpaces(area.uid));
    }, [dispatch, area.uid])

    const { control, reset, handleSubmit } = useForm({
        defaultValues: {
            spacename: '',
            rows: '',
            columns: '',
        }
    });
    
    const handleOpenSpace = (uid) => {
        history.push(`/space/${uid}`)
    }

    const handleShowForm = () => {
        if (isFormOpen) {
            setIsFormOpen(false)
        } else {
            setIsFormOpen(true)
        }
    }

    const handleNewSpace = (data) => {
        dispatch(startCreateSpace(data.spacename, data.rows, data.columns, area.uid));
        setIsFormOpen(false);
        reset()
    }

    const showSpaces = () => (
        spaces.map((space) => {
            return [
                <ListItem
                    disabled={isFormOpen} 
                    key={space.uid} 
                    button 
                    onClick={() => handleOpenSpace(space.uid)}
                >
                    <ListItemAvatar>
                        <div className="grid grid-flow-row w-12 mr-3 bg-gray-800 p-0.5 rounded-md overflow-hidden">
                            <div className="flex w-full text-black overflow-hidden rounded-tl-md rounded-tr-md">
                                <p className="w-full text-center font-bold text-sm bg-white">
                                    {space.rows}
                                </p>
                                <div className="flex items-center justify-center bg-gray-800 w-full h-5 text-white">
                                    <FontAwesomeIcon icon={faArrowsAltV}/>
                                </div>
                            </div>
                            <div className="h-0.5 w-full bg-gray-800"/>
                            <div className="flex w-full text-black overflow-hidden rounded-bl-md rounded-br-md">
                                <p className="w-full text-center font-bold text-sm bg-white">
                                    {space.columns}
                                </p>
                                <div className="flex items-center justify-center bg-gray-800 w-full h-5 text-white">
                                    <FontAwesomeIcon icon={faArrowsAltH}/>
                                </div>
                            </div>
                        </div>
                    </ListItemAvatar>
                    <ListItemText primary={space.name}/>
                    <IconButton 
                        edge="end" 
                        disabled={isFormOpen}
                        disableTouchRipple
                    >
                        <FontAwesomeIcon icon={faSignInAlt} />
                    </IconButton>
                </ListItem>
            ]})
    )

    return (
        <div className="text-white bg-gray-900 flex flex-col w-full h-auto min-h-full pb-20" style={{maxWidth:"500px", marginInline:"auto"}}>
            <List>
                <ListItem 
                    button 
                    onClick={handleShowForm}
                >
                    <ListItemText primary="Crear Espacio"/>
                    <IconButton 
                        edge="end"
                    >
                        <FontAwesomeIcon icon={isFormOpen ? faChevronUp : faChevronDown} />
                    </IconButton>
                </ListItem>
                <Collapse in={isFormOpen} timeout="auto" unmountOnExit>
                    <List>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar variant="rounded" style={{backgroundColor: "white"}}>
                                    <FontAwesomeIcon icon={faFolderPlus} />
                                </Avatar>
                            </ListItemAvatar>
                                <form onSubmit={handleSubmit(handleNewSpace)} className="w-8/12" autoComplete="off">
                                    <div className="grid grid-flow-row w-full">
                                        <Controller 
                                            name="spacename"
                                            control={control}
                                            render={({ field }) => 
                                            <TextField 
                                                {...field}
                                                autoFocus={true}
                                                fullWidth
                                                required
                                                InputLabelProps={{ required: false, shrink: true }}
                                                size="small"
                                                label="Nombre de Espacio"
                                                variant="outlined"
                                                type="text"
                                            />}
                                        />
                                        <div className="grid grid-cols-2 gap-1 mt-1">
                                            <FormControl
                                                variant="outlined"
                                                size="small"
                                            >
                                                <InputLabel shrink htmlFor="rows-select">Filas</InputLabel>
                                                <Controller 
                                                    name="rows"
                                                    control={control}
                                                    render={({ field }) => 
                                                    <Select
                                                        {...field} 
                                                        native
                                                        notched
                                                        required
                                                        label="rows"
                                                        inputProps={{
                                                            name: "rows",
                                                            id: "rows-select"
                                                        }}
                                                    >
                                                        {showOptionsColRow(10)}
                                                    </Select>}
                                                />
                                            </FormControl>
                                            <FormControl
                                                variant="outlined"
                                                size="small"
                                            >
                                                <InputLabel shrink htmlFor="columns-select">Columnas</InputLabel>
                                                <Controller 
                                                    name="columns"
                                                    control={control}
                                                    render={({ field }) => 
                                                    <Select
                                                        {...field} 
                                                        native
                                                        notched
                                                        label="columns"
                                                        required
                                                        inputProps={{
                                                            name: "columns",
                                                            id: "columns-select"
                                                        }}
                                                    >
                                                        {showOptionsColRow(10)}
                                                    </Select>}
                                                />
                                            </FormControl>
                                        </div>
                                    </div>
                                    <ListItemSecondaryAction>
                                        <IconButton edge="end" color="primary" type="submit">
                                            <FontAwesomeIcon icon={faPlus} />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </form>
                        </ListItem>
                    </List>
                </Collapse>
            </List>
            <Divider/>
            {
                spaces.length > 0 
                ? (<List>{showSpaces()}</List>)
                : (<div className="mx-auto my-auto flex flex-col items-center text-gray-400">
                    <FontAwesomeIcon icon={faSadTear} size="5x" />
                    <p className="mt-3">No hay espacios para mostrar</p>
                    <p>Agrega uno en el apartado <b>Crear espacio</b></p>
                </div>)
            } 
        </div>
    )
}