import React from 'react'
import moment from 'moment'
import 'moment/locale/es'
import { faArrowsAltH, faArrowsAltV } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ShowAvatar } from '../../../components/ShowAvatar'
import { getItemById } from '../../../redux/actions/inv'


export const Logs = ({log, history, dispatch}) => {
    const time = moment(log.time).locale("es").format('DD/MM/YY HH:mm')

    const ColRowInfo = () => {
        if (log.type !== "DELETE") {
            return <div className="log-col3">
                <div className="col3">
                    <span className="col3-value">
                        {log.row}
                    </span>
                    <div className="col3-icon">
                        <FontAwesomeIcon icon={faArrowsAltV}/>
                    </div>
                </div>
                <div className="col3">
                    <span className="col3-value">
                        {log.column}
                    </span>
                    <div className="col3-icon">
                        <FontAwesomeIcon icon={faArrowsAltH}/>
                    </div>
                </div>
            </div>
        }
    }

    let classType;
    switch (log.type) {
        case "ADD":
                classType = "log-add"
            break;

        case "MODIFY":
                classType = "log-modify"
            break;

        case "DELETE":
                classType = "log-delete"
            break;
    }

    const handleClickItem = async(itemId, spaceId) => {
        if (itemId && spaceId) {
            await dispatch(getItemById(itemId))
            history.push(`/space/${spaceId}/${itemId}`)
        }
    }

    return (
        <div className="log">
            <ShowAvatar username={log.user.name} userId={log.user._id} />
            <div className="log-col1">
                <span className="col-name">{log.user.name}</span>
                <span className="col-time">{time}</span>
            </div>
            <div className="log-col2">
                <span className="col-item" onClick={() => handleClickItem(log.item?._id, log.space?._id)}>{log.item?.name || log.itemName}</span>
                <span className="col-space">{log.space.name}</span>
            </div>
            {ColRowInfo()}
            <span className={classType}></span>
        </div>
    )
}
