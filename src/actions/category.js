import { types } from "../types/types";
import { fetch } from "../helpers/axios";

export const loadInvCategories = (categories) => ({
    type: types.invLoadCategories,
    payload: categories
})

export const getCategoriesBySpace = (spaceId) => {
    return async(dispatch) => {
        const resp = await fetch(`api/categories/${spaceId}`);
        if (resp.status === 200) {
            dispatch(loadInvCategories(resp.data.resp))
        } else {
            console.log(resp.data)
        }
    }
}

export const createCategory = (spaceId, name) => {
    return async(dispatch) => {
        const resp = await fetch(`api/categories/${spaceId}`, {name}, 'POST');
        if (resp.status === 201) {
            dispatch(getCategoriesBySpace(spaceId))
        } else {
            console.log(resp.data)
        }
    }
}