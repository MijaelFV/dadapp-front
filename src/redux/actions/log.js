import { types } from "../types";
import { fetch } from "../../helpers/axios";
import { setLoadingFinish, setLoadingStart } from "./ui";

export const loadAreaLogs = (logs) => ({
    type: types.logAreaLoad,
    payload: logs
})

export const loadUserLogs = (logs) => ({
    type: types.logUserLoad,
    payload: logs
})

export const loadItemLogs = (logs) => ({
    type: types.logItemLoad,
    payload: logs
})

export const clearLogs = () => ({
    type: types.logClear,
})

export const startLoadingLogs = (id, type, areaid) => {
    return async(dispatch) => {
        dispatch(setLoadingStart())
        const resp = await fetch(`api/item/logs/${type}/${id}/${areaid}`);
        dispatch(setLoadingFinish())
        if (resp.status === 200) {
            switch (type) {
                case 1:
                        dispatch(loadAreaLogs(resp.data))
                    break;

                case 2:
                        dispatch(loadItemLogs(resp.data))
                    break;

                case 3:
                        dispatch(loadUserLogs(resp.data))
                    break;
            
                default:
                    break;
            }
        } else {
            console.log(resp.data)
        }
    }
}
