import { types } from "../types";
import { fetch } from "../../helpers/axios";
import { clearInventory } from "./inv";
import { clearLogs } from "./log";
import { clearSpace } from "./space";
import { clearUi } from "./ui";

export const loadAreas = (areas) => ({
    type: types.areaLoad,
    payload: areas
})

export const activeArea = (area) => ({
    type: types.areaActive,
    payload: area
})

export const clearArea = () => ({
    type: types.areaClear,
})

export const startClearArea = () => {
    return async(dispatch) => {
        dispatch(clearInventory());
        dispatch(clearLogs());
        dispatch(clearSpace());
        dispatch(clearUi());
        dispatch(clearArea());
    }
}

export const startLoadingAreas = (userId) => {
    return async(dispatch) => {
        const resp = await fetch(`api/area/${userId}`);
        if (resp.status === 200) {
            dispatch(loadAreas(resp.data))
        } else {
            console.log(resp.data)
        }
    }
}