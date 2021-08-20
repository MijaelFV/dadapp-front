import { Avatar } from '@material-ui/core';
import React, { useMemo } from 'react'
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../actions/ui';
import { startLogout } from '../../actions/auth';
import { startClearArea } from '../../actions/area';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const customStyles = {
    content: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "240px",
        // height: "300px",
        top: '30%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        boxShadow: "rgb(230, 230, 230) 0px 0px 5px 0px",
        border: "none",
        borderRadius: "10px"
    },
};
Modal.setAppElement('#root');

export const ProfileModal = () => {
    const baseUrl = process.env.REACT_APP_API_URL;
    const dispatch = useDispatch();
    
    const user = useSelector(state => state.auth)
    const activeArea = useSelector(state => state.area.active);
    
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

    const ifActiveArea = () => {
        if (activeArea !== null) {
            return [
            <div className="userRole">
                <span>Administrador</span>
            </div>,
            <div 
                className="changeArea"
                onClick={handleChangeAreaClick} 
            >
                <span>Cambiar de Área</span>
            </div>]
        } else {
            return
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
            <div className="modal-container">
                <div className="nose">
                    <Avatar className="avatar" alt={user.name} src={`${baseUrl}api/upload/users/${user.uid}`} />                    
                    <FontAwesomeIcon 
                        icon={faSignOutAlt} 
                        className="logoutIcon"
                        onClick={handleLogOutClick}
                    />
                </div>
                <div className="userName">
                    <span>{user.name}</span>
                </div>
                {
                    ifActiveArea()
                }
                <div className="userSettings">
                    <span>Configuración de Cuenta</span>
                </div>
            </div>
        </Modal>
    )
}
