import { Button, FormControl, InputLabel, Select, TextField } from '@mui/material';
import React, { useState } from 'react'
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { startCreateItem, uploadItemImage } from '../../../redux/actions/inv';
import { closeModal } from '../../../redux/actions/ui';
import { Controller, useForm } from "react-hook-form";
import { useModalIsOpen } from '../../../hooks/useModalIsOpen';

Modal.setAppElement('#root');
export const CreateItemModal = ({spaceId, cols, rows}) => {
    const dispatch = useDispatch();
    const {categories} = useSelector(state => state.inv);
    const area = useSelector(state => state.area.active)
    
    const thisModalIsOpen = useModalIsOpen("CreateItemModal")

    const [selectedFile, setSelectedFile] = useState();

    const { control, reset, handleSubmit } = useForm({
        defaultValues: {
            name: '',
            description: '',
            category: '',
            row: '',
            column: '',
            expiryDate: '',
            quantity: ''
        }
    });

    const onSubmit = (data) => {
        dispatch(startCreateItem(data.name, data.description, data.category, data.row, data.column, data.expiryDate, data.quantity, spaceId, area.uid, selectedFile));
        dispatch(closeModal());
        reset();
    }
    
    const handleCloseModal = () => {
        reset();
        dispatch(closeModal());
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
                    {selectedFile !== undefined && <p className="w-52 overflow-hidden text-xs ml-2 whitespace-nowrap overflow-ellipsis">Archivo: {selectedFile.name}</p>}
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
                        rows={2}
                        maxRows={4}
                        label="Descripcion"
                        variant="outlined"
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
                            render={({field}) => 
                                <Select
                                    {...field} 
                                    notched
                                    native
                                    required
                                    label="category"
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
                                    required
                                    notched
                                    label="row"
                                    inputProps={{
                                        name: "row",
                                        id: "row-select"
                                    }}
                                >
                                    <option aria-label="None" value="" />
                                    {rows.map((row) => (
                                        <option key={row} value={row}>{row}</option>
                                    ))}
                                </Select>
                            }
                        />
                    </FormControl>
                    <FormControl
                        variant="outlined"
                    >
                        <InputLabel shrink htmlFor="column-select">Columna</InputLabel>
                        <Controller 
                            name="column"
                            control={control}
                            render={({field}) => 
                                <Select
                                    {...field} 
                                    native
                                    notched
                                    required
                                    label="column"
                                    inputProps={{
                                        name: "column",
                                        id: "column-select"
                                    }}
                                >
                                    <option aria-label="None" value="" />
                                    {cols.map((row) => (
                                        <option key={row} value={row}>{row}</option>
                                    ))}
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
                            placeholder="Ilimitado"
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
                        Crear
                    </Button>
                    <Button
                        style={{width:"180px"}}
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
