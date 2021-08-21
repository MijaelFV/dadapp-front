import { Button, FormControl, InputLabel, Select, TextField } from '@material-ui/core';
import React from 'react'
import { Controller, useForm } from 'react-hook-form';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { showOptionsColRow } from '../../../helpers/showOptionsColRow';
import { useModalIsOpen } from '../../../hooks/useModalIsOpen';
import { startCreateSpace } from '../../../redux/actions/space';
import { closeModal } from '../../../redux/actions/ui';

Modal.setAppElement('#root');
export const SpaceCreateModal = () => {
    const dispatch = useDispatch();
    const area = useSelector(state => state.area.active)
    const thisModalIsOpen = useModalIsOpen("SpaceCreateModal")

    const { control, reset, handleSubmit } = useForm();

    const onSubmit = (data) => {
        dispatch(startCreateSpace(data.name, data.rows, data.columns, area.uid));
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
            <form className="spaceCreateModal-container" onSubmit={handleSubmit(onSubmit)}>
                <Controller 
                    name="name"
                    control={control}
                    render={({ field }) => 
                    <TextField 
                        {...field} 
                        fullWidth
                        className="form-textField"
                        label="Nombre de espacio"
                        variant="outlined"
                        type="text"
                    />}

                />
                <div className="form-selects">
                        <FormControl
                            className="select" 
                            style={{marginRight:"10px"}}
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
                                    {showOptionsColRow()}
                                </Select>}
                            />
                        </FormControl>
                        <FormControl
                            className="select" 
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
                                    {showOptionsColRow()}
                                </Select>}
                            />
                        </FormControl>
                </div>
                <div className="form-button">
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        type="submit"
                    >
                        Crear
                    </Button>
                </div>
            </form>
        </Modal>
    )
}
