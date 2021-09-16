import { types } from "../types";
import { fetch } from "../../helpers/axios";

export const loadLogs = (logs) => ({
    type: types.logLoad,
    payload: logs
})

export const clearLogs = () => ({
    type: types.logClear,
})

export const startLoadingLogs = (id, type) => {
    return async(dispatch) => {
        const resp = await fetch(`api/item/logs/${type}/${id}`);
        if (resp.status === 200) {
            dispatch(loadLogs(resp.data))
        } else {
            console.log(resp.data)
        }
    }
}
