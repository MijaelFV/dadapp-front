import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { IconButton  } from '@material-ui/core';
import { ShowAvatar } from '../../components/ShowAvatar';
import { clearLogs, startLoadingLogs } from '../../redux/actions/log';
import { UserLogsTable } from './components/UserLogsTable';

export const UserScreen = () => {
    const history = useHistory();
    const dispatch = useDispatch();
        
    const logs = useSelector(state => state.log.logs);
    const user = useSelector(state => state.user);
    useEffect(() => {
        dispatch(clearLogs());
        dispatch(startLoadingLogs(user.uid, 3));
    }, [dispatch, user])

    const handleReturnClick = () => {
        history.goBack();
    }

    return (
        <div className="text-white bg-gray-900 flex flex-col w-full h-auto min-h-full pb-20" style={{maxWidth:"500px", marginInline:"auto"}}>
            <div className="flex justify-between p-3">
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
                    {/* <IconButton
                        style={{color:"white"}}
                    >
                        <FontAwesomeIcon 
                            icon={faCogs} 
                        />
                    </IconButton> */}
            </div>
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
            <div className="rounded mt-6 mx-3 bg-gray-500 bg-opacity-20 px-2">
                <UserLogsTable logs={logs} />
            </div>
        </div>
    )
}
