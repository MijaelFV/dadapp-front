import { faMinus, faPlus, faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Avatar } from '@material-ui/core'
import React, { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { startLoadingLogs } from '../../redux/actions/log'
import { openModal } from '../../redux/actions/ui'
import { ProfileModal } from '../../components/ProfileModal'
import { Logs } from './components/Logs'

export const MainScreen = () => {
    const baseUrl = process.env.REACT_APP_API_URL;
    const history = useHistory() 
    const dispatch = useDispatch();

    const area = useSelector(state => state.area.active);
    const user = useSelector(state => state.auth)
    const logs = useSelector(state => state.log.logs);

    useMemo(() => {
        if (logs.length === 0) {
            dispatch(startLoadingLogs(area.uid));
        }
    }, [dispatch, area.uid, logs])

    const handleSearchClick = () => {
        history.push("/search")
    }
    
    const handleProfileClick = () => {
        dispatch(openModal("ProfileModal"));
    }

    const handleAddClick = () => {
        dispatch(openModal());
    }
    
    const handleRemoveClick = () => {
        dispatch(openModal());
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
                <Avatar onClick={handleProfileClick} className="p" alt={user.name} src={`${baseUrl}api/upload/users/${user.uid}`}/>
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
                        onClick={handleAddClick}
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
                            0
                        </h1>
                    </div>
                    <p className="board-label">
                        Pendientes
                    </p>
                </div> 
                <div className="board-column">
                    <div 
                        className="board-button-remove"
                        onClick={handleRemoveClick}
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
                    <Logs key={log.uid} log={log} />
                ))}
            </div>
            <ProfileModal />
        </div>
    )
}
