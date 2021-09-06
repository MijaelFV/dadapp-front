import React, { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faCogs } from '@fortawesome/free-solid-svg-icons';
import { IconButton, AppBar, Toolbar } from '@material-ui/core';
import { ShowAvatar } from '../../components/ShowAvatar';
import { getUserById } from '../../redux/actions/user';
import { clearLogs, startLoadingLogs } from '../../redux/actions/log';
import { LogsTable } from '../ItemInfo/components/LogsTable';
import { UserLogsTable } from './components/UserLogsTable';

export const UserScreen = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    
    
    const user = useSelector(state => state.user);
    // const userId = "60f7c03aca7728408c285ec9"
    useEffect(() => {
        dispatch(getUserById(user.uid))
        dispatch(clearLogs());
        dispatch(startLoadingLogs(user.uid, 3));
    }, [dispatch])
    
    // const areaId = useSelector(state => state.area.active.uid);
    const areaId = "60efb7d44c8a53491ca93914"
    const logs = useSelector(state => state.log.logs);


    const handleReturnClick = () => {
        history.goBack();
    }

    return (
        <div className="bg-black text-white" style={{maxWidth: "500px"}}>
            <AppBar position="static" color="transparent">
                <Toolbar>
                        <div className="w-full flex items-center">
                            <IconButton
                                style={{color:"white"}}
                                onClick={handleReturnClick}
                            >
                                <FontAwesomeIcon 
                                    icon={faArrowLeft} 
                                />
                            </IconButton>
                            <p className="text-xl">
                                Usuario
                            </p>
                        </div>
                        <IconButton
                            style={{color:"white"}}
                        >
                            <FontAwesomeIcon 
                                icon={faCogs} 
                            />
                        </IconButton>
                </Toolbar>
            </AppBar>
            <div className="flex mt-4 mx-4">
                <div className="w-24 h-24">
                    <ShowAvatar userId={user.uid} username={user.name} />
                </div>
                <div className="ml-4">
                    <p className="text-xl mt-3">
                        {user.name}
                    </p>
                    <p className="text-gray-400">
                        {user.email}
                    </p>
                </div>
            </div>
            <div className="mt-9 pb-24 mx-3">
                <UserLogsTable logs={logs} />
            </div>
        </div>
    )
}
