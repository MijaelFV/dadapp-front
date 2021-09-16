import { ListItemSecondaryAction, Checkbox, Button, FormControl, InputLabel, List, ListItemAvatar, ListItem, Select, ListItemText, Avatar } from '@material-ui/core';
import React, { useState } from 'react'
import Modal from 'react-modal';
import moment from 'moment'
import 'moment/locale/es'
import { useDispatch } from 'react-redux';
import { closeModal } from '../../../redux/actions/ui';
import { Controller, useForm, useWatch } from "react-hook-form";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSmileBeam,  } from '@fortawesome/free-solid-svg-icons';
import { useModalIsOpen } from '../../../hooks/useModalIsOpen';
import { returnItem } from '../../../redux/actions/inv';
import { ShowImage } from '../../../components/ShowImage';
import { showOptionsColRow } from '../../../helpers/showOptionsColRow';
import { startLoadingLogs } from '../../../redux/actions/log';


Modal.setAppElement('#root');
export const ReturnItemModal = ({areaId, spaces, items}) => {
    const dispatch = useDispatch();

    const thisModalIsOpen = useModalIsOpen("ReturnItemModal")
    const [checked, setChecked] = useState([]);
    
    const { control, handleSubmit, reset, getValues} = useForm({
        defaultValues: {
            space: '',
            row: '',
            column: ''
        }
    })
    const isSpaceSelected = useWatch({control, name: 'space'})
    const rowChanged = useWatch({control, name: 'row'})
    const colChanged = useWatch({control, name: 'column'})

    const space = spaces?.find(space => space.uid === getValues("space"))
    

    const onSubmit = (data) => {
        checked.forEach((id) => (
            dispatch(returnItem(id, data.column, data.row, data.space, areaId))
        ))
        dispatch(closeModal());
        setChecked([]);
        setTimeout(() => {
            dispatch(startLoadingLogs(areaId));
        }, 1000)
        reset();
    }

    const handleCheckItem = (value) => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };
    
    const handleCloseModal = () => {
        setChecked([]);
        reset();
        dispatch(closeModal());
    }  

    const showItems = () => {
        if (items.length > 0) {
            return <List>
                        {items.map((item) => {
                            const time = moment(item.takedDate).locale("es").fromNow();
                            
                            return (
                            [
                                <ListItem key={item.uid} button onClick={(e) => handleCheckItem(item.uid)}>
                                    <ListItemAvatar>
                                        <Avatar variant="rounded">
                                            <ShowImage itemId={item.uid} />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary={item.name} secondary={`Retirado ${time}`}  />
                                    <ListItemSecondaryAction>
                                        <Checkbox
                                            color="primary"
                                            edge="end"
                                            onChange={(e) => handleCheckItem(item.uid)}
                                            checked={checked.indexOf(item.uid) !== -1}
                                        />
                                    </ListItemSecondaryAction>
                                </ListItem>
                            ]
                        )})}
                    </List>
        } else {
            return <div className="mx-auto my-auto flex flex-col items-center text-gray-400">
                <FontAwesomeIcon icon={faSmileBeam} size="4x" />
                <b className="mt-2">¡Estas libre de deuda!</b>
                <p className="text-center w-2/3">Aqui apareceran los articulos que hayas retirado</p>
            </div>
        }
    }

    return (
        <Modal
            isOpen={thisModalIsOpen}
            onRequestClose={handleCloseModal}
            closeTimeoutMS={200}
            className="modal"
            overlayClassName="modal-background"
        >
            <form style={{width:"370px"}} className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex justify-between">
                    <FormControl
                        style={{width:"115px"}}
                        variant="outlined"
                        size="small"
                    >
                        <InputLabel htmlFor="space-select">Espacio</InputLabel>
                        <Controller 
                            name="space"
                            control={control}
                            render={({field}) => 
                                <Select
                                    {...field} 
                                    disabled={checked.length === 0}
                                    native
                                    label="space"
                                    inputProps={{
                                        name: "space",
                                        id: "space-select"
                                    }}
                                >
                                    <option aria-label="None" value="" />
                                    {spaces.map((space) => (
                                        <option key={space.uid} value={space.uid}>{space.name}</option>
                                    ))}
                                </Select>
                            }
                        />
                    </FormControl>
                    <FormControl
                        style={{width:"115px"}}
                        variant="outlined"
                        size="small"
                    >
                        <InputLabel htmlFor="row-select">Fila</InputLabel>
                        <Controller 
                            name="row"
                            control={control}
                            render={({field}) => 
                                <Select
                                    {...field} 
                                    disabled={isSpaceSelected === ''}
                                    native
                                    label="row"
                                    inputProps={{
                                        name: "row",
                                        id: "row-select"
                                    }}
                                >
                                    {showOptionsColRow(space?.rows)}
                                </Select>
                            }
                        />
                    </FormControl>
                    <FormControl
                        style={{width:"115px"}}
                        variant="outlined"
                        size="small"
                    >
                        <InputLabel htmlFor="column-select">Columna</InputLabel>
                        <Controller 
                            name="column"
                            control={control}
                            render={({field}) => 
                                <Select
                                    {...field}
                                    disabled={isSpaceSelected === ''}
                                    native
                                    label="column"
                                    inputProps={{
                                        name: "column",
                                        id: "column-select"
                                    }}
                                >
                                    {showOptionsColRow(space?.columns)}
                                </Select>
                            }
                        />
                    </FormControl>
                </div>
                <div className="flex flex-col h-80 mt-3 bg-gray-500 bg-opacity-20 rounded overflow-y-auto">
                    {showItems()}
                </div>
                <div className="mt-4">
                    <Button
                        disabled={checked.length === 0 || rowChanged === '' || colChanged === ''}
                        fullWidth
                        style={{marginBottom:"4px"}}
                        variant="contained"
                        color="primary"
                        type="submit"
                    >
                        Devolver
                    </Button>
                    <Button
                        onClick={handleCloseModal}
                        fullWidth
                        variant="contained"
                        color="secondary"
                    >
                        Cancelar
                    </Button>
                </div>
            </form>
        </Modal>
    )
}
