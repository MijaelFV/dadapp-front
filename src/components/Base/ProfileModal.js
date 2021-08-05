import { Avatar, Button, FormControl, InputLabel, Select, TextField } from '@material-ui/core';
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
        width: "75%",
        maxWidth: "350px",
        height: "350px",
        top: '30%',
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

export const ProfileModal = () => {
    const dispatch = useDispatch();
    const {categories} = useSelector(state => state.inv);
    
    const {modalIsOpen} = useSelector(state => state.ui)
    const id = "ProfileModal"
    const ThisModalIsOpen = useMemo(() => {
        if (modalIsOpen === id) {
            return true;
        } else {
            return false;
        }
    }, [modalIsOpen])

    const { register, handleSubmit, errors } = useForm();

    const onSubmit = (data) => {
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
                <div>
                    <Avatar />                    
                </div>
            </form>
        </Modal>
    )
}
