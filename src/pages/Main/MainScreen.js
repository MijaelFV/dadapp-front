import { faHistory, faMinus, faPlus, faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { startLoadingLogs } from '../../redux/actions/log'
import { openModal } from '../../redux/actions/ui'
import { ProfileModal } from '../../components/ProfileModal'
import { Logs } from './components/Logs'
import { ShowAvatar } from '../../components/ShowAvatar'
import { TakeItemModal } from './components/TakeItemModal'
import { ReturnItemModal } from './components/ReturnItemModal'
import { startLoadingSpaces } from '../../redux/actions/space'
import { getInventoryByTaked } from '../../redux/actions/inv'
import { IconButton } from '@material-ui/core'

export const MainScreen = () => {
    const history = useHistory() 
    const dispatch = useDispatch();

    const area = useSelector(state => state.area.active);
    const spaces = useSelector(state => state.space.spaces);
    const user = useSelector(state => state.auth)
    const logs = useSelector(state => state.log.logs);
    const itemsToReturn = useSelector(state => state.inv.toReturn);

    useMemo(() => {
        dispatch(getInventoryByTaked(area.uid))
        dispatch(startLoadingLogs(area.uid, 1));
        dispatch(startLoadingSpaces(area.uid));
    }, [dispatch, area.uid])

    const handleSearchClick = () => {
        history.push("/search")
    }
    
    const handleReturnClick = () => {
        dispatch(openModal("ReturnItemModal"));
    }
    
    const handleTakeClick = () => {
        dispatch(openModal("TakeItemModal"));
    }

    // const handleLogScroll = (e) => {
    //     const { offsetHeight, scrollTop, scrollHeight} = e.target
    
    //     if (offsetHeight + scrollTop === scrollHeight) {
    //       setSkip(logs.length)
    //     }
    //   }

    return (
        <div 
            className="text-white bg-gray-900 flex flex-col w-full h-auto min-h-full pb-20" 
            style={{maxWidth:"500px", marginInline:"auto"}}
        >
            <div className="flex justify-between p-3">
                <IconButton
                    onClick={handleSearchClick}
                >
                    <FontAwesomeIcon 
                            icon={faSearch} 
                    />
                </IconButton>
                <div className="w-10 h-10 ml-auto cursor-pointer no-tap-highlight">
                    <ShowAvatar avatarClass="border-2" username={user.name} userId={user.uid} profile={true} />
                </div>
            </div>
            <div className="-mt-9 flex flex-col items-center">
                <div className="flex flex-col items-center">
                    <h3 className="m-0 text-xl text-gray-400">
                        ÁREA
                    </h3>
                    <h1 className="m-0 text-3xl font-bold">
                        {area.name}
                    </h1>
                </div>
                <div className="w-80 flex justify-evenly mt-7">
                    <div className="flex flex-col items-center">
                        <IconButton
                            onClick={handleReturnClick}
                            style={{borderRadius:"10px", backgroundColor:"#0E292D", color:"#10B981", height:"50px", width:"50px"}}
                        >
                            <FontAwesomeIcon 
                                icon={faPlus} 
                            />
                        </IconButton>
                        <p className="mt-2">
                            Devolver
                        </p>
                    </div>
                    <div className="flex flex-col items-center">
                        <div
                            className="flex justify-center items-center text-2xl"
                            style={{borderRadius:"10px", backgroundColor:"#302120", color:"#F59E0B", height:"50px", width:"50px"}}
                        >
                            <p>{itemsToReturn.length}</p>
                        </div>
                        <p className="mt-2">
                            Pendientes
                        </p>
                    </div> 
                    <div className="flex flex-col items-center">
                        <IconButton
                            onClick={handleTakeClick}
                            style={{borderRadius:"10px", backgroundColor:"#321A24", color:"#EF4444", height:"50px", width:"50px"}}
                        >
                            <FontAwesomeIcon 
                                icon={faMinus} 
                            />
                        </IconButton>
                        <p className="mt-2">
                            Retirar
                        </p>
                    </div>
                </div>
            </div>
            {
                logs.length > 0
                ?   (<div className="flex flex-col rounded-xl mx-2 mt-9 py-1">
                        {logs.map((log) => (
                            <Logs key={log.uid} log={log} history={history} dispatch={dispatch}/>
                        ))}
                    </div>)
                :   (
                    <div className="mx-auto my-auto flex flex-col items-center text-gray-400">
                        <FontAwesomeIcon icon={faHistory} size="4x" />
                        <p className="mt-3">No hay movimientos para mostrar</p>
                    </div>)
            }
            <ProfileModal />
            <ReturnItemModal areaId={area.uid} spaces={spaces} items={itemsToReturn} />
            <TakeItemModal areaId={area.uid} spaces={spaces} />
        </div>
    )
}
