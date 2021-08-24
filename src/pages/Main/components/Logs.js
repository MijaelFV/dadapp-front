import React from 'react'
import moment from 'moment'
import 'moment/locale/es'
import { faArrowsAltH, faArrowsAltV } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ShowAvatar } from '../../../components/ShowAvatar'


export const Logs = ({log}) => {
    const time = moment(log.time).locale("es").format('DD/MM/YY HH:mm')

    const ColRowInfo = () => {
        if (log.type === "ADD") {
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

    return (
        <div className="log">
            <ShowAvatar username={log.user.name} userId={log.user._id} />
            <div className="log-col1">
                <span className="col-name">{log.user.name}</span>
                <span className="col-time">{time}</span>
            </div>
            <div className="log-col2">
                <span className="col-item">{log.item?.name || log.itemName}</span>
                <span className="col-space">{log.space.name}</span>
            </div>
            {ColRowInfo()}
            <span className={((log.type === "ADD") ? "log-add" : "log-remove")}></span>
        </div>
    )
}
