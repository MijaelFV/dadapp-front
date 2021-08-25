import { Button, FormControl, InputLabel, Select, TextField } from '@material-ui/core';
import React from 'react'
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { startCreateItem } from '../../../redux/actions/inv';
import { closeModal } from '../../../redux/actions/ui';
import { Controller, useForm } from "react-hook-form";
import { useModalIsOpen } from '../../../hooks/useModalIsOpen';

Modal.setAppElement('#root');
export const CreateItemModal = ({spaceId, cols, rows}) => {
    const dispatch = useDispatch();
    const {categories} = useSelector(state => state.inv);
    const area = useSelector(state => state.area.active)
    
    const thisModalIsOpen = useModalIsOpen("CreateItemModal")

    const { control, reset, handleSubmit } = useForm();

    const onSubmit = (data) => {
        const space = spaceId
        dispatch(startCreateItem(data.name, data.description, data.category, data.row, data.column, space, area.uid));
        reset();
        dispatch(closeModal());
    }
    
    const handleCloseModal = () => {
        reset();
        dispatch(closeModal());
    }  

    return (
        <Modal
            isOpen={thisModalIsOpen}
            onRequestClose={handleCloseModal}
            closeTimeoutMS={200}
            className="modal"
            overlayClassName="modal-background"
        >
            <form className="createItemModal-container" onSubmit={handleSubmit(onSubmit)}>
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
                        className="form-textField"
                    />}
                />
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
                <div className="form-selects">
                    <FormControl
                        className="select"
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
                        className="select" 
                        variant="outlined"
                    >
                        <InputLabel htmlFor="row-select">Fila</InputLabel>
                        <Controller 
                            name="row"
                            control={control}
                            defaultValue=""
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
                                    <option aria-label="None" value="" />
                                    {rows.map((row) => (
                                        <option key={row} value={row}>{row}</option>
                                    ))}
                                </Select>
                            }
                        />
                    </FormControl>
                    <FormControl
                        className="select" 
                        variant="outlined"
                    >
                        <InputLabel htmlFor="column-select">Columna</InputLabel>
                        <Controller 
                            name="column"
                            control={control}
                            defaultValue=""
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
                                    <option aria-label="None" value="" />
                                    {cols.map((row) => (
                                        <option key={row} value={row}>{row}</option>
                                    ))}
                                </Select>
                            }
                        />
                    </FormControl>
                </div>
                <div className="form-button">
                    <Button
                        size="large"
                        variant="contained"
                        color="primary"
                        fullWidth={true}
                        type="submit"
                    >
                        Crear
                    </Button>
                </div>
            </form>
        </Modal>
    )
}
