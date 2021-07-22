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

export const startLoadingSpaces = () => {
    return async(dispatch) => {
        const resp = await fetch('api/spaces');
        const spaces = resp.data.resp
        if (resp.statusText === "OK") {
            dispatch(loadSpaces(spaces))
        } else {
            console.log('error')
        }
    }
}

