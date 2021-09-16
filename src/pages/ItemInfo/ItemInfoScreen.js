import React, { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faCogs } from '@fortawesome/free-solid-svg-icons';
import { openModal } from '../../redux/actions/ui';
import { clearLogs, startLoadingLogs } from '../../redux/actions/log'
import { LogsTable } from './components/LogsTable';
import { ModifyItemModal } from './components/ModifyItemModal';
import { Divider, IconButton } from '@material-ui/core';
import { ShowImage } from '../../components/ShowImage';

export const ItemInfoScreen = () => {
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
        <div className="text-white bg-gray-900 flex flex-col w-full h-auto min-h-full pb-20" style={{maxWidth:"500px", marginInline:"auto"}}>
            <div className="flex justify-between p-3">
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
            <h1 className="text-3xl font-bold -mt-5 mb-3 text-center">
                {item.name}
            </h1>
            <div className="rounded mx-3 bg-black bg-opacity-50 h-60 overflow-hidden justify-center flex border-4 border-solid border-gray-500 border-opacity-20">
                <ShowImage itemId={item.uid} />
            </div>
            <div className="flex flex-col rounded mt-3 mx-3 bg-gray-500 bg-opacity-20 p-2">
                <div className="itemData">
                    <h1 className="text-lg px-1 font-medium">
                        Informacion del Articulo
                    </h1>
                    <div className="mb-4 px-1 text-gray-300">
                        <p>{item.description}</p>
                    </div>
                    <Divider/>
                    <div className="rounded mt-3 mb-1 overflow-hidden">
                        <div className="flex px-1 bg-gray-700">
                            <h1 className="font-medium mr-auto">Fila</h1>
                            <p className="text-gray-300">{item.row}</p>
                        </div>
                        <div className="flex px-1">
                            <h1 className="font-medium mr-auto">Columna</h1>
                            <p className="text-gray-300">{item.column}</p>
                        </div>
                        <div className="flex px-1 bg-gray-700">
                            <h1 className="font-medium mr-auto">Categoria</h1>
                            <p className="text-gray-300">{item.category.name}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="rounded mt-6 mx-3 bg-gray-500 bg-opacity-20 px-2">
                <h1 className="text-lg px-1 font-medium mt-3 mb-2">
                    Ultimos Movimientos
                </h1>
                <LogsTable logs={logs} />
            </div>
            <ModifyItemModal item={item} areaId={areaId} />
        </div>
    )
}
