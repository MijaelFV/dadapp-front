import React from 'react'
import moment from 'moment'
import 'moment/locale/es'
import { faArrowsAltH, faArrowsAltV } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ShowAvatar } from '../../../components/ShowAvatar'
import { logType } from '../../../helpers/logType'


export const AreaLogs = ({log, history, dispatch}) => {
    const time = moment(log.time).locale("es").format('DD/MM HH:mm')

    const ColRowInfo = () => {
        if (log.type !== "DELETE" & log.type !== "TAKED" & log.type !== "CONSUMED") {
            return <div className="ml-3 flex flex-col">
                <div className="mb-1 flex w-max text-black rounded overflow-hidden">
                    <p className="px-2 font-bold text-sm bg-white">
                        {log.row}
                    </p>
                    <div className="flex items-center justify-center bg-gray-800 w-6 h-5 text-white">
                        <FontAwesomeIcon icon={faArrowsAltV}/>
                    </div>
                </div>
                <div className="flex w-max text-black rounded overflow-hidden">
                    <p className="px-2 font-bold text-sm bg-white">
                        {log.column}
                    </p>
                    <div className="flex items-center justify-center bg-gray-800 w-6 h-5 text-white">
                        <FontAwesomeIcon icon={faArrowsAltH}/>
                    </div>
                </div>
            </div>
        }
    }

    const {logBgColor, labelType, labelBgColor} = logType(log.type)

    const handleItemClick = async(itemid, spaceid) => {
        if (itemid && spaceid) {
            history.push(`/item/${spaceid}/${itemid}`)
        }
    }

    const handleUserClick = async(userid) => {
        if (userid) {
            history.push(`/user/${userid}`)
        }
    }

    return (
        <>
            <div className={`flex mx-2 py-2 px-2 items-center bg-opacity-30 rounded-tr-md rounded-tl-md overflow-hidden ${logBgColor}`}>
                <div className={`w-10 h-10 flex flex-shrink-0 mr-3 p-0.5 rounded bg-opacity-30 ${labelBgColor}`}>
                    <ShowAvatar variant="rounded" user={log.user} />
                </div>
                <div className="flex flex-col mr-auto justify-evenly">
                    <p 
                        className="text-lg cursor-pointer no-tap-highlight font-medium overflow-hidden w-max"
                        style={{maxWidth:"120px"}}
                        onClick={() => handleUserClick(log.user._id)}
                    >
                        {log.user.name}
                    </p>
                    <p className="text-sm text-gray-300 whitespace-nowrap">{time}</p>
                </div>
                <div className="flex flex-col items-end justify-evenly">
                    <p 
                        className=" text-lg font-medium overflow-hidden whitespace-nowrap overflow-ellipsis" 
                    >
                        {labelType} {log.quantity ? `(${log.quantity})` : ''}
                    </p>
                    <p 
                        className="text-sm text-right text-gray-300 overflow-hidden max-h-5 overflow-ellipsis"
                    >
                        {log.space.name}
                    </p>
                </div>
                {ColRowInfo()}
            </div>
            <div className={`${labelBgColor} mx-2 mb-2 rounded-br-md rounded-bl-md flex justify-center`}>
                <p 
                    className="text-center cursor-pointer no-tap-highlight overflow-ellipsis whitespace-nowrap w-11/12 overflow-hidden"
                    onClick={() => handleItemClick(log.item?._id, log.space?._id)}
                >
                    {log.item?.name || log.itemName}
                </p>
            </div>
        </>
    )
}
