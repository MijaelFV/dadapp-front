import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Button, IconButton, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Menu, MenuItem, TextField } from '@mui/material'
import { faArrowLeft, faEllipsisV, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { ShowAvatar } from '../../components/ShowAvatar'
import { getUserById } from '../../redux/actions/user'
import { changeUserRole, deleteArea, deleteAreaUser, modifyArea, renewAreaInviteCode } from '../../redux/actions/area'
import { useForm, Controller } from 'react-hook-form'
import { SwalMixin } from '../../components/SwalMixin'

export const AreaAdminScreen = () => {
    const history = useHistory() 
    const dispatch = useDispatch();

    const area = useSelector(state => state.area.active);
    const userid = useSelector(state => state.auth.uid);

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
        reset()
    }

    const handleChangeUserRole = (userid) => {
        handleClose()
        dispatch(changeUserRole(area.uid, userid))
    }

    const handleDeleteAreUser = (userid) => {
        handleClose()
        dispatch(deleteAreaUser(area.uid, userid))
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
        SwalMixin.fire({
            toast: false,
            titleText: "¿Estás seguro de eliminar el área?", 
            text: `Escribe el nombre para confirmar la eliminación. ${area.name}`,
            input: 'text',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: "Eliminar",
        }).then((result) => {
            if (result.isConfirmed) {
                if (result.value === area.name) {
                    dispatch(deleteArea(area.uid))
                } else {
                    SwalMixin.fire({
                        icon: "info",
                        text: "Se ingreso un nombre incorrecto.",
                        confirmButtonText: "Aceptar",
                    })
                }
            }
        })
    }

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const showUsers = (result) => ([
        <ListItem key={result._id} button onClick={() => handleUserClick(result._id)}>
            <ListItemAvatar>
                <div className="w-10 h-10">
                    <ShowAvatar userId={result._id} username={result.name} />
                </div>
            </ListItemAvatar>
            <ListItemText primary={result.name} secondary={result.email}  />
            <ListItemSecondaryAction>
                <IconButton 
                    disabled={result._id === userid}
                    edge="end" 
                    color="primary"
                    onClick={handleClick}
                >
                    <FontAwesomeIcon icon={faEllipsisV} />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>,
        <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
        >
            <MenuItem onClick={() => handleChangeUserRole(result._id)}>Cambiar Rol</MenuItem>
            <MenuItem onClick={() => handleDeleteAreUser(result._id)}>Eliminar</MenuItem>
        </Menu>
    ])

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
                    Admin. de área
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
                                        required
                                        InputLabelProps={{ required: false}}
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
