import React, { useMemo } from 'react'
import moment from 'moment'
import 'moment/locale/es'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faCogs } from '@fortawesome/free-solid-svg-icons';
import { openModal } from '../../redux/actions/ui';
import { clearLogs, startLoadingLogs } from '../../redux/actions/log'
import { LogsTable } from './components/LogsTable';
import { ModifyItemModal } from './components/ModifyItemModal';
import { IconButton } from '@material-ui/core';
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
            <div className="w-full flex items-center p-3">
                <IconButton
                    color="primary"
                    onClick={handleReturnClick}
                >
                    <FontAwesomeIcon 
                        icon={faArrowLeft} 
                    />
                </IconButton>
                <p className="ml-1 text-xl mr-auto">
                    Articulo
                </p>
                <IconButton
                    color="primary"
                    onClick={handleOpenModifyModal}
                >
                    <FontAwesomeIcon 
                        icon={faCogs} 
                    />
                </IconButton>
            </div>
            <div className="rounded mx-3 bg-black bg-opacity-50 h-60 overflow-hidden justify-center flex border-4 border-solid border-gray-500 border-opacity-20">
                <ShowImage itemId={item.uid} />
            </div>
            <div className="flex flex-col rounded mt-3 mx-3 bg-gray-500 bg-opacity-20 p-2">
                <div className="itemData">
                    <h1 className="px-1 text-gray-300">
                        Nombre
                    </h1>
                    <div className="mb-2 px-1  text-lg">
                        <p>{item.name}</p>
                    </div>
                    <div className="h-0.5 rounded-full bg-gray-700"/>
                    <h1 className="px-1 mt-1 text-gray-300">
                        Descripcion
                    </h1>
                    <div className="mb-2 px-1  text-lg">
                        <p>{item.description}</p>
                    </div>
                    <div className="h-0.5 rounded-full bg-gray-700"/>
                    <h1 className="px-1 mb-1 mt-1 text-gray-300">
                        Caracteristicas
                    </h1>
                    <div className="rounded mb-1 overflow-hidden bg-gray-900">
                        {
                            item.takedBy !== null 
                            ?   ([<div className="flex px-1">
                                    <h1 className="text-gray-300 font-medium mr-auto">Portador</h1>
                                    <p>{item.takedBy?.name}</p>
                                </div>,
                                <div className="flex px-1 bg-gray-700">
                                    <h1 className="text-gray-300 font-medium mr-auto">Retirado</h1>
                                    <p>{moment(item.takedDate).locale("es").format('DD/MM/YY HH:mm')}</p>
                                </div>])
                            : null
                        }
                        <div className="flex px-1">
                            <h1 className="text-gray-300 mr-auto">Espacio</h1>
                            <p>{item.space?.name}</p>
                        </div>
                        <div className="flex px-1 bg-gray-700">
                            <h1 className="text-gray-300 mr-auto">Fila</h1>
                            <p>{item.row}</p>
                        </div>
                        <div className="flex px-1">
                            <h1 className="text-gray-300 mr-auto">Columna</h1>
                            <p>{item.column}</p>
                        </div>
                        <div className="flex px-1 bg-gray-700">
                            <h1 className="text-gray-300 mr-auto">Categoria</h1>
                            <p>{item.category?.name}</p>
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
