import { FormControl, InputAdornment, InputLabel, Select, TextField } from '@material-ui/core';
import React, { useMemo } from 'react'
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../actions/ui';
import { Controller, useForm } from "react-hook-form";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faTimesCircle, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { createCategory, deleteCategory } from '../../actions/category';
import { StyBtn, StySpaceBtnDel } from '../../styles/components/materialUi/styledComponents';
import { startDeleteSpace, startModifySpace } from '../../actions/space';
import { useHistory } from 'react-router-dom';

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

export const SpaceModifyModal = ({spaceId, space}) => {
    const dispatch = useDispatch();
    const history = useHistory();
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
    
    const { control, handleSubmit, reset} = useForm({
        defaultValues: {
            name: space.name,
            rows: space.rows,
            columns: space.columns
        }
    });

    const onSubmit = (data) => {
        dispatch(startModifySpace(spaceId, data.name, data.rows, data.columns));
        dispatch(closeModal());
        reset({name: data.name, rows: data.rows, columns: data.columns});
    }

    const handleDeleteSpace = () => {
        history.replace('/spaces');
        dispatch(startDeleteSpace(spaceId));
        dispatch(closeModal());
        reset();
    }
    
    const handleAddCategory = (data) => {
        dispatch(createCategory(spaceId, data.newCategory))
    }

    const handleDeleteCategory = (categoryUid) => {
        dispatch(deleteCategory(spaceId, categoryUid))
    }
    
    const handleCloseModal = () => {
        dispatch(closeModal());
        reset();
    }  

    const showCategories = () => {
        if (categories.length > 0) {
            return categories.map((category) => (
                <span key={category.uid}>
                    {category.name}
                    <FontAwesomeIcon 
                        icon={faTimesCircle} 
                        className="iconButton"
                        onClick={() => {
                            handleDeleteCategory(category.uid)
                        }}
                    />
                </span>
            ))
        } else {
            return <span className="noCategories">No hay categorias</span>
        }
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
                            {showCategories()}
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
                    <StyBtn
                        fullWidth
                        style={{marginRight:"2px"}}
                        color="primary"
                        variant="contained"
                        type="submit"
                    >
                        Modificar
                    </StyBtn>
                    <StySpaceBtnDel
                        variant="contained"
                        onClick={handleDeleteSpace}
                    >
                        <FontAwesomeIcon icon={faTrashAlt}/>
                    </StySpaceBtnDel>
                </div>
            </form>
        </Modal>
    )
}
