import React, { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { activeArea, createArea, startLoadingAreas } from '../../redux/actions/area';
import { AreaRow } from './components/AreaRow';
import { ProfileModal } from '../../components/ProfileModal';
import { ShowAvatar } from '../../components/ShowAvatar';
import { Avatar, AppBar, Button, Collapse, IconButton, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, TextField, Toolbar } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp, faFolderPlus, faPlus, faSignInAlt, faWarehouse } from '@fortawesome/free-solid-svg-icons';
import { Controller, useForm } from 'react-hook-form';

export const AreaScreen = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth);
    const areas = useSelector(state => state.area.areas);

    const [isFormOpen, setIsFormOpen] = useState(false)

    const { control, handleSubmit, reset} = useForm({
        defaultValues: {
            name: '',
            code: '',
        }
    });

    useMemo(() => {
        console.log("xd");
        dispatch(startLoadingAreas());
    }, [dispatch])

    const handleOpenArea = (name, uid) => {
        const area = {
            name,
            uid
        }
        dispatch(activeArea(area))
    }

    const handleShowForm = () => {
        console.log(isFormOpen);
        if (isFormOpen) {
            setIsFormOpen(false)
        } else {
            setIsFormOpen(true)
        }
    }

    const handleNewArea = (data) => {
        dispatch(createArea(data.name))
        setIsFormOpen(false);
        reset()
    }

    const handleJoinArea = () => {
        
    }

    const showAreas = () => {
        if (areas.length > 0) {
            return <List>
                        <ListItem 
                            button 
                            onClick={handleShowForm}
                        >
                            <ListItemText primary="Crear nueva área"/>
                            <ListItemSecondaryAction>
                                <IconButton edge="end">
                                    <FontAwesomeIcon icon={isFormOpen ? faChevronUp : faChevronDown} />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                        <Collapse in={isFormOpen} timeout="auto" unmountOnExit>
                            <List>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar variant="rounded" style={{backgroundColor: "#FF8747"}}>
                                            <FontAwesomeIcon icon={faFolderPlus} />
                                        </Avatar>
                                    </ListItemAvatar>
                                        <form onSubmit={handleSubmit(handleNewArea)} autoComplete="off">
                                            <ListItemText>
                                                    <Controller 
                                                        name="name"
                                                        control={control}
                                                        render={({ field }) => 
                                                        <TextField 
                                                            {...field}
                                                            size="small"
                                                            label="Nombre de area"
                                                            variant="outlined"
                                                            type="text"
                                                        />}
                                                    />
                                            </ListItemText>
                                            <ListItemSecondaryAction>
                                                <IconButton edge="end" color="primary" type="submit">
                                                    <FontAwesomeIcon icon={faPlus} />
                                                </IconButton>
                                            </ListItemSecondaryAction>
                                        </form>
                                </ListItem>
                            </List>
                        </Collapse>
                        {areas.map((area) => {
                            return (
                            [
                                <ListItem
                                    disabled={isFormOpen} 
                                    key={area.uid} 
                                    button 
                                    onClick={(e) => handleOpenArea(area.name, area.uid)}
                                >
                                    <ListItemAvatar>
                                        <Avatar variant="rounded" style={isFormOpen ? null : {backgroundColor: "#FF8747"}}>
                                            {/* <div className="itemImage">
                                                <ShowImage itemId={area.uid} />
                                            </div> */}
                                            <FontAwesomeIcon icon={faWarehouse}/>
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary={area.name} secondary="Secundario"  />
                                    <ListItemSecondaryAction>
                                        <IconButton edge="end" disabled={isFormOpen} color="primary">
                                            <FontAwesomeIcon icon={faSignInAlt} />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            ]
                        )})}
                    </List>
        } else {
            return <span className="noAreas">No hay areas</span>
        }
    }

    return (
        <div className="area-container">
            <div className="area-column">
                <div className="areaList-container">
                    <AppBar position="static" color="primary">
                        <Toolbar>
                            <span className="hint">Selección de área</span>
                            <ShowAvatar avatarClass="profileBorder" username={user.name} userId={user.uid} profile={true} />
                        </Toolbar>
                    </AppBar>
                    <div className="avatarContainer">
                    </div>
                    <div className="areas-show">
                        {showAreas()}
                    </div>
                    <div className="joinArea">
                        <form onSubmit={handleSubmit(handleJoinArea)} autoComplete="off">
                            <Controller 
                                name="code"
                                control={control}
                                render={({ field }) => 
                                <TextField 
                                    {...field} 
                                    label="Codigo de invitacion"
                                    type="text"
                                />}
                            />
                        </form>
                    </div>
                </div>
            </div>
            <ProfileModal />
        </div>
    )
}
