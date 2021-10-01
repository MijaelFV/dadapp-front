import { MobileStepper, ListItemSecondaryAction, Checkbox, Button, FormControl, LinearProgress, InputLabel, List, ListItemAvatar, ListItem, Select, TextField, ListItemText, FormControlLabel, Switch, Avatar } from '@mui/material';
import React, { useEffect, useState } from 'react'
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../../redux/actions/ui';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDolly, faHandPointer } from '@fortawesome/free-solid-svg-icons';
import { useModalIsOpen } from '../../../hooks/useModalIsOpen';
import { getInventoryByTaked, startRemoveItem } from '../../../redux/actions/inv';
import { ShowImage } from '../../../components/ShowImage';
import { showOptionsColRow } from '../../../helpers/showOptionsColRow';
import { startLoadingLogs } from '../../../redux/actions/log';
import { clearSearch, getSearch } from '../../../redux/actions/search';
import { ItemFeaturesCollapse } from '../../../components/ItemFeaturesCollapse';
import { SwalMixin } from '../../../components/SwalMixin';


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
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [activeStep, setActiveStep] = React.useState(0);
    
    const isLoading = useSelector(state => state.ui.isLoading)
    const space = spaces?.find(space => space.uid === selectedSpace)
    const res = useSelector(state => state.search.items);
    let selectedItems = res.filter(item => checked.includes(item.uid))

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

    const onSubmit = async (e) => {
        e.preventDefault();
        const finishSubmit = () => {
            handleCloseModal();
            setActiveStep(0);
            setTimeout(() => {
                dispatch(getInventoryByTaked(areaId))
                dispatch(startLoadingLogs(areaId, 1));
            }, 800)
        }
        const invalidConsume = selectedItems.some(e => e.quantity < e.consume || 1 > e.consume);
        if (invalidConsume) {
            console.log(invalidConsume);
            return SwalMixin.fire({
                icon: "warning",
                text: "Se ingreso un valor de consumo invalido",
                confirmButtonText: "Aceptar"
            })
        }
        selectedItems.forEach((item) => {
            if (item.quantity >= 0 && item.consume >= 1) {
                dispatch(startRemoveItem(item.uid, areaId, 2, item.consume))
                finishSubmit();
            } else if (item.quantity === null) {
                dispatch(startRemoveItem(item.uid, areaId, 1))
                finishSubmit();
            }
        })
    }

    const SetDefaultConsume = () => {
        selectedItems.forEach((item) => {
            if (item.quantity && !item.consume) {
                item.consume = 1
            }
        })
    }

    const handleSetConsume = (e, itemid, quantity) => {
        selectedItems.forEach((item) => {
            if (item.uid === itemid) {
                item.consume = e.target.value
            }
        })
    }
    
    const handleSpaceChange = (e) => {
        setChecked([]);
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
        if (e.target.value.length >= 1) {
            dispatch(getSearch("items", areaId, e.target.value))
        }
    }

    const handleTypeChange = () => {
        setChecked([]);
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
    
    const handleShowForm = (i) => {
        if (i !== isFormOpen) {
            setIsFormOpen(i)
        } else {
            setIsFormOpen(false)
        }
    }

    const handleCloseModal = () => {
        setSearchType(1);
        setActiveStep(0)
        setChecked([]);
        dispatch(clearSearch());
        dispatch(closeModal());
    }  

    const showItems = () => {
        if (items.length > 0) {
            return <List>
                        {items.map((item, index) => {
                            return [
                                <ListItem 
                                    key={item.uid} 
                                    button 
                                    disabled={item.quantity === 0}
                                    onClick={() => handleShowForm(index)} 
                                    style={isFormOpen === index ? {backgroundColor:"rgb(55 65 81)"} : {}}
                                >
                                    <ListItemAvatar>
                                        <Avatar variant="rounded">
                                            <ShowImage item={item} />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary={item.name} />
                                    <ListItemSecondaryAction>
                                        <Checkbox
                                            color="primary"
                                            edge="end"
                                            disabled={item.quantity === 0}
                                            onChange={() => handleCheckItem(item.uid)}
                                            checked={checked.indexOf(item.uid) !== -1}
                                        />
                                    </ListItemSecondaryAction>
                                </ListItem>,
                                <ItemFeaturesCollapse key={item.name} item={item} isFormOpen={isFormOpen} index={index} />
                            ]
                        })}
                    </List>
        } else {
            return <div className="mx-auto my-auto flex flex-col items-center text-gray-400">
                <FontAwesomeIcon icon={faDolly} size="4x" />
                <b className="mt-2 text-center">No hay articulos para mostrar</b>
                <p className="text-center w-2/3">Asegurate de que los datos sean correctos</p>
            </div>
        }
    }

    const showSelectedItems = () => {
        if (checked.length > 0) {
            return <List>
                        {selectedItems.map((item, index) => {
                            const showConsumeOption = () => {
                                if (item.quantity) {
                                    return <FormControl
                                                variant="outlined"
                                                size="small"
                                            >
                                                <TextField
                                                    sx={{
                                                        width:"70px",
                                                    }}
                                                    defaultValue={item.consume ? item.consume : 1}
                                                    onChange={e => handleSetConsume(e, item.uid, item.quantity)}
                                                    size="small"
                                                    variant="outlined"
                                                    type="number"
                                                />
                                            </FormControl>
                                }
                            }

                            return [
                                <ListItem 
                                    button
                                    key={item.uid}
                                    style={isFormOpen === index ? {backgroundColor:"rgb(55 65 81)"} : {}}
                                >
                                    <ListItemAvatar>
                                        <Avatar variant="rounded">
                                            <ShowImage item={item} />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <p 
                                        onClick={() => handleShowForm(index)}
                                        className="w-2/4 overflow-ellipsis mr-auto whitespace-nowrap overflow-hidden"
                                    >
                                        {item.name}
                                    </p>
                                    {showConsumeOption()}
                                    <ListItemSecondaryAction>
                                        <Checkbox
                                            color="primary"
                                            edge="end"
                                            onChange={(e) => handleCheckItem(item.uid)}
                                            checked={checked.indexOf(item.uid) !== -1}
                                        />
                                    </ListItemSecondaryAction>
                                </ListItem>,
                                <ItemFeaturesCollapse key={item.name} item={item} isFormOpen={isFormOpen} index={index} />
                            ]
                        })}
                    </List>
        } else {
            return <div className="mx-auto my-auto flex flex-col items-center text-gray-400">
                <FontAwesomeIcon icon={faHandPointer} size="4x" />
                <b className="mt-2 text-center">No hay articulos seleccionados</b>
                <p className="text-center w-2/3">Aqui apareceran los articulos que estes por retirar</p>
            </div>
        }
    }

    const handleNext = () => {
        SetDefaultConsume();
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    return (
        <Modal
            isOpen={thisModalIsOpen}
            onRequestClose={handleCloseModal}
            closeTimeoutMS={200}
            className="modal"
            overlayClassName="modal-background"
        >
            <form className="flex flex-col w-full h-full" onSubmit={onSubmit}>
                    <FormControlLabel
                        style={{marginTop:"-5px", marginBottom:"5px"}}
                        control={
                        <Switch
                            onChange={handleTypeChange}
                            name="searchType"
                            color="primary"
                        />
                        }
                        label={searchType === 1 ? "Buscar por posición" : "Buscar por nombre"}
                    />
                    {
                        searchType ===  1 ? (
                        <TextField
                            onChange={handleQueryChange}
                            label="Buscar articulo"
                            placeholder="Ej: 'Destornillador'"
                            variant="outlined"
                            type="text"
                            size="small"
                        />
                
                        ) : (
                        <div className="grid grid-cols-3 gap-2">
                            <FormControl
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
                <div className="mt-3 bg-gray-500 bg-opacity-20 rounded overflow-x-hidden">
                    {
                        isLoading
                        ? <LinearProgress />
                        : null
                    }
                    <div 
                        className={activeStep === 0 ? "flex flex-col overflow-y-auto" : 'hidden'}
                        style={activeStep === 0 ? {height:"40vh", width:"95vw", maxWidth: "450px"} : {}}
                    >
                            {showItems()}
                    </div>
                    <div
                        className={activeStep === 1 ? "flex flex-col overflow-auto" : 'hidden'}
                        style={activeStep === 1 ? {height:"40vh", width:"95vw", maxWidth: "450px"} : {}}
                    >
                            {showSelectedItems()}
                    </div>
                    <MobileStepper 
                        variant="dots"
                        steps={2}
                        position="static"
                        activeStep={activeStep}
                        sx={{ backgroundColor: "#232a39" }}
                        nextButton={
                            <Button size="small" onClick={handleNext} disabled={activeStep === 1}>
                                SIGUIENTE
                            </Button>
                        }
                        backButton={
                            <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                                ATRAS
                            </Button>
                        }
                    />
                </div>
                <div className="mt-1">
                    <Button
                        disabled={checked.length === 0}
                        style={activeStep === 1 ? {} : {display: "none"}}
                        fullWidth
                        variant="contained"
                        color="primary"
                        type="submit"
                    >
                        Retirar
                    </Button>
                    <Button
                        style={activeStep !== 1 ? {} : {display: "none"}}
                        fullWidth
                        onClick={handleCloseModal}
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
