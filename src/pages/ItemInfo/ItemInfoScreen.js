import React, { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faCogs } from '@fortawesome/free-solid-svg-icons';
import { openModal } from '../../redux/actions/ui';
import { startLoadingLogs } from '../../redux/actions/log'
import { LogsTable } from './components/LogsTable';
import { ModifyItemModal } from './components/ModifyItemModal';
import { IconButton } from '@material-ui/core';

export const SpaceItemInfo = () => {
    const dispatch = useDispatch();

    const {itemId} = useParams();
    const items = useSelector(state => state.inv.items);
    const item = items.find(item => item.item._id === itemId)

    const area = useSelector(state => state.area.active);
    const logs = useSelector(state => state.log.logs);

    useMemo(() => {
        if (logs.length === 0) {
            dispatch(startLoadingLogs(area));
        }
    }, [dispatch, area, logs])

    const handleOpenModifyModal = () => {
        dispatch(openModal("ModifyItemModal"));
    }

    return (
        <div className="spaceItemInfo-container">
            <div className="spaceItemInfo-column">
                <div className="topBar">
                    <IconButton
                        style={{marginRight:"auto"}}
                    >
                        <FontAwesomeIcon 
                            icon={faArrowLeft} 
                        />
                    </IconButton>
                    {/* <IconButton
                        style={{marginRight:"8px"}}
                    >
                        <FontAwesomeIcon 
                            icon={faPlus} 
                        />
                    </IconButton> */}
                    <IconButton
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
                        {item.item.name}
                    </span>
                    <span className="itemData">
                        Fila {item.row} - Columna {item.column} | Categoria: {item.item.category.name}
                    </span>
                    <span className="itemDescription">
                        {item.item.description}
                    </span>
                </div>
                <div className="dataGrid">
                    <LogsTable list={logs} />
                </div>
            </div>
            <ModifyItemModal item={item} />
        </div>
    )
}
