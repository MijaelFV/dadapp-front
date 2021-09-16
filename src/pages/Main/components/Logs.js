import React from 'react'
import moment from 'moment'
import 'moment/locale/es'
import { faArrowsAltH, faArrowsAltV } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ShowAvatar } from '../../../components/ShowAvatar'
import { getItemById } from '../../../redux/actions/inv'
import { getUserById } from '../../../redux/actions/user'


export const Logs = ({log, history, dispatch}) => {
    const time = moment(log.time).locale("es").format('DD/MM/YY HH:mm')

    const ColRowInfo = () => {
        if (log.type !== "DELETE") {
            return <div className="ml-3 flex flex-col">
                <div className="mb-1 flex w-max text-black rounded overflow-hidden">
                    <p className="px-2 font-bold bg-white">
                        {log.row}
                    </p>
                    <div className="flex items-center justify-center bg-gray-800 w-7 h-6 text-white">
                        <FontAwesomeIcon icon={faArrowsAltV}/>
                    </div>
                </div>
                <div className="flex w-max text-black rounded overflow-hidden">
                    <p className="px-2 font-bold bg-white">
                        {log.column}
                    </p>
                    <div className="flex items-center justify-center bg-gray-800 w-7 h-6 text-white">
                        <FontAwesomeIcon icon={faArrowsAltH}/>
                    </div>
                </div>
            </div>
        }
    }

    let logBgColor;
    let labelType;
    let labelBgColor;
    switch (log.type) {
        case "ADD":
                logBgColor = "bg-green-500"
                labelType = "Articulo Añadido"
                labelBgColor = "bg-green-900"
            break;

        case "MODIFY":
                logBgColor = "bg-blue-500"
                labelType = "Posición Modificada"
                labelBgColor = "bg-blue-900"
            break;

        case "DELETE":
                logBgColor = "bg-red-500"
                labelType = "Articulo Removido"
                labelBgColor = "bg-red-900"
            break;

        default: 
            break;
    }

    const handleItemClick = async(itemId, spaceId, takedBy) => {
        if (itemId && spaceId && takedBy === null) {
            await dispatch(getItemById(itemId))
            history.push(`/item/${spaceId}/${itemId}`)
        }
    }

    const handleUserClick = async(userId) => {
        if (userId) {
            await dispatch(getUserById(userId))
            history.push(`/user/${userId}`)
        }
    }

    return (
        <div>
            <div className={`flex mx-2 py-2 px-2 items-center bg-opacity-30 rounded-tr-md rounded-tl-md ${labelBgColor}`}>
                <div className="w-10 h-10">
                    <ShowAvatar username={log.user.name} userId={log.user._id} />
                </div>
                <div className="flex flex-col ml-3 mr-auto justify-evenly">
                    <p 
                        className="text-lg cursor-pointer no-tap-highlight font-medium overflow-hidden w-max overflow-ellipsis whitespace-nowrap"
                        style={{maxWidth:"120px"}} 
                        onClick={() => handleUserClick(log.user._id)}
                    >
                        {log.user.name}
                    </p>
                    <p className="text-sm text-gray-300">{time}</p>
                </div>
                <div className="flex flex-col items-end justify-evenly">
                    <p 
                        className=" text-lg cursor-pointer no-tap-highlight font-medium overflow-hidden whitespace-nowrap overflow-ellipsis" 
                        style={{maxWidth:"145px"}} 
                        onClick={() => handleItemClick(log.item?._id, log.space?._id, log.item?.takedBy)}
                    >
                        {log.item?.name || log.itemName}
                    </p>
                    <p 
                        className="text-sm text-gray-300 overflow-hidden whitespace-nowrap overflow-ellipsis"
                        style={{maxWidth:"145px"}} 
                    >
                        {log.space.name}
                    </p>
                </div>
                {ColRowInfo()}
            </div>
            <p className={`${logBgColor} mx-2 mb-2 rounded-br-md rounded-bl-md text-center`}>
                {labelType}
            </p>
        </div>
    )
}
