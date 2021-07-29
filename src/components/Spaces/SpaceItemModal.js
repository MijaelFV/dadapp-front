import { Button, FormControl, InputLabel, Select, TextField } from '@material-ui/core';
import React from 'react'
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { startCreateObject } from '../../actions/inv';
import { closeModal } from '../../actions/ui';
import { useForm } from '../../hooks/useForm';

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
    const {modalIsOpen} = useSelector(state => state.ui)
    const {categories} = useSelector(state => state.inv);
    
    const [formCreateValues, handleCreateInputChange] = useForm({
        name: '',
        description: '',
        row: '',
        column: '',
        category: ''
    });
    
    const {name, description, row, column, category} = formCreateValues;
    
    const handleCreateObject = (e) => {
        e.preventDefault();
        const space = spaceId
        dispatch(startCreateObject(name, description, category, row, column, space));
        dispatch(closeModal());
    }
    
    const handleCloseModal = () => {
        dispatch(closeModal());
    }  

    return (
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={handleCloseModal}
            style={customStyles}
            closeTimeoutMS={200}
            overlayClassName="spaceItemModal"
        >
            <form onSubmit={handleCreateObject}>
                <h2 className="form-title">
                    Nuevo Objeto
                </h2>
                <div>
                    <TextField
                        fullWidth
                        className="form-textField"
                        label="Nombre del objeto"
                        variant="outlined"
                        type="text"
                        name="name"
                        value={name}
                        onChange={handleCreateInputChange}
                    />
                    <TextField
                        fullWidth
                        multiline
                        rows={2}
                        maxRows={4}
                        className="form-textField"
                        variant="outlined"
                        label="Descripcion"
                        name="description"
                        value={description}
                        onChange={handleCreateInputChange}
                    />
                </div>
                <div className="form-selects">
                    <FormControl
                        className="form-control" 
                        variant="outlined"
                    >
                        <InputLabel htmlFor="category-select">Categoria</InputLabel>
                        <Select
                            native
                            label="category"
                            value={category}
                            onChange={handleCreateInputChange}
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
                    </FormControl>
                    <FormControl
                        className="form-control" 
                        variant="outlined"
                    >
                        <InputLabel htmlFor="row-select">Fila</InputLabel>
                        <Select
                            native
                            label="row"
                            value={row}
                            onChange={handleCreateInputChange}
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
                    </FormControl>
                    <FormControl
                        className="form-control" 
                        variant="outlined"
                    >
                        <InputLabel htmlFor="column-select">Columna</InputLabel>
                        <Select
                            native
                            label="column"
                            value={column}
                            onChange={handleCreateInputChange}
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
