import { types } from "../types/types";
import { fetch } from "../helpers/axios";

export const loadLogs = (logs) => ({
    type: types.logLoad,
    payload: logs
})

export const startLoadingLogs = (skip) => {
    return async(dispatch) => {
        const resp = await fetch(`api/inventories/logs?skip=${skip}`);
        if (resp.status === 200) {
            dispatch(loadLogs(resp.data.resp))
        } else {
            console.log(resp.data)
        }
    }
}