import { types } from "../types/types";
import { fetch } from "../helpers/axios";

export const loadInvCategories = (categories) => ({
    type: types.invLoadCategories,
    payload: categories
})

export const getCategoriesByArea = (area) => {
    return async(dispatch) => {
        const resp = await fetch(`api/categories/${area}`);
        if (resp.status === 200) {
            dispatch(loadInvCategories(resp.data.resp))
        } else {
            console.log(resp.data)
        }
    }
}