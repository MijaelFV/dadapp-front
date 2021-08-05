import { Button, FormControl, InputLabel, Select, TextField } from '@material-ui/core';
import React from 'react'
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { startCreateSpace } from '../../actions/space';
import { closeModal } from '../../actions/ui';
import { useForm } from '../../hooks/useForm';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};
Modal.setAppElement('#root');

export const SpaceCreateModal = () => {
    const dispatch = useDispatch();

    const area = useSelector(state => state.area.active)
    const {modalIsOpen} = useSelector(state => state.ui)
    
    const [formCreateValues, handleCreateInputChange] = useForm({
        name: '',
        rows: '',
        columns: ''
    });
    
    const {name, rows, columns} = formCreateValues;
    
    const handleCreateSpace = (e) => {
        e.preventDefault();
        
        dispatch(startCreateSpace(name, rows, columns, area.uid));
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
        >
            <div style={{marginBottom:"20px"}}>
                <h3 style={{fontWeight:"500", margin:"0"}}>
                    Crear nuevo espacio
                </h3>
            </div>
            <form style={{display:"grid", width:"300px"}} onSubmit={handleCreateSpace}>
                <div style={{display:"grid"}}>
                    <TextField
                        label="Nombre de espacio"
                        variant="outlined"
                        type="text"
                        name="name"
                        value={name}
                        onChange={handleCreateInputChange}
                    />
                </div>
                <div style={{display:"flex", justifyContent:"space-between", marginTop:"20px"}}>
                    <FormControl style={{width:"120px"}} variant="outlined">
                        <InputLabel htmlFor="rows-select">Filas</InputLabel>
                        <Select
                            native
                            label="rows"
                            value={rows}
                            onChange={handleCreateInputChange}
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
                    </FormControl>
                    <FormControl style={{width:"120px"}} variant="outlined">
                        <InputLabel htmlFor="columns-select">Columnas</InputLabel>
                        <Select
                            native
                            label="columns"
                            value={columns}
                            onChange={handleCreateInputChange}
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
