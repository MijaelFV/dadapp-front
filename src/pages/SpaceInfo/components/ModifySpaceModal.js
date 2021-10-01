import { Button, FormControl, InputAdornment, InputLabel, Select, TextField } from '@mui/material';
import React from 'react'
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../../redux/actions/ui';
import { Controller, useForm } from "react-hook-form";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faTimesCircle, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { createCategory, deleteCategory } from '../../../redux/actions/category';
import { startDeleteSpace, startModifySpace } from '../../../redux/actions/space';
import { useHistory } from 'react-router-dom';
import { showOptionsColRow } from '../../../helpers/showOptionsColRow';
import { useModalIsOpen } from '../../../hooks/useModalIsOpen';
import { SwalMixin } from '../../../components/SwalMixin';

Modal.setAppElement('#root');
export const ModifySpaceModal = ({space}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const {categories} = useSelector(state => state.inv);
    
    const thisModalIsOpen = useModalIsOpen("ModifySpaceModal")
    
    const { control, handleSubmit, reset, getValues} = useForm({
        defaultValues: {
            name: space.name,
            rows: space.rows,
            columns: space.columns,
            newCategory: ''
        }
    });

    const handleCloseModal = () => {
        dispatch(closeModal());
        reset();
    }  

    const onSubmit = (data) => {
        dispatch(startModifySpace(space.uid, data.name, data.rows, data.columns));
        dispatch(closeModal());
        reset({name: data.name, rows: data.rows, columns: data.columns});
    }

    const handleDeleteSpace = () => {
        SwalMixin.fire({
            toast: false,
            titleText: "¿Estás seguro de eliminar el espacio?", 
            text: `Escribe el nombre para confirmar la eliminación. ${space.name}`,
            input: "text",
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: "Cancelar",
            confirmButtonText: "Eliminar",
        }).then((result) => {
            if (result.isConfirmed) {
                if (result.value === space.name) {
                    history.replace('/spaces');
                    dispatch(startDeleteSpace(space.uid));
                    dispatch(closeModal());
                    reset();
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
    
    const handleAddCategory = () => {
        const newCategory = getValues('newCategory')
        dispatch(createCategory(space.uid, newCategory))
    }

    const handleDeleteCategory = (categoryUid) => {
        dispatch(deleteCategory(space.uid, categoryUid))
    }

    const showCategories = () => {
        if (categories.length > 0) {
            return categories.map((category) => (
                <span 
                    className="flex justify-between items-center mx-1 my-0.5 rounded-sm px-1"
                    key={category.uid}
                >
                    {category.name}
                    <FontAwesomeIcon 
                        icon={faTimesCircle} 
                        className="cursor-pointer no-tap-highlight"
                        onClick={() => {
                            handleDeleteCategory(category.uid)
                        }}
                    />
                </span>
            ))
        } else {
            return <div className="mx-auto my-auto text-sm text-center w-4/5 text-gray-400">
                <b>No hay categorias para mostrar</b>
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
            <form onSubmit={handleSubmit(onSubmit)} autoComplete="off" className="flex flex-col w-full h-full">
                <Controller 
                    name="name"
                    control={control}
                    render={({ field }) => 
                    <TextField
                        {...field}
                        required
                        InputLabelProps={{ required: false, shrink: true}}
                        type="text"
                        variant="outlined"
                        label="Nombre del espacio"
                    />}
                />
                <div className="h-2"/>
                <div className="grid grid-flow-col gap-2">
                    <FormControl
                        variant="outlined"
                    >
                        <InputLabel shrink htmlFor="rows-select">Filas</InputLabel>
                        <Controller 
                            name="rows"
                            control={control}
                            render={({ field }) => 
                            <Select
                                {...field} 
                                native
                                notched
                                required
                                label="rows"
                                inputProps={{
                                    name: "rows",
                                    id: "rows-select"
                                }}
                            >
                                {showOptionsColRow(10)}
                            </Select>}
                        />
                    </FormControl>
                    <FormControl
                        variant="outlined"
                    >
                        <InputLabel shrink htmlFor="columns-select">Columnas</InputLabel>
                        <Controller 
                            name="columns"
                            control={control}
                            render={({ field }) => 
                            <Select
                                {...field} 
                                native
                                notched
                                required
                                label="columns"
                                inputProps={{
                                    name: "columns",
                                    id: "columns-select"
                                }}
                            >
                                {showOptionsColRow(10)}
                            </Select>}
                        />
                    </FormControl>
                </div>
                <div className="h-2"/>
                <div className="grid grid-flow-row gap-2">
                    <Controller 
                        name="newCategory"
                        control={control}
                        render={({ field }) => 
                        <TextField
                            {...field} 
                            onKeyPress={e => {
                                if (e.key === 'Enter') {
                                    handleAddCategory()
                                    e.preventDefault() 
                                }
                            }}
                            variant="outlined"
                            type="text"
                            label="Añadir Categoria"
                            InputLabelProps={{ shrink: true}}
                            placeholder="Ej: Perforación"
                            InputProps={{
                                endAdornment: <InputAdornment position="end">
                                    <span 
                                        onClick={handleSubmit(handleAddCategory)}
                                        className="flex items-center cursor-pointer no-tap-highlight h-14 px-1 -mr-2 text-lg"
                                    >
                                        <FontAwesomeIcon icon={faPlusCircle}/>
                                    </span>
                                </InputAdornment>,
                            }}
                        />}
                    />
                    <div className="flex flex-col row-span-2 h-24 rounded font-medium overflow-y-auto bg-gray-500 bg-opacity-20">
                        {showCategories()}
                    </div>
                </div>
                <div className="mt-4 flex">
                    <Button
                        fullWidth
                        style={{marginRight:"4px"}}
                        color="primary"
                        variant="contained"
                        type="submit"
                    >
                        Modificar
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleDeleteSpace}
                    >
                        <FontAwesomeIcon icon={faTrashAlt}/>
                    </Button>
                </div>
            </form>
        </Modal>
    )
}
