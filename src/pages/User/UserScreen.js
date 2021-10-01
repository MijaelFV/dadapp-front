import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { IconButton, Skeleton  } from '@mui/material';
import { ShowAvatar } from '../../components/ShowAvatar';
import { clearLogs, startLoadingLogs } from '../../redux/actions/log';
import { UserLogsTable } from './components/UserLogsTable';
import { clearUser, getUserById } from '../../redux/actions/user';

export const UserScreen = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const {userid} = useParams();
    const logs = useSelector(state => state.log.userLogs);
    const user = useSelector(state => state.user);
        
    const areaid = useSelector(state => state.area.active.uid);
    const isLoading = useSelector(state => state.ui.isLoading)

    useEffect(() => {
        dispatch(clearLogs());
        dispatch(clearUser());
        dispatch(getUserById(userid))
        dispatch(startLoadingLogs(userid, 3, areaid));
    }, [dispatch, userid, areaid])

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
                    <ShowAvatar user={user} />
                </div>
                <div className="ml-4">
                    <p className="text-xl mt-3">
                        {
                            isLoading === true
                            ?   <Skeleton variant="text" width="70px" /> 
                            :   user?.name
                        }
                    </p>
                    <p className="text-gray-400">
                        {
                            isLoading === true
                            ?   <Skeleton variant="text" width="150px" /> 
                            :   user?.email
                        }
                    </p>
                </div>
            </div>
            <div className="rounded mt-6 mx-3 bg-gray-500 bg-opacity-20 px-2">
                <h1 className="text-lg px-1 font-medium mt-3 mb-2">
                    Ultimos Movimientos
                </h1>
                <UserLogsTable logs={logs} isLoading={isLoading} />
            </div>
        </div>
    )
}
