import React, { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { activeArea, createArea, joinArea, setUserRole, startLoadingAreas } from '../../redux/actions/area';
import { ProfileModal } from '../../components/ProfileModal';
import { ShowAvatar } from '../../components/ShowAvatar';
import { Avatar, AppBar, Collapse, IconButton, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, TextField, Toolbar, Divider } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp, faFolderPlus, faPlus, faSadTear, faSignInAlt, faWarehouse } from '@fortawesome/free-solid-svg-icons';
import { Controller, useForm } from 'react-hook-form';
import { userIsAdmin } from '../../helpers/userIsAdmin';

export const AreaScreen = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth);
    const areas = useSelector(state => state.area.areas);


    const [isFormOpen, setIsFormOpen] = useState(false)

    const { control, handleSubmit, reset} = useForm({
        defaultValues: {
            areaname: '',
            code: '',
        }
    });

    useMemo(() => {
        dispatch(startLoadingAreas());
    }, [dispatch])

    const handleOpenArea = (area) => {
        const isUserAdmin = userIsAdmin(area, user.uid);
        dispatch(activeArea(area))
        if (isUserAdmin) {
            dispatch(setUserRole(true))
        } else {
            dispatch(setUserRole(false))
        }
    }

    const handleShowForm = () => {
        if (isFormOpen) {
            setIsFormOpen(false)
        } else {
            setIsFormOpen(true)
        }
    }

    const handleNewArea = (data) => {
        dispatch(createArea(data.areaname))
        setIsFormOpen(false);
        reset()
    }

    const handleJoinArea = (data) => {
        dispatch(joinArea(data.code))
        reset()
    }

    const showAreas = () => (
        areas.map((area) => {
            return [
                <ListItem
                    disabled={isFormOpen} 
                    key={area.uid} 
                    button 
                    onClick={() => handleOpenArea(area)}
                >
                    <ListItemAvatar>
                        <Avatar variant="rounded" style={isFormOpen ? null : {backgroundColor: "white"}}>
                            <FontAwesomeIcon icon={faWarehouse}/>
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={area.name} secondary={userIsAdmin(area, user.uid) ? "Administrador" : "Miembro"}/>
                    <IconButton 
                        edge="end" 
                        disabled={isFormOpen}
                    >
                        <FontAwesomeIcon icon={faSignInAlt} />
                    </IconButton>
                </ListItem>
            ]})
    )

    return (
        <div className="text-white bg-gray-900 flex flex-col w-full h-auto min-h-full" style={{maxWidth:"500px", marginInline:"auto"}}>
            <List>
                <ListItem 
                    button 
                    onClick={handleShowForm}
                >
                    <ListItemText primary="Crear Área"/>
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
                            <form onSubmit={handleSubmit(handleNewArea)} autoComplete="off">
                                <Controller 
                                    name="areaname"
                                    control={control}
                                    render={({ field }) => 
                                    <TextField 
                                        {...field}
                                        autoFocus={true}
                                        style={{width:"85%"}}
                                        required
                                        InputLabelProps={{ required: false, shrink: true }}
                                        size="small"
                                        label="Nombre de Área"
                                        variant="outlined"
                                        type="text"
                                    />}
                                /> 
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
                areas.length > 0 
                ? (<List>{showAreas()}</List>)
                : (<div className="mx-auto my-auto flex flex-col items-center text-gray-400">
                    <FontAwesomeIcon icon={faSadTear} size="5x" />
                    <p className="mt-3">No hay areas para mostrar</p>
                    <p>Agrega una en el apartado <b>Crear Área</b></p>
                </div>)
            } 
            <div className="mt-auto">
                <AppBar position="static" color="default" sx={{backgroundColor:"#080e1bfa", backgroundImage:"none"}}>
                    <Toolbar>
                        <form onSubmit={handleSubmit(handleJoinArea)} autoComplete="off">
                            <Controller 
                                name="code"
                                control={control}
                                render={({ field }) => 
                                <TextField 
                                    {...field} 
                                    sx={{
                                        width:"90%"
                                    }}
                                    size="small"
                                    variant="outlined"
                                    placeholder="Codigo de invitacion"
                                    type="text"
                                />}
                            />
                        </form>
                        <div className="w-10 h-10 ml-auto cursor-pointer no-tap-highlight">
                            <ShowAvatar avatarClass="border-2" user={user} profile={true} />
                        </div>
                    </Toolbar>
                </AppBar>    
            </div>
            <ProfileModal />
        </div>
    )
}
