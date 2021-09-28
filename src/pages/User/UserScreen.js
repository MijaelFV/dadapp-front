import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { IconButton  } from '@mui/material';
import { ShowAvatar } from '../../components/ShowAvatar';
import { clearLogs, startLoadingLogs } from '../../redux/actions/log';
import { UserLogsTable } from './components/UserLogsTable';

export const UserScreen = () => {
    const history = useHistory();
    const dispatch = useDispatch();
        
    const areaid = useSelector(state => state.area.active.uid);
    const logs = useSelector(state => state.log.userLogs);
    const user = useSelector(state => state.user);

    useEffect(() => {
        dispatch(clearLogs());
        dispatch(startLoadingLogs(user.uid, 3, areaid));
    }, [dispatch, user, areaid])

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
                <p className="ml-1 text-xl">
                    Usuario
                </p>
            </div>
            <div className="flex mx-4">
                <div className="w-20 h-20">
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
            <div className="rounded mt-6 mx-3 bg-gray-500 bg-opacity-20 px-2">
                <h1 className="text-lg px-1 font-medium mt-3 mb-2">
                    Ultimos Movimientos
                </h1>
                <UserLogsTable logs={logs} />
            </div>
        </div>
    )
}
