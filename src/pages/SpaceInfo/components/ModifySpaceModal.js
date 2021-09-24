import { Button, FormControl, InputAdornment, InputLabel, Select, TextField } from '@material-ui/core';
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

Modal.setAppElement('#root');
export const ModifySpaceModal = ({space}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const {categories} = useSelector(state => state.inv);
    
    const thisModalIsOpen = useModalIsOpen("ModifySpaceModal")
    
    const { control, handleSubmit, reset} = useForm({
        defaultValues: {
            name: space.name,
            rows: space.rows,
            columns: space.columns
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
        history.replace('/spaces');
        dispatch(startDeleteSpace(space.uid));
        dispatch(closeModal());
        reset();
    }
    
    const handleAddCategory = (data) => {
        dispatch(createCategory(space.uid, data.newCategory))
    }

    const handleDeleteCategory = (categoryUid) => {
        dispatch(deleteCategory(space.uid, categoryUid))
    }

    const showCategories = () => {
        if (categories.length > 0) {
            return categories.map((category) => (
                <span 
                    className="flex justify-between items-center mx-2 my-0.5 rounded-sm px-1"
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
            <form onSubmit={handleSubmit(onSubmit)}>
                <Controller 
                    name="name"
                    control={control}
                    render={({ field }) => 
                    <TextField
                        {...field}
                        fullWidth
                        type="text"
                        variant="outlined"
                        label="Nombre del espacio"
                    />}
                />
                <div className="h-3"/>
                <div className="flex">
                    <div className="flex flex-col">
                        <Controller 
                            name="newCategory"
                            control={control}
                            render={({ field }) => 
                            <TextField
                                {...field} 
                                variant="outlined"
                                type="text"
                                label="Añadir Categoria"
                                style={{width:"210px"}}
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
                        <div className="flex flex-col h-24 w-52 mt-3 box-border rounded font-medium overflow-y-auto pb-0.5 bg-gray-500 bg-opacity-20">
                            {showCategories()}
                        </div>
                    </div>
                    <div className="flex flex-col ml-3">
                        <FormControl
                            style={{width:"115px"}} 
                            variant="outlined"
                        >
                            <InputLabel htmlFor="rows-select">Filas</InputLabel>
                            <Controller 
                                name="rows"
                                control={control}
                                render={({ field }) => 
                                <Select
                                    {...field} 
                                    native
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
                            style={{width:"115px", marginTop:"12px"}} 
                            variant="outlined"
                        >
                            <InputLabel htmlFor="columns-select">Columnas</InputLabel>
                            <Controller 
                                name="columns"
                                control={control}
                                render={({ field }) => 
                                <Select
                                    {...field} 
                                    native
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
