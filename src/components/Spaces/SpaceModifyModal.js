import { Button, FormControl, InputLabel, Select, TextField } from '@material-ui/core';
import React, { useMemo } from 'react'
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { startCreateObject } from '../../actions/inv';
import { closeModal } from '../../actions/ui';
import { useForm } from "react-hook-form";

const customStyles = {
    content: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "440px",
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

export const SpaceModifyModal = ({spaceId, cols, rows}) => {
    const dispatch = useDispatch();
    const {categories} = useSelector(state => state.inv);
    
    const {modalIsOpen} = useSelector(state => state.ui)
    const id = "SpaceModifyModal"
    const ThisModalIsOpen = useMemo(() => {
        if (modalIsOpen === id) {
            return true;
        } else {
            return false;
        }
    }, [modalIsOpen])

    const { register, handleSubmit, errors } = useForm();

    const onSubmit = (data) => {
        const space = spaceId
        dispatch(startCreateObject(data.name, data.description, data.category, data.row, data.column, space));
        dispatch(closeModal());
    }
    
    const handleCloseModal = () => {
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
                    Modificar Espacio
                </h2>
                <div>
                    <TextField
                        fullWidth
                        className="form-textField"
                        variant="outlined"
                        type="text"
                        label="Nombre del espacio"
                        {...register("name")}
                    />
                </div>
                <div className="form-selects">
                    <FormControl
                        className="form-control" 
                        variant="outlined"
                    >
                        <InputLabel htmlFor="rows-select">Filas</InputLabel>
                        <Select
                            native
                            label="rows"
                            {...register("row")}
                            inputProps={{
                                name: "rows",
                                id: "rows-select"
                            }}
                        >
                            <option aria-label="None" value="" />
                            {rows.map((row) => (
                                <option key={row} value={row}>{row}</option>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl
                        className="form-control" 
                        variant="outlined"
                    >
                        <InputLabel htmlFor="columns-select">Columnas</InputLabel>
                        <Select
                            native
                            label="columns"
                            {...register("columns")}
                            inputProps={{
                                name: "columns",
                                id: "columns-select"
                            }}
                        >
                            <option aria-label="None" value="" />
                            {cols.map((row) => (
                                <option key={row} value={row}>{row}</option>
                            ))}
                        </Select>
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
