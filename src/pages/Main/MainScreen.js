import { faHistory, faMinus, faPlus, faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { startLoadingLogs } from '../../redux/actions/log'
import { openModal } from '../../redux/actions/ui'
import { ProfileModal } from '../../components/ProfileModal'
import { AreaLogs } from './components/AreaLogs'
import { ShowAvatar } from '../../components/ShowAvatar'
import { TakeItemModal } from './components/TakeItemModal'
import { ReturnItemModal } from './components/ReturnItemModal'
import { startLoadingSpaces } from '../../redux/actions/space'
import { getInventoryByTaked } from '../../redux/actions/inv'
import { IconButton, Pagination, Skeleton } from '@mui/material'

export const MainScreen = () => {
    const history = useHistory() 
    const dispatch = useDispatch();

    const area = useSelector(state => state.area.active);
    const spaces = useSelector(state => state.space.spaces);
    const user = useSelector(state => state.auth)
    const logs = useSelector(state => state.log.areaLogs);
    const totalPages = useSelector(state => state.log.totalPages)
    const itemsToReturn = useSelector(state => state.inv.toReturn);
    const isLoading = useSelector(state => state.ui.isLoading)

    const [page, setPage] = useState(1);
    const [rowsPerPage] = useState(10);

    useMemo(() => {
        dispatch(getInventoryByTaked(area.uid))
        dispatch(startLoadingLogs(area.uid, 1, null, page, rowsPerPage));
        dispatch(startLoadingSpaces(area.uid));
    }, [dispatch, page, rowsPerPage, area.uid])

    const handleSearchClick = () => {
        history.push("/search")
    }
    
    const handleReturnClick = () => {
        dispatch(openModal("ReturnItemModal"));
    }
    
    const handleTakeClick = () => {
        dispatch(openModal("TakeItemModal"));
    }

    const handleChangePage = (e, newPage) => {
        setPage(newPage);
    };

    const showLogs = () => {
        if (logs.length > 0 ) {
            return  [<div className="flex flex-col rounded-xl mt-9 py-1">
                        {logs.map((log) => (
                            <AreaLogs key={log.uid} log={log} history={history} dispatch={dispatch}/>
                        ))}
                    </div>,
                    <div className="flex justify-center my-2">
                        <Pagination count={totalPages} size="small" page={page} onChange={handleChangePage} hidden={totalPages < 2} />
                    </div>]
        } else {
            return  <div className="mx-auto my-auto flex flex-col items-center text-gray-400">
                        <FontAwesomeIcon icon={faHistory} size="4x" />
                        <p className="mt-3">No hay movimientos para mostrar</p>
                    </div>
        }
    }

    const showSkeleton = () => {
        const n = 10;

        return  <div className="flex flex-col mt-9 py-1">
                    {[...Array(n)].map((e, i) => {
                        return <Skeleton key={i} variant="rectangular" height={88} className="rounded mb-2 mx-2" />
                    })}
                </div>
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
                    <ShowAvatar avatarClass="border-2" user={user} profile={true} />
                </div>
            </div>
            <div className="-mt-9 flex flex-col items-center">
                <div className="flex flex-col items-center">
                    <h3 className="text-xl text-gray-400">
                        ÁREA
                    </h3>
                    <h1 className="text-3xl font-bold p-2 text-center">
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
                isLoading === true && logs.length < 1
                ?   showSkeleton() 
                :   showLogs()
            }
            <ProfileModal />
            <ReturnItemModal areaId={area.uid} spaces={spaces} items={itemsToReturn} />
            <TakeItemModal areaid={area.uid} spaces={spaces} />
        </div>
    )
}
