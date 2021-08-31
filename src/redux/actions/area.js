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

export const createArea = (name) => {
    return async(dispatch) => {
        console.log(name);
        const resp = await fetch(`api/area`, {name}, "POST");
        if (resp.status === 201) {
            dispatch(startLoadingAreas())
        } else {
            console.log(resp.data)
        }
    }
}

export const startClearArea = () => {
    return async(dispatch) => {
        dispatch(clearInventory());
        dispatch(clearLogs());
        dispatch(clearSpace());
        dispatch(clearUi());
        dispatch(clearArea());
    }
}

export const startLoadingAreas = () => {
    return async(dispatch) => {
        const resp = await fetch(`api/area/user`);
        if (resp.status === 200) {
            dispatch(loadAreas(resp.data))
        } else {
            console.log(resp.data)
        }
    }
}