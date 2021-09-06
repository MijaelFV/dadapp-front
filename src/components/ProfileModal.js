import React from 'react'
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../redux/actions/ui';
import { startLogout } from '../redux/actions/auth';
import { startClearArea } from '../redux/actions/area';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { ShowAvatar } from './ShowAvatar';
import { useModalIsOpen } from '../hooks/useModalIsOpen';

Modal.setAppElement('#root');
export const ProfileModal = () => {
    const dispatch = useDispatch();
    
    const user = useSelector(state => state.auth)
    const activeArea = useSelector(state => state.area.active);
    
    const thisModalIsOpen = useModalIsOpen("ProfileModal")

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
            isOpen={thisModalIsOpen}
            onRequestClose={handleCloseModal}
            closeTimeoutMS={200}
            className="modal"
            overlayClassName="modal-background"
        >
            <div className="profileModal-container">
                <div className="nose">
                    <div className="w-20 h-20 absolute"> 
                        <ShowAvatar username={user.name} userId={user.uid} />
                    </div>
                    <FontAwesomeIcon 
                        icon={faSignOutAlt} 
                        className="logoutIcon"
                        onClick={handleLogOutClick}
                    />
                </div>
                <div className="username">
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
