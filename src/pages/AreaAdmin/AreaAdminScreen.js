import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Button, IconButton, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, TextField } from '@material-ui/core'
import { faArrowLeft, faEllipsisV, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { ShowAvatar } from '../../components/ShowAvatar'
import { getUserById } from '../../redux/actions/user'
import { deleteArea, modifyArea, renewAreaInviteCode } from '../../redux/actions/area'
import { useForm, Controller } from 'react-hook-form'

export const AreaAdminScreen = () => {
    const history = useHistory() 
    const dispatch = useDispatch();

    const area = useSelector(state => state.area.active);

    const [codeCopied, setCodeCopied] = useState(false)
    const [changingAreaName, setChangingAreaName] = useState(false)

    const { control, handleSubmit, reset} = useForm({
        defaultValues: {
            name: area.name,
        }
    });

    const handleReturnClick = () => {
        history.goBack();
    }

    const handleUserClick = async(userId) => {
        if (userId) {
            await dispatch(getUserById(userId))
            history.push(`/user/${userId}`)
        }
    }

    const handleChangeAreaName = (data) => {
        if (data.name.length >= 4) {
            dispatch(modifyArea(area.uid, data.name))
        }
        setChangingAreaName(false)
    }

    const handleShowChangeName = () => {
        if (changingAreaName) {
            setChangingAreaName(false)
        } else {
            setChangingAreaName(true)
        }
    }

    const handleChangeInviteCode = () => {
        dispatch(renewAreaInviteCode(area.uid))
    }

    const handleCopyToClipboard = () => {
        navigator.clipboard.writeText(area.inviteCode)
        setCodeCopied(true);
        setTimeout(() => {
            setCodeCopied(false)
        }, 2000)
    }
    
    const handleDeleteArea = () => {
        // dispatch(deleteArea(area.uid))
        console.log('borrando area');
    }

    const showUsers = (result) => (
        <ListItem key={result._id} button onClick={() => handleUserClick(result._id)}>
            <ListItemAvatar>
                <div className="w-10 h-10">
                    <ShowAvatar userId={result._id} username={result.name} />
                </div>
            </ListItemAvatar>
            <ListItemText primary={result.name} secondary={result.email}  />
            <ListItemSecondaryAction>
                <IconButton edge="end" color="primary">
                    <FontAwesomeIcon icon={faEllipsisV} />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    )

    return (
        <div 
            className="text-white bg-gray-900 flex flex-col w-full h-auto min-h-full pb-20" 
            style={{maxWidth:"500px", marginInline:"auto"}}
        >
            <div className="w-full flex items-center p-3">
                <IconButton
                    color="primary"
                    onClick={handleReturnClick}
                >
                    <FontAwesomeIcon 
                        icon={faArrowLeft} 
                    />
                </IconButton>
                <p className="ml-1 text-xl mr-auto">
                    Administración de área
                </p>
                <IconButton
                    color="primary"
                    onClick={handleDeleteArea}
                >
                    <FontAwesomeIcon 
                        icon={faTrashAlt} 
                    />
                </IconButton>
            </div>
            <div className="flex flex-col px-3 mb-6">
                <h1 className="text-gray-300">
                    Nombre de área 
                </h1>
                <div className="flex">
                    {
                        changingAreaName
                        ?   (<form onSubmit={handleSubmit(handleChangeAreaName)} autoComplete="off" className="flex items-center">
                                <Controller 
                                    name="name"
                                    control={control}
                                    render={({ field }) => 
                                    <TextField 
                                        {...field}
                                        autoFocus={true}
                                        size="small"
                                        variant="standard"
                                        type="text"
                                    />}
                                />
                                <div className="mx-1"/>
                                <Button size="small" color="primary" type="submit" variant="contained">
                                    Guardar
                                </Button>
                                <div className="mx-0.5"/>
                                <Button size="small" color="primary" onClick={handleShowChangeName}>
                                    Cancelar
                                </Button>
                            </form>)
                        :   ([<h1 className="text-lg mx-2">
                                {area.name}
                            </h1>,
                            <p 
                                className="text-indigo-200 text-sm flex items-center cursor-pointer no-tap-highlight"
                                onClick={handleShowChangeName}
                            >Editar</p>])
                    }
                </div>
                <div className="my-1.5" />
                <h1 className=" text-gray-300">
                    Codigo de invitación
                </h1>
                <div className="flex">
                    <h1 
                        className="text-lg bg-gray-500 rounded bg-opacity-20 w-min mx-2 px-2 cursor-pointer no-tap-highlight whitespace-nowrap"
                        onClick={handleCopyToClipboard}
                    >
                        {
                            codeCopied
                            ? "Codigo copiado"
                            : area.inviteCode
                            
                        }
                    </h1>
                    <p 
                        className="text-indigo-200 text-sm flex items-center cursor-pointer no-tap-highlight"
                        onClick={handleChangeInviteCode}
                    >Cambiar</p>
                </div>
            </div>
            <div className="h-0.5 mx-3 rounded-full bg-gray-800"/>
            <div className="rounded mt-4 mx-3 bg-gray-500 bg-opacity-20 px-2">
                <div className="flex px-1 mt-1 items-end justify-between">
                    <h1 className="text-lg font-medium">
                        Administradores
                    </h1>
                    <h1 className="text-gray-300">
                        {area.admins?.length !== 0 ? area.admins?.length : (<b className="text-gray-400">No hay </b>)}
                    </h1>
                </div>
                <List className="mb-5">
                    {area.admins?.map((admins) => (
                        showUsers(admins)
                    ))}
                </List>
            </div>
            <div className="rounded mt-4 mx-3 bg-gray-500 bg-opacity-20 px-2">
                <div className="flex px-1 mt-1 items-end justify-between">
                    <h1 className="text-lg font-medium">
                        Usuarios
                    </h1>
                    <h1 className="text-gray-300">
                        {area.users?.length !== 0 ? area.users?.length : (<b className="text-gray-400">No hay usuarios</b>)}
                    </h1>
                </div>
                <List className="mb-5">
                    {area.users?.map((users) => (
                        showUsers(users)
                    ))}
                </List>
            </div>
        </div>
    )
}
