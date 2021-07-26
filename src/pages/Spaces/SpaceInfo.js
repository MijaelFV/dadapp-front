import React, { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { DataGrid } from '@material-ui/data-grid';
import { getInventoryBySpace } from '../../actions/inv';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBox } from '@fortawesome/free-solid-svg-icons';
import { NumToArray } from '../../helpers/numToArray';

export const SpaceInfo = () => {
    const dispatch = useDispatch();

    const {spaceId} = useParams();
    const {spaces} = useSelector(state => state.space);
    const space = spaces.find(space => space.uid === spaceId)

    const [filteredList, setFilteredList] = useState(Array);
    const {items} = useSelector(state => state.inv);
    const itemList = items || []

    useMemo(() => {
        if (!items) {
            dispatch(getInventoryBySpace(spaceId));
        }
    }, [spaceId, dispatch, items])
    

    // Indica cual posicion se selecciono
    const handleLocationClick = (row, column) => {
        console.log('handleLocationClick');
        const res = itemList.filter(
            item => (item.row === row && item.column === column) 
        );
        setFilteredList(res);
    };

    // Activa el color en el item seleccionado
    const [showActive, setShowActive] = useState({
        all: null,
        row: null,
        col: null
    });

    // Convierte x numero en un array
    const cols = NumToArray(space.columns)
    const rows = NumToArray(space.rows)

    // Son los props requeridos en el DataGrid
    const dataGridCols = [
        { field: 'id', headerName: 'ID', width: 70 },
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
        {id: i, object: object.item.name, category: object.item.category.name}
    ))

    return (
        <div className="spaceInfo-container">
            <h1 style={{marginTop:"40px", color:"#616161"}}>
               {space.name }
            </h1>
            <div className="matrix">
                {rows.map((row) => (
                    <div key={row} className="matrix-row">
                        {cols.map((col) => (
                            <div className={"matrix-col " + ( ((row === showActive.row && col === showActive.col) || showActive.all === true) ? "matrix-col-active" : "")}
                                onClick={()=>{
                                    handleLocationClick(row, col)
                                    setShowActive({col: col, row: row})
                                    // setShowActive({all: true})
                                }}
                                key={row+col} 
                            >
                                <FontAwesomeIcon icon={faBox}/>
                            </div>
                        ))}
                    </div>
                ))}
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
    )
}
