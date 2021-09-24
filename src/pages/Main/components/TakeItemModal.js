import { ListItemSecondaryAction, Checkbox, Button, FormControl, InputLabel, List, ListItemAvatar, ListItem, Select, TextField, ListItemText, FormControlLabel, Switch, Avatar, Tabs, Tab } from '@material-ui/core';
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
        await selectedItems.forEach((item) => {
            if (item.quantity) {
                if (item.consume >= 1 && item.consume <= item.quantity) {
                    return dispatch(startRemoveItem(item.uid, areaId, 3, item.consume))
                }
            } else {
                return dispatch(startRemoveItem(item.uid, areaId, 2))
            }
        })
        handleCloseModal();
        setTimeout(() => {
            dispatch(getInventoryByTaked(areaId))
            dispatch(startLoadingLogs(areaId, 1));
        }, 800)
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
        if (e.target.value.length > 2) {
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
    
    const handleCloseModal = () => {
        setSearchType(1);
        setChecked([]);
        setTabValue(0)
        dispatch(clearSearch());
        dispatch(closeModal());
    }  

    const showItems = () => {
        if (items.length > 0) {
            return <List>
                        {items.map((item) => {
                            const qty = item.quantity ? `| Cant: ${item.quantity}` : ''
                            const spaceName = searchType === 1 ? `${item.space.name} |` : ''

                            return [
                                <ListItem key={item.uid} button onClick={(e) => handleCheckItem(item.uid)}>
                                    <ListItemAvatar>
                                        <Avatar variant="rounded">
                                            <ShowImage itemId={item.uid} />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary={item.name} secondary={`${spaceName} F: ${item.row} C: ${item.column} ${qty}`}  />
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
                        })}
                    </List>
        } else {
            return <div className="mx-auto my-auto flex flex-col items-center text-gray-400">
                <FontAwesomeIcon icon={faDolly} size="4x" />
                <b className="mt-2">No hay articulos para mostrar</b>
                <p className="text-center w-2/3">Si colocaste datos asegurate de que sean correctos</p>
            </div>
        }
    }

    const showSelectedItems = () => {
        if (checked.length > 0) {
            return <List>
                        {selectedItems.map((item) => {
                            const qty = item.quantity ? `| Cant: ${item.quantity}` : ''
                            const spaceName = searchType === 1 ? `${item.space.name} |` : ''

                            const showConsumeOption = () => {
                                if (item.quantity) {
                                    return <Select
                                                native
                                                placeholder="Cant"
                                                variant="outlined"
                                                onChange={e => handleSetConsume(e, item.uid, item.quantity)}
                                            >
                                                {showOptionsColRow(item.quantity, false)}
                                            </Select>
                                            // <TextField 
                                            //     onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                                            //     onChange={e => handleSetConsume(e, item.uid, item.quantity)}
                                            //     style={{width:"80px"}}
                                            //     placeholder="Cant"
                                            //     InputLabelProps={{ shrink: true }}
                                            //     variant="outlined"
                                            //     type="number"
                                            // />
                                        
                                }
                            }

                            return [
                                <ListItem key={item.uid}>
                                    <ListItemAvatar>
                                        <Avatar variant="rounded">
                                            <ShowImage itemId={item.uid} />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary={item.name} secondary={`${spaceName} F: ${item.row} C: ${item.column} ${qty}`}  />
                                    {showConsumeOption()}
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
                        })}
                    </List>
        } else {
            return <div className="mx-auto my-auto flex flex-col items-center text-gray-400">
                <FontAwesomeIcon icon={faHandPointer} size="4x" />
                <b className="mt-2">No hay articulos seleccionados</b>
                <p className="text-center w-2/3">Aqui apareceran los articulos que estes por retirar</p>
            </div>
        }
    }

    const TabPanel = ({children, value, index, ...other}) => {      
        return (
          <div
            className={value === index ? "flex flex-col h-full" : ''}
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
          >
            {value === index && (
                [children]
            )}
          </div>
        );
    }

    const a11yProps = (index) => {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }
    const [tabValue, setTabValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setTabValue(newValue);
    };

    return (
        <Modal
            isOpen={thisModalIsOpen}
            onRequestClose={handleCloseModal}
            closeTimeoutMS={200}
            className="modal"
            overlayClassName="modal-background"
        >
            <form style={{width:"370px"}} className="flex flex-col" onSubmit={onSubmit}>
                    <FormControlLabel
                        style={{marginTop:"-5px", marginBottom:"5px"}}
                        control={
                        <Switch
                            onChange={handleTypeChange}
                            name="searchType"
                            color="primary"
                        />
                        }
                        label={searchType === 1 ? "Buscar por espacio" : "Buscar por nombre"}
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
                        <div className="flex justify-between">
                            <FormControl
                                style={{width:"115px"}}
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
                                style={{width:"115px"}}
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
                                style={{width:"115px"}}
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
                <div className="mt-3 bg-gray-500 bg-opacity-20 rounded overflow-y-auto">
                    <Tabs value={tabValue} onChange={handleChange} variant="fullWidth">
                        <Tab label="Busqueda" {...a11yProps(0)} />
                        <Tab label={`Seleccionados ${checked.length > 0 ? checked.length : ''}`} {...a11yProps(1)} />
                    </Tabs>
                    <div className="flex flex-col h-80">
                        <TabPanel value={tabValue} index={0}>
                            {showItems()}
                        </TabPanel>
                        <TabPanel value={tabValue} index={1}>
                            {showSelectedItems()}
                        </TabPanel>
                    </div>
                </div>
                <div className="mt-4">
                    <Button
                        disabled={checked.length === 0}
                        fullWidth
                        style={{marginBottom:"4px"}}
                        variant="contained"
                        color="primary"
                        type="submit"
                    >
                        Retirar
                    </Button>
                    <Button
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
