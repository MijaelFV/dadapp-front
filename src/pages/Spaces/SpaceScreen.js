import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, withStyles } from '@material-ui/core';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { startLoadingSpaces } from '../../actions/space';
import { openModal } from '../../actions/ui';
import { SpaceModal } from '../../components/Spaces/SpaceModal';
import { SpaceRow } from './SpaceRow';

export const SpaceScreen = () => {

    const StyledButton = withStyles({
        root: {
            background: "white",
            height: 35,
            // boxShadow: '0px 0px 0px 0px'
            boxShadow: "rgb(240, 240, 240) 0px 0px 10px 0px",

        },
        label: {
            textTransform: 'capitalize',
            color: 'black'
        },
    })(Button);
    
    const dispatch = useDispatch();
    const {spaces} = useSelector(state => state.space);

    const list = spaces || []

    useEffect(() => {
        if (!spaces) {
            dispatch(startLoadingSpaces());
        }
    }, [dispatch, spaces])

    const handleOpenModal = () => {
        dispatch(openModal());
    }

    return (
        <div className="space-container">
            <div className="space-row-container">
                <div className="space-options">
                    <StyledButton
                        onClick={handleOpenModal}
                        startIcon={<FontAwesomeIcon icon={faPlus} style={{fontSize:"15px"}} />}
                    >   
                        <span>Crear Espacio</span>
                    </StyledButton>
                </div>
                {list.map((space) => (
                    <SpaceRow key={space.uid} {...space}/>
                ))}
            </div>
            <SpaceModal />
        </div>
    )
}