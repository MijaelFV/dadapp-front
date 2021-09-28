import { types } from "../types";
import { fetch } from "../../helpers/axios";
import { clearInventory } from "./inv";
import { clearLogs } from "./log";
import { clearSpace } from "./space";
import { clearUi } from "./ui";
import { clearSearch } from "./search";

export const loadAreas = (areas) => ({
    type: types.areaLoad,
    payload: areas
})

export const setUserRole = (value) => ({
    type: types.areaSetRole,
    payload: value
})

export const activeArea = (area) => ({
    type: types.areaActive,
    payload: area
})

export const clearArea = () => ({
    type: types.areaClear,
})

export const updateInviteCode = (newCode) => ({
    type: types.areaChangeCode,
    payload: newCode
})

export const changeUserRole = (areaid, userid) => {
    return async(dispatch) => {
        const resp = await fetch(`api/area/changerole`, {areaid, userid}, "PUT");
        if (resp.status === 200) {
            dispatch(startLoadingAreaById(areaid))
        } else {
            console.log(resp.data)
        }
    }
}

export const deleteAreaUser = (areaid, userid) => {
    return async(dispatch) => {
        const resp = await fetch(`api/area/user/kick`, {areaid, userid}, "PUT");
        if (resp.status === 200) {
            dispatch(startLoadingAreaById(areaid))
        } else {
            console.log(resp.data)
        }
    }
}

export const joinArea = (code) => {
    return async(dispatch) => {
        const resp = await fetch(`api/area/code/join`, {code}, "PUT");
        if (resp.status === 200) {
            dispatch(startLoadingAreas())
        } else {
            console.log(resp.data)
        }
    }
}

export const renewAreaInviteCode = (areaid) => {
    return async(dispatch) => {
        const resp = await fetch(`api/area/code/renew`, {areaid}, "PUT");
        if (resp.status === 200) {
            dispatch(updateInviteCode(resp.data))
        } else {
            console.log(resp.data)
        }
    }
}

export const deleteArea = (areaid) => {
    return async(dispatch) => {
        const resp = await fetch(`api/area/${areaid}`, null, "DELETE");
        if (resp.status === 200) {
            dispatch(startClearArea())
        } else {
            console.log(resp.data)
        }
    }
}

export const modifyArea = (areaid,name) => {
    return async(dispatch) => {
        const resp = await fetch(`api/area/${areaid}`, {name}, "PUT");
        if (resp.status === 200) {
            dispatch(activeArea(resp.data))
        } else {
            console.log(resp.data)
        }
    }
}

export const createArea = (name) => {
    return async(dispatch) => {
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
        dispatch(clearSearch());
        dispatch(clearInventory());
        dispatch(clearLogs());
        dispatch(clearSpace());
        dispatch(clearUi());
        dispatch(clearArea());
    }
}

export const startLoadingAreaById = (areaid) => {
    return async(dispatch) => {
        const resp = await fetch(`api/area/${areaid}`);
        if (resp.status === 200) {
            dispatch(activeArea(resp.data))
        } else {
            console.log(resp.data)
        }
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