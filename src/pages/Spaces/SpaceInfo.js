import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { DataGrid } from '@material-ui/data-grid';
import { getInventoryBySpace } from '../../actions/inv';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faBox, faCogs, faPlus } from '@fortawesome/free-solid-svg-icons';
import { NumToArray } from '../../helpers/numToArray';
import { StyledIconButton } from '../../styles/components/materialUi/styledComponents';
import { openModal } from '../../actions/ui';
import { SpaceItemModal } from '../../components/Spaces/SpaceItemModal';
import { Button } from '@material-ui/core';

export const SpaceInfo = () => {
    console.log('render');

    const history = useHistory()
    const dispatch = useDispatch();

    const {spaceId} = useParams();
    const spaces = useSelector(state => state.space.spaces);
    const space = spaces.find(space => space.uid === spaceId)
    
    useMemo(() => {
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

    // Convierte x numero en un array
    const cols = NumToArray(space.columns)
    const rows = NumToArray(space.rows)

    // Son los props requeridos en el DataGrid
    const dataGridCols = [
        {
          field: 'object',
          headerName: 'Objeto',
          width: 150,
        },
        {
          field: 'category',
          headerName: 'Categoria',
          width: 150,
        }
    ];

    const dataGridRows = filteredList.map((object, i) => (
        {
            id: i, 
            object: object.item.name, 
            category: object.item.category.name
        }
    ))

    const handleOpenModal = () => {
        dispatch(openModal());
    }

    const handleReturnClick = () => {
        history.push("/spaces")
    }

    return (
        <div className="spaceInfo-container">
            <div className="spaceInfo-column">
                <div className="topBar">
                    <StyledIconButton
                        onClick={handleReturnClick}
                        style={{marginRight:"auto"}}
                    >
                        <FontAwesomeIcon 
                            icon={faArrowLeft} 
                        />
                    </StyledIconButton>
                    <StyledIconButton
                        onClick={() => {
                            handleOpenModal()
                            handleFilterByPositionClick(null, null, true)
                        }}
                        style={{marginRight:"10px"}}
                    >
                        <FontAwesomeIcon 
                            icon={faPlus} 
                        />
                    </StyledIconButton>
                    <StyledIconButton
                        onClick={() => {handleFilterByPositionClick(null, null, true)}}
                    >
                        <FontAwesomeIcon 
                            icon={faCogs} 
                        />
                    </StyledIconButton>
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
                    <DataGrid
                        getRowId={(row) => row.id}
                        rows={dataGridRows}
                        columns={dataGridCols}
                        pageSize={10}
                        checkboxSelection
                        disableSelectionOnClick
                    />
                </div>
            </div>
            <SpaceItemModal spaceId={spaceId} rows={rows} cols={cols}/>
        </div>
    )
}
