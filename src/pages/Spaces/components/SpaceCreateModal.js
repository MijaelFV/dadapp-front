import { Button, FormControl, InputLabel, Select, TextField } from '@material-ui/core';
import React, { useMemo } from 'react'
import { Controller, useForm } from 'react-hook-form';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { startCreateSpace } from '../../../redux/actions/space';
import { closeModal } from '../../../redux/actions/ui';

const customStyles = {
    content: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "420px",
        height: "350px",
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        boxShadow: "rgb(230, 230, 230) 0px 0px 20px 0px",
        border: "none",
        borderRadius: "10px"
    },
};
Modal.setAppElement('#root');

export const SpaceCreateModal = () => {
    const dispatch = useDispatch();

    const area = useSelector(state => state.area.active)
    const {modalIsOpen} = useSelector(state => state.ui)
    
    const id = "SpaceCreateModal"
    const ThisModalIsOpen = useMemo(() => {
        if (modalIsOpen === id) {
            return true;
        } else {
            return false;
        }
    }, [modalIsOpen])

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
            isOpen={ThisModalIsOpen}
            onRequestClose={handleCloseModal}
            style={customStyles}
            closeTimeoutMS={200}
            overlayClassName="spaceItemModal"
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <h2 className="form-title">
                    Nuevo Espacio
                </h2>
                <div>
                    <Controller 
                        name="name"
                        control={control}
                        defaultValue=""
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
                </div>
                <div className="form-selects">
                    <FormControl
                        className="form-control"
                        variant="outlined"
                    >
                        <InputLabel htmlFor="rows-select">Filas</InputLabel>
                        <Controller 
                            name="rows"
                            control={control}
                            defaultValue=""
                            render={({field}) => 
                                <Select
                                    {...field} 
                                    native
                                    label="rows"
                                    inputProps={{
                                        name: "rows",
                                        id: "rows-select"
                                    }}
                                >
                                    <option aria-label="None" value="" />
                                    <option value={1}>1</option>
                                    <option value={2}>2</option>
                                    <option value={3}>3</option>
                                    <option value={4}>4</option>
                                    <option value={5}>5</option>
                                    <option value={6}>6</option>
                                    <option value={7}>7</option>
                                    <option value={8}>8</option>
                                    <option value={9}>9</option>
                                    <option value={10}>10</option>
                                </Select>
                            }
                        />
                    </FormControl>
                    <FormControl 
                        className="form-control"
                        variant="outlined"
                    >
                        <InputLabel htmlFor="columns-select">Columnas</InputLabel>
                        <Controller 
                            name="columns"
                            control={control}
                            defaultValue=""
                            render={({field}) => 
                                <Select
                                    {...field} 
                                    native
                                    label="columns"
                                    inputProps={{
                                        name: "columns",
                                        id: "columns-select"
                                    }}
                                >
                                    <option aria-label="None" value="" />
                                    <option value={1}>1</option>
                                    <option value={2}>2</option>
                                    <option value={3}>3</option>
                                    <option value={4}>4</option>
                                    <option value={5}>5</option>
                                    <option value={6}>6</option>
                                    <option value={7}>7</option>
                                    <option value={8}>8</option>
                                    <option value={9}>9</option>
                                    <option value={10}>10</option>
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
