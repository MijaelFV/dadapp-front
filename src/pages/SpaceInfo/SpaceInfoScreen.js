import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { getInventoryBySpace } from '../../redux/actions/inv';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faCogs, faPlus } from '@fortawesome/free-solid-svg-icons';
import { NumToArray } from '../../helpers/numToArray';
import { openModal } from '../../redux/actions/ui';
import { CreateItemModal } from './components/CreateItemModal';
import { Button, IconButton } from '@mui/material';
import { ModifySpaceModal } from './components/ModifySpaceModal';
import { getCategoriesBySpace } from '../../redux/actions/category';
import { ItemsTable } from './components/ItemsTable';
import { SwalMixin } from '../../components/SwalMixin';

export const SpaceInfoScreen = () => {
    const history = useHistory()
    const dispatch = useDispatch();

    const {spaceid} = useParams();
    const spaces = useSelector(state => state.space.spaces);
    const categories = useSelector(state => state.inv.categories);
    const space = spaces.find(space => space.uid === spaceid)

    // Convierte x numero en un array
    const cols = NumToArray(space.columns)
    const rows = NumToArray(space.rows)
    
    useEffect(() => {
        dispatch(getCategoriesBySpace(spaceid));
    }, [dispatch, spaceid]) 
    
    // State en el que se guarda que posicion se debe mostrar
    const [activePosition, setActivePosition] = useState({
        all: true,
        row: 0,
        col: 0
    });

    // Indica cual posicion se selecciono
    const handleFilterByPositionClick = (row, column, all) => {
        if (all !== true) {
            setActivePosition({all: false, row, col: column})
        } else {
            setActivePosition({all: true, row: 0, col: 0})
        }
    };

    const handleOpenCreateItemModal = () => {
        if (categories.length === 0) {
            SwalMixin.fire({
                text: `El espacio debe tener al menos una categoria para poder crear un articulo`,
                icon: 'info',
                confirmButtonText: "Aceptar",
            })
        } else {
            dispatch(openModal("CreateItemModal"));
        }
    }

    const handleOpenModifyModal = () => {
        dispatch(openModal("ModifySpaceModal"));
    }

    const handleReturnClick = () => {
        history.push("/spaces")
    }

    return (
        <div className="text-white bg-gray-900 flex flex-col w-full h-auto min-h-full pb-20" style={{maxWidth:"500px", marginInline:"auto"}}>
            <div className="flex items-center p-3">
                <IconButton
                    color="primary"
                    onClick={handleReturnClick}
                >
                    <FontAwesomeIcon 
                        icon={faArrowLeft} 
                    />
                </IconButton>
                <p className="ml-1 text-xl mr-auto">
                    Info. de espacio
                </p>
                <IconButton
                    color="primary"
                    onClick={() => {
                        handleOpenCreateItemModal()
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
            <h1 className="text-center mb-3 text-3xl font-bold w-10/12 ml-auto mr-auto">
                {space.name}
            </h1>
            <div className="flex flex-col items-center bg-gray-500 bg-opacity-20 m-auto overflow-hidden mx-3 px-1.5 pt-1.5 rounded">
                <div className="flex flex-col max-w-full max-h-80 rounded overflow-auto">
                    {rows.map((row) => (
                        <div key={row} className="flex">
                            {cols.map((col) => (
                                <div className={`no-tap-highlight flex flex-col justify-evenly items-center p-1 m-1 font-bold text-xl w-15 h-15 cursor-pointer transition-colors duration-150 ease-in rounded relative ${(((col === activePosition.col && row === activePosition.row) || activePosition.all === true) ? "bg-gray-100" : "bg-gray-900")}`}
                                    onClick={()=>{
                                        handleFilterByPositionClick(row, col, false)
                                        setActivePosition({col: col, row: row})
                                    }}
                                    key={row+col} 
                                >
                                    <div className="w-14 h-14 bg-gray-600 rounded flex justify-center items-center">
                                        <p className={`transition-colors duration-150 ease-in ${(((col === activePosition.col && row === activePosition.row) || activePosition.all === true) ? "text-white" : "text-gray-900")}`}>{row}-{col}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
                <Button
                    onClick={() => {handleFilterByPositionClick(null, null, true)}}
                    style={{marginTop:"6px"}}
                    size="small"
                    variant="contained"
                    fullWidth={true}
                >
                    Seleccionar Todos
                </Button>
            </div>
            <div className="rounded mt-6 mx-3 bg-gray-500 bg-opacity-20 px-2">
                <ItemsTable spaceid={spaceid} row={activePosition.row} column={activePosition.col} />
            </div>
            <CreateItemModal spaceid={spaceid} rows={rows} cols={cols} />
            <ModifySpaceModal space={space} />
        </div>
    )
}
