import React, { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getCategoriesByArea } from '../../actions/category';
import { startLoadingSpaces } from '../../actions/space';
import { openModal } from '../../actions/ui';
import { SpaceCreateModal } from '../../components/Spaces/SpaceCreateModal';
import { SpaceRow } from '../../components/Spaces/SpaceRow';
import { StyledButton } from '../../styles/components/materialUi/styledComponents';

export const SpaceScreen = () => {
    const dispatch = useDispatch();
    const spaces = useSelector(state => state.space.spaces);
    const area = useSelector(state => state.area.active);

    useMemo(() => {
        dispatch(startLoadingSpaces(area.uid));
    }, [dispatch])

    useMemo(() => {
        dispatch(getCategoriesByArea(area.uid));
    }, [dispatch])

    const handleOpenModal = () => {
        dispatch(openModal());
    }

    return (
        <div className="space-container">
            <div className="rowContainer">
                <div className="rowContainer-options">
                    <StyledButton
                        onClick={handleOpenModal}
                    >   
                        <span>Crear Espacio</span>
                    </StyledButton>
                </div>
                {spaces.map((space) => (
                    <SpaceRow key={space.uid} {...space}/>
                ))}
            </div>
            <SpaceCreateModal />
        </div>
    )
}