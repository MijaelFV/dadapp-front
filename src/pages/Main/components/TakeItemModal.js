import { ListItemSecondaryAction, Checkbox, Button, FormControl, Collapse, InputLabel, List, ListItemAvatar, ListItem, Select, TextField, ListItemText, ListSubheader, Divider } from '@material-ui/core';
import React, { useEffect, useMemo, useState } from 'react'
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../../redux/actions/ui';
import { Controller, useForm } from "react-hook-form";
import { NumToArray } from '../../../helpers/numToArray';
import { useHistory, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { useModalIsOpen } from '../../../hooks/useModalIsOpen';
import { getInventoryBySpace, getInventoryByTaked, loadInventory, startModifyItem, startRemoveItem, unloadInventory, uploadItemImage } from '../../../redux/actions/inv';
import { clearSpace, startLoadingSpaces } from '../../../redux/actions/space';
import { ShowImage } from '../../../components/ShowImage';
import { startClearArea } from '../../../redux/actions/area';
import { showOptionsColRow } from '../../../helpers/showOptionsColRow';
import { startLoadingLogs } from '../../../redux/actions/log';
import { clearSearch, getSearch } from '../../../redux/actions/search';


Modal.setAppElement('#root');
export const TakeItemModal = ({areaId, spaces}) => {
    const dispatch = useDispatch();

    const thisModalIsOpen = useModalIsOpen("TakeItemModal")
    const [searchType, setSearchType] = useState(1);
    const [checked, setChecked] = useState([]);
    const [selectedSpace, setSelectedSpace] = useState('');
    const [selectedRow, setSelectedRow] = useState('');
    const [selectedCol, setSelectedCol] = useState('');
    const [items, setItems] = useState([]);
    
    const space = spaces?.find(space => space.uid === selectedSpace)
    const res = useSelector(state => state.search.items);

    useEffect(() => {
        if (Number(selectedRow) >= 1 && selectedCol === '') {
            setItems(res.filter(item => item.row === Number(selectedRow)))
        } else if (selectedRow === '' && Number(selectedCol) >= 1) {
            setItems(res.filter(item => item.column === Number(selectedCol)))
        } else if (Number(selectedRow) >= 1 && Number(selectedCol) >= 1) {
            setItems(res.filter(item => item.row === Number(selectedRow) && item.column === Number(selectedCol)))
        } else {
            setItems(res)
        }
    }, [selectedRow, selectedCol, res])

    useEffect(() => {
        if (searchType === 1) {
            setItems([])
            setSelectedRow('')
            setSelectedCol('')
            setSelectedSpace('')
        }
    }, [dispatch, searchType])

    const onSubmit = (e) => {
        e.preventDefault()
        setChecked([]);
        setSearchType(1);
        dispatch(clearSearch());
        dispatch(closeModal());
        checked.forEach((id) => (
            dispatch(startRemoveItem(id, areaId, 2))
        ))
        setTimeout(() => {
            dispatch(getInventoryByTaked(areaId))
            dispatch(startLoadingLogs(areaId));
        }, 800)
    }
    
    const handleSpaceChange = (e) => {
        setSelectedSpace(e.target.value)
        if (e.target.value) {
            dispatch(getSearch("items", areaId, '', e.target.value))
        }
    }

    const handlePositionChange = (e, type) => {
        if (type === "row") {
            setSelectedRow(e.target.value)
        } else if (type === "col") {
            setSelectedCol(e.target.value)
        }
    }

    const handleQueryChange = (e) => {
        if (e.target.value.length > 2) {
            dispatch(getSearch("items", areaId, e.target.value))
        }
    }

    const handleTypeChange = () => {
        dispatch(clearSearch());        
        if (searchType === 1) {
            setSearchType(2);
        } else {
            setSearchType(1);
        }
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

    const showItemSpaceName = (space) => {
        if (searchType === 1) {
            return `${space.name} |`
        } else {
            return ``;
        }
    };
    
    const handleCloseModal = () => {
        setSearchType(1);
        setChecked([]);
        dispatch(clearSearch());
        dispatch(closeModal());
    }  

    const showItems = () => {
        if (items.length > 0) {
            return <List>
                        {items.map((item) => (
                            [
                                <ListItem key={item.uid} button onClick={(e) => handleCheckItem(item.uid)}>
                                    <div className="itemImage">
                                        <ShowImage itemId={item.uid} />
                                    </div>
                                    <ListItemText primary={item.name} secondary={`${showItemSpaceName(item.space)} F: ${item.row} C: ${item.column}`}  />
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
                        ))}
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
            <form className="takeItemModal-container" onSubmit={onSubmit}>
                <div className="search-options">
                    <Button
                        size="small"
                        fullWidth
                        style={{marginRight:"2px"}}
                        variant="contained"
                        color="secondary"
                        onClick={handleTypeChange}
                    >
                        {searchType === 1 ? "Buscar por Espacio" : "Buscar por Nombre"}
                    </Button>
                </div>
                    {
                        searchType ===  1 ? (
                        <TextField
                            onChange={handleQueryChange}
                            label="Buscar articulo"
                            placeholder="Ej: 'Destornillador'"
                            variant="outlined"
                            type="text"
                            className="form-textField"
                            size="small"
                        />
                
                        ) : (
                        <div className="form-selects">
                            <FormControl
                                className="select" 
                                variant="outlined"
                                size="small"
                            >
                                <InputLabel htmlFor="space-select">Espacio</InputLabel>
                                <Select
                                    onChange={(e) => handleSpaceChange(e)}
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
                            </FormControl>
                            <FormControl
                                className="select" 
                                variant="outlined"
                                size="small"
                            >
                                <InputLabel htmlFor="row-select">Fila</InputLabel>
                                <Select
                                    disabled={selectedSpace === ''}
                                    onChange={(e) => handlePositionChange(e, "row")}
                                    native
                                    label="row"
                                    inputProps={{
                                        name: "row",
                                        id: "row-select"
                                    }}
                                >
                                    {showOptionsColRow(space?.rows)}
                                </Select>
                            </FormControl>
                            <FormControl
                                className="select" 
                                variant="outlined"
                                size="small"
                            >
                                <InputLabel htmlFor="column-select">Columna</InputLabel>
                                <Select
                                    disabled={selectedSpace === ''}
                                    onChange={(e) => handlePositionChange(e, "col")}
                                    native
                                    label="column"
                                    inputProps={{
                                        name: "column",
                                        id: "column-select"
                                    }}
                                >
                                    {showOptionsColRow(space?.columns)}
                                </Select>
                            </FormControl>
                        </div>
                    )
                }
                <div className="items-show">
                    {showItems()}
                </div>
                <div className="form-button">
                    <Button
                        fullWidth
                        style={{marginRight:"2px"}}
                        variant="contained"
                        color="primary"
                        type="submit"
                    >
                        Retirar
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
