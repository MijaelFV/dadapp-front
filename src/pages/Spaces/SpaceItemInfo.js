import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { getInventoryBySpace } from '../../actions/inv';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faCogs, faPlus } from '@fortawesome/free-solid-svg-icons';
import { NumToArray } from '../../helpers/numToArray';
import { StyledIconButton } from '../../styles/components/materialUi/styledComponents';
import { openModal } from '../../actions/ui';
import { getCategoriesBySpace } from '../../actions/category';
import { startLoadingLogs } from '../../actions/log'
import { SpaceLogsTable } from '../../components/Spaces/SpaceLogsTable';

export const SpaceItemInfo = () => {
    const history = useHistory()
    const dispatch = useDispatch();

    // const area = useSelector(state => state.area.active);
    const area = "60efb7d44c8a53491ca93914";
    const logs = useSelector(state => state.log.logs);

    useMemo(() => {
        if (logs.length === 0) {
            dispatch(startLoadingLogs(area));
        }
    }, [dispatch, area, logs])

    // const handleOpenItemModal = () => {
    //     dispatch(openModal("SpaceItemModal"));
    // }

    // const handleOpenModifyModal = () => {
    //     dispatch(openModal("SpaceModifyModal"));
    // }

    // const handleReturnClick = () => {
    //     history.push("/spaces")
    // }

    return (
        <div className="spaceItemInfo-container">
            <div className="spaceItemInfo-column">
                <div className="topBar">
                    <StyledIconButton
                        style={{marginRight:"auto"}}
                    >
                        <FontAwesomeIcon 
                            icon={faArrowLeft} 
                        />
                    </StyledIconButton>
                    <StyledIconButton
                        style={{marginRight:"8px"}}
                    >
                        <FontAwesomeIcon 
                            icon={faPlus} 
                        />
                    </StyledIconButton>
                    <StyledIconButton
                    >
                        <FontAwesomeIcon 
                            icon={faCogs} 
                        />
                    </StyledIconButton>
                </div>
                <div className="info-container">
                    <div className="itemImage">
                        No Image
                    </div>
                    <span className="itemName">
                        Destornillador de punta Plana
                    </span>
                    <span className="itemData">
                        Fila 2 - Columna 3 | Categoria: Penetracion
                    </span>
                    <span className="itemDescription">
                        Este es un destornillador que cumple la funcion de desatornillar tornillos
                    </span>
                </div>
                <div className="dataGrid">
                    <SpaceLogsTable list={logs} />
                </div>
            </div>
        </div>
    )
}
