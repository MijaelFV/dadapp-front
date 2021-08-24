import React, { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faCogs } from '@fortawesome/free-solid-svg-icons';
import { openModal } from '../../redux/actions/ui';
import { clearLogs, startLoadingLogs } from '../../redux/actions/log'
import { LogsTable } from './components/LogsTable';
import { ModifyItemModal } from './components/ModifyItemModal';
import { IconButton } from '@material-ui/core';

export const SpaceItemInfo = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const {itemId} = useParams();
    const items = useSelector(state => state.inv.items);
    const item = items.find(item => item.uid === itemId)

    const areaId = useSelector(state => state.area.active.uid);
    const logs = useSelector(state => state.log.logs);

    useMemo(() => {
        dispatch(clearLogs());
        dispatch(startLoadingLogs(item.uid, 2));
    }, [dispatch, item])

    const handleOpenModifyModal = () => {
        dispatch(openModal("ModifyItemModal"));
    }

    const handleReturnClick = () => {
        history.goBack();
    }

    return (
        <div className="spaceItemInfo-container">
            <div className="spaceItemInfo-column">
                <div className="topBar">
                    <IconButton
                        color="primary"
                        style={{marginRight:"auto"}}
                        onClick={handleReturnClick}
                    >
                        <FontAwesomeIcon 
                            icon={faArrowLeft} 
                        />
                    </IconButton>
                    <IconButton
                        color="primary"
                        onClick={handleOpenModifyModal}
                    >
                        <FontAwesomeIcon 
                            icon={faCogs} 
                        />
                    </IconButton>
                </div>
                <div className="info-container">
                    <div className="itemImage">
                        No Image
                    </div>
                    <span className="itemName">
                        {item.name}
                    </span>
                    <span className="itemData">
                        Fila {item.row} - Columna {item.column} | Categoria: {item.category.name}
                    </span>
                    <span className="itemDescription">
                        {item.description}
                    </span>
                </div>
                <div className="dataGrid">
                    <LogsTable logs={logs} />
                </div>
            </div>
            <ModifyItemModal item={item} areaId={areaId} />
        </div>
    )
}
