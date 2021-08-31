import { faMinus, faPlus, faSearch } from '@fortawesome/free-solid-svg-icons'
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

    const noLogsAdvise = () => {
        if (logs.length === 0) {
            return <span
                className="noLogs"
            >
                No existen movimientos
            </span>
        }
    } 
    return (
        <div className="main-container">
            <div className="topBar">
                <div 
                    className="topBar-search"
                    onClick={handleSearchClick}
                >
                    <FontAwesomeIcon 
                        icon={faSearch} 
                        className="topBar-icon"
                    />
                </div>
                <ShowAvatar username={user.name} userId={user.uid} profile={true} />
            </div>
            <div className="area">
                <h3 className="area-label">
                    ÁREA
                </h3>
                <h1 className="area-name">
                    {area.name}
                </h1>
            </div>
            <div className="board">
                <div className="board-column">
                    <div 
                        className="board-button-add"
                        onClick={handleReturnClick}
                    >
                        <FontAwesomeIcon 
                            icon={faPlus} 
                            className="board-icon"
                        />
                    </div>
                    <p className="board-label">
                        Devolver
                    </p>
                </div>
                <div className="board-column">
                    <div className="board-button-pending">
                        <h1>
                            {itemsToReturn.length}
                        </h1>
                    </div>
                    <p className="board-label">
                        Pendientes
                    </p>
                </div> 
                <div className="board-column">
                    <div 
                        className="board-button-remove"
                        onClick={handleTakeClick}
                    >
                        <FontAwesomeIcon 
                            icon={faMinus} 
                            className="board-icon"
                        />
                    </div>
                    <p className="board-label">
                        Retirar
                    </p>
                </div>
            </div>
            <div className="log-container">
                {noLogsAdvise()}
                {logs.map((log) => (
                    <Logs key={log.uid} log={log} history={history} dispatch={dispatch}/>
                ))}
            </div>
            <ProfileModal />
            <ReturnItemModal areaId={area.uid} spaces={spaces} items={itemsToReturn} />
            <TakeItemModal areaId={area.uid} spaces={spaces} />
        </div>
    )
}
