import { Button, FormControl, InputLabel, Select, TextField } from '@material-ui/core';
import React from 'react'
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../../redux/actions/ui';
import { Controller, useForm } from "react-hook-form";
import { NumToArray } from '../../../helpers/numToArray';
import { useHistory, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { useModalIsOpen } from '../../../hooks/useModalIsOpen';


Modal.setAppElement('#root');
export const ModifyItemModal = ({item}) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const {categories} = useSelector(state => state.inv);
    
    const {spaceId} = useParams();
    const spaces = useSelector(state => state.space.spaces);
    const space = spaces.find(space => space.uid === spaceId)
    
    // Convierte x numero en un array
    const cols = NumToArray(space.columns)
    const rows = NumToArray(space.rows)

    const thisModalIsOpen = useModalIsOpen("ModifyItemModal")
    
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
        dispatch(closeModal());
        reset({name: data.name, description: data.description, category: data.category, row: data.row, column: data.column});
    }

    const handleDeleteObject = () => {
        history.replace(`/space/${spaceId}`);
        // dispatch(startDeleteObject(space.uid));
        dispatch(closeModal());
        reset();
    }
    
    const handleCloseModal = () => {
        dispatch(closeModal());
        reset();
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
                        fullWidth
                        style={{marginRight:"2px"}}
                        variant="contained"
                        color="primary"
                        type="submit"
                    >
                        Crear
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleDeleteObject}
                    >
                        <FontAwesomeIcon icon={faTrashAlt}/>
                    </Button>
                </div>
            </form>
        </Modal>
    )
}
