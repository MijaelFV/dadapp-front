import React, { useMemo } from 'react'
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../redux/actions/ui';
import { startLogout } from '../redux/actions/auth';
import { startClearArea } from '../redux/actions/area';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { ShowAvatar } from './ShowAvatar';

Modal.setAppElement('#root');
export const ProfileModal = () => {
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
            closeTimeoutMS={200}
            className="modal"
            overlayClassName="modal-background"
        >
            <div className="profileModal-container">
                <div className="nose">
                    <ShowAvatar avatarClass={"avatar"} username={user.name} userId={user.uid} />
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
