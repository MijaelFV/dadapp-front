import { types } from "../types";
import { fetch } from "../../helpers/axios";
import { SwalMixin } from "../../components/SwalMixin";

export const loadCategories = (categories) => ({
    type: types.invLoadCategories,
    payload: categories
})

export const getCategoriesBySpace = (spaceId) => {
    return async(dispatch) => {
        const resp = await fetch(`api/category/${spaceId}`);
        if (resp.status === 200) {
            dispatch(loadCategories(resp.data))
        } else {
            console.log(resp.data)
        }
    }
}

export const createCategory = (spaceId, name) => {
    return async(dispatch) => {
        const resp = await fetch(`api/category/${spaceId}`, {name}, 'POST');
        if (resp.status === 201) {
            dispatch(getCategoriesBySpace(spaceId))
        } else {
            SwalMixin.fire({
                text: resp.data.msg,
                icon: 'warning',
                confirmButtonText: "Aceptar",
            })
        }
    }
}

export const deleteCategory = (spaceId, categoryUid) => {
    return async(dispatch) => {
        const resp = await fetch(`api/category/${categoryUid}`, null, 'DELETE');
        if (resp.status === 200) {
            dispatch(getCategoriesBySpace(spaceId))
        } else {
            SwalMixin.fire({
                text: resp.data.msg,
                icon: 'warning',
                confirmButtonText: "Aceptar",
            })
        }
    }
}