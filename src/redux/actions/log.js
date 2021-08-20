import { types } from "../types";
import { fetch } from "../../helpers/axios";

export const loadLogs = (logs) => ({
    type: types.logLoad,
    payload: logs
})

export const clearLogs = () => ({
    type: types.logClear,
})

export const startLoadingLogs = (areaId) => {
    return async(dispatch) => {
        const resp = await fetch(`api/inventory/logs/${areaId}`);
        if (resp.status === 200) {
            dispatch(loadLogs(resp.data.resp))
        } else {
            console.log(resp.data)
        }
    }
}