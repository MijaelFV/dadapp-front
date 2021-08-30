import { ListItemSecondaryAction, Checkbox, Button, FormControl, Collapse, InputLabel, List, ListItemAvatar, ListItem, Select, TextField, ListItemText, ListSubheader, Divider } from '@material-ui/core';
import React, { useEffect, useMemo, useState } from 'react'
import Modal from 'react-modal';
import moment from 'moment'
import 'moment/locale/es'
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../../redux/actions/ui';
import { Controller, useForm, useWatch } from "react-hook-form";
import { NumToArray } from '../../../helpers/numToArray';
import { useHistory, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { useModalIsOpen } from '../../../hooks/useModalIsOpen';
import { clearInventory, getInventoryByQuery, getInventoryBySpace, getInventoryByTaked, loadInventory, returnItem, startModifyItem, startRemoveItem, uploadItemImage } from '../../../redux/actions/inv';
import { clearSpace, startLoadingSpaces } from '../../../redux/actions/space';
import { ShowImage } from '../../../components/ShowImage';
import { startClearArea } from '../../../redux/actions/area';
import { showOptionsColRow } from '../../../helpers/showOptionsColRow';
import { startLoadingLogs } from '../../../redux/actions/log';


Modal.setAppElement('#root');
export const ReturnItemModal = ({areaId, spaces}) => {
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

    const items = useSelector(state => state.inv.items);
    const space = spaces?.find(space => space.uid === getValues("space"))

    useEffect(() => {
        if (thisModalIsOpen) {
            dispatch(getInventoryByTaked(areaId))
        }
    }, [dispatch,  thisModalIsOpen])

    const onSubmit = (data) => {
        checked.forEach((id) => (
            dispatch(returnItem(id, data.column, data.row, data.space, areaId))
        ))
        dispatch(clearInventory());
        dispatch(closeModal());
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
        reset();
        dispatch(clearInventory());
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
                                    <div className="itemImage">
                                        <ShowImage itemId={item.uid} />
                                    </div>
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
            return <span className="noItems">No hay articulos</span>
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
            <form className="returnItemModal-container" onSubmit={handleSubmit(onSubmit)}>
                <div className="form-selects">
                    <FormControl
                        className="select" 
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
                        className="select" 
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
                        className="select" 
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
                <div className="items-show">
                    {showItems()}
                </div>
                <div className="form-button">
                    <Button
                        disabled={checked.length === 0 || rowChanged === '' || colChanged === ''}
                        fullWidth
                        style={{marginRight:"2px"}}
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
                        color="primary"
                    >
                        Cancelar
                    </Button>
                </div>
            </form>
        </Modal>
    )
}
