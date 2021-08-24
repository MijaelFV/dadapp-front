import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { getInventoryBySpace } from '../../redux/actions/inv';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faBox, faCogs, faPlus } from '@fortawesome/free-solid-svg-icons';
import { NumToArray } from '../../helpers/numToArray';
import { openModal } from '../../redux/actions/ui';
import { CreateItemModal } from './components/CreateItemModal';
import { Button, IconButton } from '@material-ui/core';
import { ModifySpaceModal } from './components/ModifySpaceModal';
import { getCategoriesBySpace } from '../../redux/actions/category';
import { ItemsTable } from './components/ItemsTable';

export const SpaceInfo = () => {
    const history = useHistory()
    const dispatch = useDispatch();

    const {spaceId} = useParams();
    const spaces = useSelector(state => state.space.spaces);
    const space = spaces.find(space => space.uid === spaceId)

    // Convierte x numero en un array
    const cols = NumToArray(space.columns)
    const rows = NumToArray(space.rows)
    
    useMemo(() => {
        dispatch(getCategoriesBySpace(spaceId));
        dispatch(getInventoryBySpace(spaceId));
    }, [dispatch, spaceId]) 
    
    const items = useSelector(state => state.inv.items);
    const [filteredList, setFilteredList] = useState(Array);
    useEffect(() => {setFilteredList(items)}, [items] )

    // Indica cual posicion se selecciono
    const handleFilterByPositionClick = (row, column, all) => {
        if (all !== true) {
            const res = items?.filter(
                item => (item.row === row && item.column === column) 
            );
            setFilteredList(res);
            setShowActive({all: false})
        } else {
            setFilteredList(items);
            setShowActive({all: true})
        }
    };

    // Activa el color en el item seleccionado
    const [showActive, setShowActive] = useState({
        all: true,
        row: null,
        col: null
    });

    const handleOpenItemModal = () => {
        dispatch(openModal("CreateItemModal"));
    }

    const handleOpenModifyModal = () => {
        dispatch(openModal("ModifySpaceModal"));
    }

    const handleReturnClick = () => {
        history.push("/spaces")
    }

    return (
        <div className="spaceInfo-container">
            <div className="spaceInfo-column">
                <div className="topBar">
                    <IconButton
                        color="primary"
                        onClick={handleReturnClick}
                        style={{marginRight:"auto"}}
                    >
                        <FontAwesomeIcon 
                            icon={faArrowLeft} 
                        />
                    </IconButton>
                    <IconButton
                        color="primary"
                        onClick={() => {
                            handleOpenItemModal()
                            handleFilterByPositionClick(null, null, true)
                        }}
                        style={{marginRight:"8px"}}
                    >
                        <FontAwesomeIcon 
                            icon={faPlus} 
                        />
                    </IconButton>
                    <IconButton
                        color="primary"
                        onClick={() => {
                            handleOpenModifyModal()
                            handleFilterByPositionClick(null, null, true)
                        }}
                    >
                        <FontAwesomeIcon 
                            icon={faCogs} 
                        />
                    </IconButton>
                </div>
                <h1 className="spaceName">
                    {space.name}
                </h1>
                <div className="matrix-container">
                    <div className="matrix">
                        {rows.map((row) => (
                            <div key={row} className="matrix-row">
                                {cols.map((col) => (
                                    <div className={"matrix-col " + (((col === showActive.col && row === showActive.row) || showActive.all === true) ? "matrix-col-active" : "")}
                                        onClick={()=>{
                                            handleFilterByPositionClick(row, col, false)
                                            setShowActive({col: col, row: row})
                                        }}
                                        key={row+col} 
                                    >
                                        <span className="matrix-position">{row}-{col}</span>
                                        <FontAwesomeIcon icon={faBox} className="matrix-icon"/>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                    <Button
                        onClick={() => {handleFilterByPositionClick(null, null, true)}}
                        size="small"
                        variant="contained"
                        color="primary"
                        fullWidth={true}
                    >
                        Seleccionar Todos
                    </Button>
                </div>
                <div className="dataGrid">
                    <ItemsTable objectList={filteredList} spaceId={spaceId} />
                </div>
            </div>
            <CreateItemModal spaceId={spaceId} rows={rows} cols={cols} />
            <ModifySpaceModal space={space} />
        </div>
    )
}
