import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, withStyles } from '@material-ui/core';
import React, { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteInventory } from '../../actions/inv';
import { startLoadingSpaces } from '../../actions/space';
import { openModal } from '../../actions/ui';
import { SpaceModal } from '../../components/Spaces/SpaceModal';
import { SpaceRow } from '../../components/Spaces/SpaceRow';

export const SpaceScreen = () => {

    const CustomButton = withStyles({
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
    const {items} = useSelector(state => state.inv);

    const list = spaces || []
    
    if (items !== null) {
        dispatch(deleteInventory());
    }

    useMemo(() => {
        if (!spaces) {
            dispatch(startLoadingSpaces());
        }
    }, [dispatch, spaces])

    const handleOpenModal = () => {
        dispatch(openModal());
    }

    return (
        <div className="space-container">
            <div className="rowContainer">
                <div className="rowContainer-options">
                    <CustomButton
                        onClick={handleOpenModal}
                        startIcon={<FontAwesomeIcon icon={faPlus} style={{fontSize:"15px"}} />}
                    >   
                        <span>Crear Espacio</span>
                    </CustomButton>
                </div>
                {list.map((space) => (
                    <SpaceRow key={space.uid} {...space}/>
                ))}
            </div>
            <SpaceModal />
        </div>
    )
}