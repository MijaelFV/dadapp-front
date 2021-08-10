import { Button, FormControl, InputLabel, Select, TextField } from '@material-ui/core';
import React, { useMemo } from 'react'
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { startCreateObject } from '../../actions/inv';
import { closeModal } from '../../actions/ui';
// import { useForm } from '../../hooks/useForm';
import { Controller, useForm } from "react-hook-form";

const customStyles = {
    content: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "440px",
        height: "440px",
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

export const SpaceItemModal = ({spaceId, cols, rows}) => {
    const dispatch = useDispatch();
    const {categories} = useSelector(state => state.inv);
    const area = useSelector(state => state.area.active)
    
    const {modalIsOpen} = useSelector(state => state.ui)
    const id = "SpaceItemModal"
    const ThisModalIsOpen = useMemo(() => {
        if (modalIsOpen === id) {
            return true;
        } else {
            return false;
        }
    }, [modalIsOpen])

    const { control, reset, handleSubmit } = useForm();

    const onSubmit = (data) => {
        const space = spaceId
        dispatch(startCreateObject(data.name, data.description, data.category, data.row, data.column, space, area.uid));
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
                    Nuevo Objeto
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
                            label="Nombre de objeto"
                            variant="outlined"
                            type="text"
                        />}
                    />
                    <Controller 
                        name="description"
                        control={control}
                        defaultValue=""
                        render={({ field }) => 
                        <TextField 
                            {...field} 
                            fullWidth
                            multiline
                            rows={2}
                            maxRows={4}
                            className="form-textField"
                            label="Descripcion"
                            variant="outlined"
                        />}

                    />
                </div>
                <div className="form-selects">
                    <FormControl
                        className="form-control" 
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
                        className="form-control" 
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
                        className="form-control" 
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
