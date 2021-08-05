import { types } from "../types/types";
import { fetch } from "../helpers/axios";

export const loadAreas = (areas) => ({
    type: types.areaLoad,
    payload: areas
})

export const activeArea = (area) => ({
    type: types.areaActive,
    payload: area
})

export const startLoadingAreas = (userId) => {
    return async(dispatch) => {
        const resp = await fetch(`api/areas/${userId}`);
        if (resp.status === 200) {
            dispatch(loadAreas(resp.data.resp))
        } else {
            console.log(resp.data)
        }
    }
}