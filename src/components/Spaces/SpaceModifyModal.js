import { Button, FormControl, InputAdornment, InputLabel, Select, TextField } from '@material-ui/core';
import React, { useMemo } from 'react'
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../actions/ui';
import { Controller, useForm } from "react-hook-form";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faPlusSquare, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { createCategory } from '../../actions/category';

const customStyles = {
    content: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
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

export const SpaceModifyModal = ({spaceName, spaceId, cols, rows}) => {
    const dispatch = useDispatch();
    const {categories} = useSelector(state => state.inv);
    
    console.log(categories);

    const {modalIsOpen} = useSelector(state => state.ui)
    const id = "SpaceModifyModal"
    const ThisModalIsOpen = useMemo(() => {
        if (modalIsOpen === id) {
            return true;
        } else {
            return false;
        }
    }, [modalIsOpen])

    const { control, register, handleSubmit, reset} = useForm({
        defaultValues: {
            name: spaceName,
            rows: rows.length,
            columns: cols.length
        }
    });

    const onSubmit = (data) => {
        // const space = spaceId
        // dispatch(startCreateObject(data.name, data.description, data.rows, data.columns));
        console.log(data);
        reset();
        // dispatch(closeModal());
    }
    
    const handleAddCategory = (data) => {
        dispatch(createCategory(spaceId, data.newCategory))
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
            overlayClassName="modal"
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <h2 className="formSpace-title">
                    Editar Espacio
                </h2>
                <Controller 
                    name="name"
                    control={control}
                    defaultValue=""
                    render={({ field }) => 
                    <TextField
                        {...field} 
                        fullWidth
                        type="text"
                        variant="outlined"
                        label="Nombre del espacio"
                    />}
                />
                <div className="options-row">
                    <div className="categories">
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
                                            className="categoryAdd"
                                        >
                                            <FontAwesomeIcon icon={faPlusCircle}/>
                                        </span>
                                    </InputAdornment>,
                                }}
                            />}
                        />
                        <div className="categories-show">
                            {categories.map((category) => (
                                <span key={category.uid}>
                                    {category.name}
                                    <FontAwesomeIcon icon={faTrashAlt} className="iconButton"/>
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className="formSpace-selects">
                        <FormControl
                            className="selects-rows" 
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
                                </Select>}
                            />
                        </FormControl>
                        <FormControl
                            className="selects-cols" 
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
                                </Select>}
                            />
                        </FormControl>
                    </div>
                </div>
                <div className="formSpace-button">
                    <Button
                        size="large"
                        variant="contained"
                        color="primary"
                        type="submit"
                    >
                        Modificar
                    </Button>
                    <Button
                        size="large"
                        variant="contained"
                        color="primary"
                    >
                        Eliminar
                    </Button>
                </div>
            </form>
        </Modal>
    )
}
