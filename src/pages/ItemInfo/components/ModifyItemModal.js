import { Button, FormControl, InputLabel, Select, TextField } from '@material-ui/core';
import React, { useState } from 'react'
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../../redux/actions/ui';
import { Controller, useForm } from "react-hook-form";
import { useHistory, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { useModalIsOpen } from '../../../hooks/useModalIsOpen';
import { startModifyItem, startRemoveItem, uploadItemImage } from '../../../redux/actions/inv';
import { showOptionsColRow } from '../../../helpers/showOptionsColRow';


Modal.setAppElement('#root');
export const ModifyItemModal = ({item, areaId}) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const {categories} = useSelector(state => state.inv);
    
    const {spaceId} = useParams();
    const spaces = useSelector(state => state.space.spaces);
    const space = spaces.find(space => space.uid === spaceId)

    const thisModalIsOpen = useModalIsOpen("ModifyItemModal")
    
    const [selectedFile, setSelectedFile] = useState();

    const { control, handleSubmit, reset} = useForm({
        defaultValues: {
            name: item.name,
            description: item.description,
            category: item.category._id,
            row: item.row,
            column: item.column
        }
    });

    const onSubmit = (data) => {
        dispatch(startModifyItem(item.uid, data.name, data.description, data.category, data.row, data.column, space.uid, areaId));
        dispatch(uploadItemImage(item.uid, selectedFile));
        dispatch(closeModal());
        reset({name: data.name, description: data.description, category: data.category, row: data.row, column: data.column});
    }

    const handleRemoveItem = () => {
        history.replace(`/space/${spaceId}`);
        dispatch(startRemoveItem(item.uid, areaId));
        dispatch(closeModal());
        reset();
    }
    
    const handleCloseModal = () => {
        dispatch(closeModal());
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
            <form onSubmit={handleSubmit(onSubmit)}>
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
                        fullWidth
                        label="Nombre de objeto"
                        variant="outlined"
                        type="text"
                    />}
                />
                <div className="h-3"/>
                <Controller 
                    name="description"
                    control={control}
                    render={({ field }) => 
                    <TextField 
                        {...field} 
                        fullWidth
                        multiline
                        rows={2}
                        maxRows={4}
                        label="Descripcion"
                        variant="outlined"
                        className="form-textField"
                    />}
                />
                <div className="h-3"/>
                <div className="w-96 flex justify-between">
                    <FormControl
                        style={{width:"115px"}}
                        variant="outlined"
                    >
                        <InputLabel htmlFor="category-select">Categoria</InputLabel>
                        <Controller 
                            name="category"
                            control={control}
                            defaultValue=""
                            render={({field}) => 
                                <Select
                                    {...field} 
                                    native
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
                        style={{width:"115px"}}
                        variant="outlined"
                    >
                        <InputLabel htmlFor="row-select">Fila</InputLabel>
                        <Controller 
                            name="row"
                            control={control}
                            render={({field}) => 
                                <Select
                                    {...field} 
                                    native
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
                        style={{width:"115px"}} 
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
