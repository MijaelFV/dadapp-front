import { Button, FormControl, InputLabel, Select, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../../redux/actions/ui';
import { Controller, useForm } from "react-hook-form";
import { useHistory, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { useModalIsOpen } from '../../../hooks/useModalIsOpen';
import { startDeleteItem, startModifyItem } from '../../../redux/actions/inv';
import { showOptionsColRow } from '../../../helpers/showOptionsColRow';
import moment from 'moment';
import { getCategoriesBySpace } from '../../../redux/actions/category';
import { SwalMixin } from '../../../components/SwalMixin';


Modal.setAppElement('#root');
export const ModifyItemModal = ({item, areaid}) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const categories = useSelector(state => state.inv.categories);
    
    const {spaceId} = useParams();
    useEffect(() => {
        if (categories.length === 0) {
            dispatch(getCategoriesBySpace(spaceId));
        }
    }, [categories, spaceId, dispatch])

    const spaces = useSelector(state => state.space.spaces);
    const space = spaces.find(space => space.uid === spaceId)

    const thisModalIsOpen = useModalIsOpen("ModifyItemModal")

    const [selectedFile, setSelectedFile] = useState();

    const { control, handleSubmit, reset} = useForm({
        defaultValues: {
            name: item.name,
            description: item.description,
            category: item.category?._id,
            row: item.row,
            column: item.column,
            expiryDate: item.expiryDate ? moment.utc(item.expiryDate).format("YYYY-MM-DD") : '',
            quantity: item.quantity
        }
    });

    useEffect(() => {
        const expiryDate = item.expiryDate ? moment.utc(item.expiryDate).format("YYYY-MM-DD") : '';
        reset({name: item.name, description: item.description, category: item.category?._id, row: item.row, column: item.column, expiryDate: expiryDate, quantity: item.quantity});
    }, [item, reset])

    const onSubmit = (data) => {
        dispatch(startModifyItem(item.uid, data.name, data.description, data.category, data.row, data.column, data.expiryDate, data.quantity, space.uid, areaid, selectedFile));
        dispatch(closeModal());
        setSelectedFile()
    }

    const handleRemoveItem = () => {
        SwalMixin.fire({
            text: "¿Estas seguro de eliminar el articulo?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: "Eliminar",
        }).then((result) => {
            if (result.isConfirmed) {
                history.replace(`/space/${spaceId}`);
                dispatch(startDeleteItem(item.uid, areaid));
                dispatch(closeModal());
                reset();
            }
        })
    }
    
    const handleCloseModal = () => {
        dispatch(closeModal());
        setSelectedFile()
        reset();
    }  

    const handleUploadFile = (e) => {
        setSelectedFile(e.target.files[0]);
    }

    return (
        <Modal
            isOpen={thisModalIsOpen}
            onRequestClose={handleCloseModal}
            closeTimeoutMS={200}
            className="modal"
            overlayClassName="modal-background"
        >
            <form onSubmit={handleSubmit(onSubmit)} autoComplete="off" className="flex flex-col w-full h-full">
                <div className="flex mb-5 items-center">
                    <Button
                        size="small"
                        component="label"
                        variant="contained"
                        color="primary"
                    >
                        Subir Imagen
                        <input
                            type="file"
                            onChange={handleUploadFile}
                            hidden
                        />
                    </Button>
                    {selectedFile !== undefined && <FontAwesomeIcon icon={faCheckSquare} size="1x" className="ml-1" />}
                </div>
                <Controller 
                    name="name"
                    control={control}
                    render={({ field }) => 
                    <TextField 
                        {...field} 
                        required
                        InputLabelProps={{ required: false, shrink: true}}
                        label="Nombre de objeto"
                        variant="outlined"
                        type="text"
                    />}
                />
                <div className="h-2"/>
                <Controller 
                    name="description"
                    control={control}
                    render={({ field }) => 
                    <TextField 
                        {...field} 
                        multiline
                        InputLabelProps={{ shrink: true }}
                        maxRows={3}
                        label="Descripcion"
                        variant="outlined"
                        className="form-textField"
                    />}
                />
                <div className="h-2"/>
                <div className="grid grid-cols-3 gap-2">
                    <FormControl
                        variant="outlined"
                    >
                        <InputLabel shrink htmlFor="category-select">Categoria</InputLabel>
                        <Controller 
                            name="category"
                            control={control}
                            defaultValue=""
                            render={({field}) => 
                                <Select
                                    {...field} 
                                    native
                                    notched
                                    label="category"
                                    required
                                    inputProps={{
                                        name: "category",
                                        id: "category-select"
                                    }}
                                >
                                    <option aria-label="None" value="" />
                                    {categories.map((category) => (
                                        <option key={category.uid} value={category.uid}>{category.name}</option>
                                    ))}
                                </Select>
                            }
                        />
                    </FormControl>
                    <FormControl
                        variant="outlined"
                    >
                        <InputLabel shrink htmlFor="row-select">Fila</InputLabel>
                        <Controller 
                            name="row"
                            control={control}
                            render={({field}) => 
                                <Select
                                    {...field} 
                                    native
                                    notched
                                    required
                                    label="row"
                                    inputProps={{
                                        name: "row",
                                        id: "row-select"
                                    }}
                                >
                                    {showOptionsColRow(space.rows)}
                                </Select>
                            }
                        />
                    </FormControl>
                    <FormControl
                        variant="outlined"
                    >
                        <InputLabel htmlFor="column-select">Columna</InputLabel>
                        <Controller 
                            name="column"
                            control={control}
                            render={({field}) => 
                                <Select
                                    {...field} 
                                    native
                                    required
                                    label="column"
                                    inputProps={{
                                        name: "column",
                                        id: "column-select"
                                    }}
                                >
                                    {showOptionsColRow(space.columns)}
                                </Select>
                            }
                        />
                    </FormControl>
                </div>
                <div className="h-2"/>
                <div className="grid grid-cols-2 gap-2">
                    <Controller 
                        name="expiryDate"
                        control={control}
                        render={({ field }) => 
                        <TextField 
                            {...field} 
                            label="Vencimiento"
                            variant="outlined"
                            type="date"
                            InputLabelProps={{ shrink: true }}
                        />}
                    />
                    <Controller 
                        name="quantity"
                        control={control}
                        render={({ field }) => 
                        <TextField 
                            {...field} 
                            label="Cantidad"
                            placeholder="No consumible"
                            InputLabelProps={{ shrink: true }}
                            variant="outlined"
                            type="number"
                        />}
                    />
                </div>
                <div className="mt-4 flex">
                    <Button
                        fullWidth
                        style={{marginRight:"4px"}}
                        variant="contained"
                        color="primary"
                        type="submit"
                    >
                        Modificar
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleRemoveItem}
                    >
                        <FontAwesomeIcon icon={faTrashAlt}/>
                    </Button>
                </div>
            </form>
        </Modal>
    )
}
