import { FormControl, InputLabel, Select, TextField } from '@material-ui/core';
import React, { useMemo } from 'react'
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../../redux/actions/ui';
import { Controller, useForm } from "react-hook-form";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { StyBtn, StySpaceBtnDel } from '../../../styles/components/materialUi/styledComponents';

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

export const ModifyItemModal = ({item}) => {
    const dispatch = useDispatch();
    const {categories} = useSelector(state => state.inv);
    
    const {modalIsOpen} = useSelector(state => state.ui)
    const id = "ModifyItemModal"
    const ThisModalIsOpen = useMemo(() => {
        if (modalIsOpen === id) {
            return true;
        } else {
            return false;
        }
    }, [modalIsOpen])
    
    const { control, handleSubmit, reset} = useForm({
        defaultValues: {
            name: item.item.name,
            description: item.item.description,
            category: item.item.category._id,
            row: item.row,
            column: item.column
        }
    });

    const onSubmit = (data) => {
        // dispatch(startModifySpace(space.uid, data.name, data.rows, data.columns));
        // dispatch(closeModal());
        // reset({name: data.name, rows: data.rows, columns: data.columns});
    }

    const handleDeleteObject = () => {
        // history.replace('/spaces');
        // dispatch(startDeleteSpace(space.uid));
        // dispatch(closeModal());
        // reset();
    }
    
    const handleCloseModal = () => {
        dispatch(closeModal());
        reset();
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
                <Controller 
                    name="name"
                    control={control}
                    render={({ field }) => 
                    <TextField
                        {...field}
                        fullWidth
                        type="text"
                        variant="outlined"
                        label="Nombre del objeto"
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
                            variant="outlined"
                            label="Descripcion"
                        />}

                    />
                <div>
                    <FormControl
                        // className="selects-rows" 
                        variant="outlined"
                    >
                        <InputLabel htmlFor="category-select">Categoria</InputLabel>
                        <Controller 
                            name="category"
                            control={control}
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
                        // className="selects-rows" 
                        variant="outlined"
                    >
                        <InputLabel htmlFor="row-select">Fila</InputLabel>
                        <Controller 
                            name="row"
                            control={control}
                            render={({ field }) => 
                            <Select
                                {...field} 
                                native
                                label="row"
                                inputProps={{
                                    name: "row",
                                    id: "row-select"
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
                        // className="selects-cols" 
                        variant="outlined"
                    >
                        <InputLabel htmlFor="columns-select">Columna</InputLabel>
                        <Controller 
                            name="column"
                            control={control}
                            render={({ field }) => 
                            <Select
                                {...field} 
                                native
                                label="column"
                                inputProps={{
                                    name: "column",
                                    id: "column-select"
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
                        onClick={handleDeleteObject}
                    >
                        <FontAwesomeIcon icon={faTrashAlt}/>
                    </StySpaceBtnDel>
                </div>
            </form>
        </Modal>
    )
}
