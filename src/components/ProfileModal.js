import React from 'react'
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../redux/actions/ui';
import { startLogout } from '../redux/actions/auth';
import { startClearArea, startLoadingAreaById } from '../redux/actions/area';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faCogs, faDoorOpen, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { ShowAvatar } from './ShowAvatar';
import { useModalIsOpen } from '../hooks/useModalIsOpen';
import { IconButton, List, ListItem } from '@material-ui/core';
import { showUserRole } from '../helpers/showUserRole';
import { useHistory } from 'react-router';

Modal.setAppElement('#root');
export const ProfileModal = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    
    const user = useSelector(state => state.auth)
    const activeArea = useSelector(state => state.area.active);
    
    const thisModalIsOpen = useModalIsOpen("ProfileModal")

    const handleLogOutClick = () => {
        dispatch(startLogout());
    }
    
    const handleChangeAreaClick = () => {
        dispatch(startClearArea());
    }

    const handleAdminAreaClick = async() => {
        if (!activeArea.inviteCode) {
            await dispatch(startLoadingAreaById(activeArea.uid))
        }
        history.push("/admin");
        dispatch(closeModal());
    }
    
    const handleCloseModal = () => {
        dispatch(closeModal());
    }  

    const showManageArea = () => {
        const userRole = showUserRole(activeArea, user.uid);

        if (userRole === "Administrador") {
            return <ListItem
                button 
                style={listItemStyle}
                onClick={handleAdminAreaClick}  
            >
                <IconButton 
                    disabled
                    disableRipple
                    style={listStartIconStyle}
                    edge="start" 
                >
                    <FontAwesomeIcon icon={faSignOutAlt} />
                </IconButton>
                <p style={listText}>Administrar área</p>
                <IconButton 
                    disableTouchRipple
                    disabled
                    style={listArrowStyle}
                    edge="end" 
                >
                    <FontAwesomeIcon icon={faChevronRight} />
                </IconButton>
            </ListItem>
        } else {
            return null
        }
    }
    
    const listStartIconStyle = {backgroundColor:"#84848429", color:"#ffffff", width:"38px", height:"38px", fontSize:"18px"};
    const listItemStyle = {borderRadius:"12px", width:"260px", paddingInline:"15px"};
    const listArrowStyle = {color:"#ffffff", fontSize:"18px"};
    const listText = {fontWeight:"500", marginLeft:"12px", marginRight:"auto"}

    return (
        <Modal
            isOpen={thisModalIsOpen}
            onRequestClose={handleCloseModal}
            closeTimeoutMS={200}
            className="modal"
            overlayClassName="modal-background"
        >
            <div className="flex flex-col items-center">
                <div className="flex w-full">
                    <div className="flex w-16 h-16">
                        <ShowAvatar avatarClass="border-2 border-white border-solid" username={user.name} userId={user.uid} />
                    </div>
                    <div className="ml-4 mt-1 text-lg font-bold justify-center flex flex-col">
                        <p>{user.name}</p>
                        {
                            activeArea
                            ? <p className="font-medium text-base text-gray-400">{showUserRole(activeArea, user.uid)}</p>
                            : null
                        }
                    </div>
                </div>
                <div className="w-full h-0.5 mt-4 rounded-full bg-gray-800"/>
                <List>
                    {
                        activeArea
                        ? ([
                            <ListItem
                                button 
                                style={listItemStyle}
                                onClick={handleChangeAreaClick}
                            >
                                <IconButton 
                                    disabled
                                    disableRipple
                                    style={listStartIconStyle}
                                    edge="start" 
                                >
                                    <FontAwesomeIcon icon={faSignOutAlt} />
                                </IconButton>
                                <p style={listText}>Cambiar de área</p>
                                <IconButton 
                                    disableTouchRipple
                                    disabled
                                    style={listArrowStyle}
                                    edge="end" 
                                >
                                    <FontAwesomeIcon icon={faChevronRight} />
                                </IconButton>
                            </ListItem>,
                            showManageArea()
                        ])
                        : null
                    }
                    
                    <ListItem
                        button 
                        style={listItemStyle}
                    >
                        <IconButton 
                            disabled
                            disableRipple
                            style={listStartIconStyle}
                            edge="start" 
                        >
                            <FontAwesomeIcon icon={faCogs} />
                        </IconButton>
                        <p style={listText}>Configuracion</p>
                        <IconButton 
                            disableTouchRipple
                            disabled
                            style={listArrowStyle}
                            edge="end" 
                        >
                            <FontAwesomeIcon icon={faChevronRight} />
                        </IconButton>
                    </ListItem>
                    <ListItem
                        button 
                        style={listItemStyle}
                        onClick={handleLogOutClick}
                    >
                        <IconButton 
                            disabled
                            disableRipple
                            style={listStartIconStyle}
                            edge="start" 
                        >
                            <FontAwesomeIcon icon={faDoorOpen} />
                        </IconButton>
                        <p style={listText}>Cerrar sesion</p>
                        <IconButton 
                            disableTouchRipple
                            disabled
                            style={listArrowStyle}
                            edge="end" 
                        >
                            <FontAwesomeIcon icon={faChevronRight} />
                        </IconButton>
                    </ListItem>
                </List>
            </div>
        </Modal>
    )
}
