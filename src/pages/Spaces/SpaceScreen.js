import React, { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getCategoriesByArea } from '../../actions/category';
import { startLoadingSpaces } from '../../actions/space';
import { openModal } from '../../actions/ui';
import { SpaceModal } from '../../components/Spaces/SpaceModal';
import { SpaceRow } from '../../components/Spaces/SpaceRow';
import { StyledButton } from '../../styles/components/materialUi/styledComponents';

export const SpaceScreen = () => {
    const dispatch = useDispatch();
    const spaces = useSelector(state => state.space.spaces);
    const {categories} = useSelector(state => state.inv);

    useMemo(() => {
        if (spaces.length === 0) {
            dispatch(startLoadingSpaces());
        }
    }, [dispatch, spaces])

    useMemo(() => {
        if (categories.length === 0) {
            const area = "60efb7d44c8a53491ca93914"
            dispatch(getCategoriesByArea(area));
        }
    }, [dispatch, categories])

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
            <SpaceModal />
        </div>
    )
}