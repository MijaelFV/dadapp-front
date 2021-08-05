import { Avatar } from '@material-ui/core';
import React, { useMemo } from 'react'
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../actions/ui';
import { startLogout } from '../../actions/auth';
import { startClearArea } from '../../actions/area';

const customStyles = {
    content: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "240px",
        height: "300px",
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
    
    const userName = useSelector(state => state.auth.name)
    
    const {modalIsOpen} = useSelector(state => state.ui)
    const id = "ProfileModal"
    const ThisModalIsOpen = useMemo(() => {
        if (modalIsOpen === id) {
            return true;
        } else {
            return false;
        }
    }, [modalIsOpen])


    const handleLogOutClick = () => {
        dispatch(startLogout());
    }
    
    const handleChangeAreaClick = () => {
        dispatch(startClearArea());
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
            overlayClassName="modal"
        >
            <div className="modal-container">
                <Avatar className="avatar" />                    
                <div className="userName">
                    <span>{userName}</span>
                </div>
                <div className="userRole">
                    <span>Administrador</span>
                </div>
                <div className="userSettings">
                    <span>Configuración de Cuenta</span>
                </div>
                <div 
                    className="changeArea"
                    onClick={handleChangeAreaClick} 
                >
                    <span>Cambiar de Área</span>
                </div>
                <div 
                    className="logOut"
                    onClick={handleLogOutClick}
                >
                    <span>Cerrar sesion</span>
                </div>
            </div>
        </Modal>
    )
}
