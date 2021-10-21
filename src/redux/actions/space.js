import { types } from "../types";
import { fetch } from "../../helpers/axios";

export const activeSpace = (id,space) => ({
    type: types.spaceActive,
    payload: {
        id,
        ...space
    }
})

export const loadSpaces = (spaces) => ({
    type: types.spaceLoad,
    payload: spaces
})

export const addSpace = (space) => ({
    type: types.spaceAdd,
    payload: space
})

export const deleteSpace = (space) => ({
    type: types.spaceDelete,
    payload: space
})

export const clearSpace = () => ({
    type: types.spaceClear
})


export const startLoadingSpaces = (area) => {
    return async(dispatch) => {
        const resp = await fetch(`api/space/${area}`);
        if (resp.status === 200) {
            dispatch(loadSpaces(resp.data))
        } else {
            console.log(resp.data)
        }
    }
}

export const startCreateSpace = (name, rows, columns, area) => {
    return async(dispatch) => {
        const resp = await fetch('api/space', {name, rows, columns, area}, 'POST');
        if (resp.status === 201) {
            dispatch(addSpace(resp.data))
        } else {
            console.log(resp.data)
        }
    }
}

export const startModifySpace = (spaceId, name, rows, columns) => {
    return async(dispatch) => {
        const resp = await fetch(`api/space/${spaceId}`, {name, rows, columns}, 'PUT');
        if (resp.status === 200) {
            dispatch(startLoadingSpaces(resp.data.area))
        } else {
            console.log(resp.data)
        }
    }
}

export const startDeleteSpace = (uid) => {
    return async(dispatch) => {
        const resp = await fetch(`api/space/${uid}`, null, 'DELETE');
        if (resp.status === 200) {
            dispatch(deleteSpace(uid))
        } else {
            console.log(resp.data)
        }
    }
}

