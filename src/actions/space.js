import { types } from "../types/types";
import { fetch } from "../helpers/axios";

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
        const resp = await fetch(`api/spaces/${area}`);
        if (resp.status === 200) {
            dispatch(loadSpaces(resp.data.resp))
        } else {
            console.log(resp.data)
        }
    }
}

export const startCreateSpace = (name, rows, columns, area) => {
    return async(dispatch) => {
        const resp = await fetch('api/spaces', {name, rows, columns, area}, 'POST');
        if (resp.status === 201) {
            dispatch(addSpace(resp.data.newSpace))
        } else {
            console.log(resp.data)
        }
    }
}

export const startDeleteSpace = (uid) => {
    return async(dispatch) => {
        const resp = await fetch(`api/spaces/${uid}`, null, 'DELETE');
        if (resp.status === 200) {
            dispatch(deleteSpace(uid))
        } else {
            console.log(resp.data)
        }
    }
}

