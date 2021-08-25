import { Button } from '@material-ui/core';
import React, { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { clearInventory } from '../../redux/actions/inv';
import { startLoadingSpaces } from '../../redux/actions/space';
import { openModal } from '../../redux/actions/ui';
import { SpaceCreateModal } from './components/SpaceCreateModal';
import { SpaceRow } from './components/SpaceRow';

export const SpaceScreen = () => {
    const dispatch = useDispatch();
    const spaces = useSelector(state => state.space.spaces);
    const area = useSelector(state => state.area.active);
    
    useMemo(() => {
        dispatch(clearInventory());
        dispatch(startLoadingSpaces(area.uid));
    }, [dispatch, area.uid])

    const handleOpenModal = () => {
        dispatch(openModal("SpaceCreateModal"));
    }

    return (
        <div className="space-container">
            <div className="space-column">
                <div className="rowContainer">
                    <div className="rowContainer-options">
                        <Button
                            fullWidth
                            onClick={handleOpenModal}
                            color="primary"
                            variant="contained"
                            type="submit"
                        >
                            Crear Espacio
                        </Button>
                    </div>
                    {spaces.map((space) => (
                        <SpaceRow key={space.uid} {...space}/>
                    ))}
                </div>
            </div>
            <SpaceCreateModal />
        </div>
    )
}